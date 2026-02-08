import { NextResponse } from 'next/server';
import { getSkills, saveSkills } from '@/lib/store';

// GitHub Configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'CoderNjoro';
const REPO_NAME = 'Portfolio';
const FILE_PATH = 'data/skills.json';
const BRANCH = 'main';

async function saveToGitHub(skills: any[]) {
    if (!GITHUB_TOKEN) {
        return {
            success: false,
            error: 'GITHUB_TOKEN is missing'
        };
    }

    try {
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

        const jsonString = JSON.stringify(skills, null, 4);
        const content = Buffer.from(jsonString).toString('base64');

        const putRes = await fetch(getUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Update skills via Admin Panel',
                content: content,
                sha: sha || undefined,
                branch: BRANCH
            })
        });

        if (!putRes.ok) {
            const errorText = await putRes.text();
            return { success: false, error: `GitHub PUT failed: ${putRes.status}` };
        }

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function GET() {
    try {
        const skills = getSkills();
        return NextResponse.json(skills);
    } catch (error) {
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const skills = await request.json();

        // 1. Local Save (if not Vercel)
        if (!process.env.VERCEL) {
            saveSkills(skills);
        }

        // 2. GitHub Sync
        const githubResult = await saveToGitHub(skills);

        return NextResponse.json({
            success: true,
            githubSynced: githubResult.success,
            githubError: githubResult.error,
            skills
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
