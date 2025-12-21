import { NextResponse } from 'next/server';
import { getProjects, saveProjects } from '@/lib/store';

// GitHub Configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'CoderNjoro';
const REPO_NAME = 'Portfolio';
const FILE_PATH = 'data/projects.json';
const BRANCH = 'main'; // Adjust if using 'master'

async function saveToGitHub(projects: any[]) {
    if (!GITHUB_TOKEN) {
        console.warn('GITHUB_TOKEN is missing in environment variables. GitHub sync skipped.');
        return false;
    }

    try {
        // 1. Get current file SHA to allow update
        const getUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
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
        }

        // 2. Update file
        // Convert content to base64
        const content = Buffer.from(JSON.stringify(projects, null, 4)).toString('base64');

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
                sha: sha || undefined, // undefined if creating new file
                branch: BRANCH
            })
        });

        if (!putRes.ok) {
            const errorText = await putRes.text();
            console.error('GitHub API Error:', errorText);
            return false;
        }
        return true;
    } catch (error) {
        console.error('GitHub save error:', error);
        return false;
    }
}

export async function GET() {
    const projects = getProjects();
    return NextResponse.json(projects);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { action, project, id } = body;
        let projects = getProjects();

        if (action === 'create') {
            projects = [project, ...projects];
        } else if (action === 'update') {
            const index = projects.findIndex((p: any) => p.id === project.id);
            if (index !== -1) {
                projects[index] = project;
            }
        } else if (action === 'delete') {
            projects = projects.filter((p: any) => p.id !== id);
        }

        // Save locally (always works in dev, ephemeral in prod)
        saveProjects(projects);

        // Save to GitHub (persistent in prod)
        const githubSynced = await saveToGitHub(projects);

        return NextResponse.json({
            success: true,
            githubSynced,
            projects
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
    }
}
