import { NextResponse } from 'next/server';
import { getProjects, saveProjects } from '@/lib/store';

// GitHub Configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'CoderNjoro';
const REPO_NAME = 'Portfolio';
const FILE_PATH = 'data/projects.json';
const BRANCH = 'main';

async function saveToGitHub(projects: any[]) {
    if (!GITHUB_TOKEN) {
        return { 
            success: false, 
            error: 'GITHUB_TOKEN is missing in environment variables. Please set it in your Vercel project settings to enable project persistence.' 
        };
    }

    try {
        console.log('Syncing to GitHub...');
        const getUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

        // 1. Get current file data to get the SHA
        const getRes = await fetch(getUrl, {
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
            },
            cache: 'no-store'
        });

        let sha = '';
        if (getRes.ok) {
            const fileData = await getRes.json();
            sha = fileData.sha;
            console.log('Found existing file SHA:', sha);
        } else if (getRes.status !== 404) {
            const err = await getRes.text();
            console.error('GitHub GET error:', err);
            return { success: false, error: `GitHub GET failed: ${getRes.status} ${err}` };
        }

        // 2. Prepare content
        const jsonString = JSON.stringify(projects, null, 4);
        const jsonSizeMB = jsonString.length / (1024 * 1024);
        
        // Check JSON size before base64 encoding (base64 adds ~33% overhead)
        if (jsonSizeMB > 3) {
            return { 
                success: false, 
                error: `Project data is too large (${jsonSizeMB.toFixed(2)}MB). The file exceeds Vercel's limits. Please reduce image sizes or remove some images. Maximum recommended size: 3MB.` 
            };
        }
        
        const content = Buffer.from(jsonString).toString('base64');
        
        // Check base64 size (GitHub API limit for this endpoint is 25MB, but Vercel limit is ~4.5MB)
        const base64SizeMB = content.length / (1024 * 1024);
        if (base64SizeMB > 4) {
            return { 
                success: false, 
                error: `Project data is too large after encoding (${base64SizeMB.toFixed(2)}MB). Please use fewer or smaller images. Maximum recommended size: 3MB JSON (before encoding).` 
            };
        }

        // 3. Update or Create file
        const putRes = await fetch(getUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Update projects via Admin Panel',
                content: content,
                sha: sha || undefined,
                branch: BRANCH
            })
        });

        if (!putRes.ok) {
            const errorText = await putRes.text();
            console.error('GitHub PUT error:', errorText);
            return { success: false, error: `GitHub PUT failed: ${putRes.status} ${errorText}` };
        }

        console.log('GitHub sync successful');
        return { success: true };
    } catch (error: any) {
        console.error('GitHub sync exception:', error);
        return { success: false, error: error.message || 'Unknown GitHub sync error' };
    }
}

export async function GET() {
    try {
        const projects = getProjects();
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { action, project, id } = body;
        let projects = getProjects();

        if (action === 'create') {
            // Check if ID already exists (prevent duplicates)
            if (projects.some(p => p.id === project.id)) {
                return NextResponse.json({ success: false, error: 'Project ID already exists' }, { status: 400 });
            }
            projects = [project, ...projects];
        } else if (action === 'update') {
            const index = projects.findIndex((p: any) => p.id === project.id);
            if (index !== -1) {
                projects[index] = project;
            } else {
                return NextResponse.json({ success: false, error: 'Project not found for update' }, { status: 404 });
            }
        } else if (action === 'delete') {
            projects = projects.filter((p: any) => p.id !== id);
        } else {
            return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
        }

        // 1. Save locally (immediate feedback for dev/ephemeral prod)
        saveProjects(projects);

        // 2. Sync to GitHub (for persistence on Vercel)
        const githubResult = await saveToGitHub(projects);

        if (!githubResult.success) {
            console.error('GitHub sync failed:', githubResult.error);
            // On Vercel, GitHub sync is required for persistence
            // Return success: true but githubSynced: false so client can handle appropriately
            return NextResponse.json({
                success: true,
                githubSynced: false,
                githubError: githubResult.error || 'Unknown GitHub sync error',
                projects
            });
        }

        return NextResponse.json({
            success: true,
            githubSynced: true,
            projects
        });
    } catch (error: any) {
        console.error('API Route POST error:', error);
        return NextResponse.json({ success: false, error: error.message || 'Failed to process request' }, { status: 500 });
    }
}
