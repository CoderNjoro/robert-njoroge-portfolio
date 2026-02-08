import { NextResponse } from 'next/server';
import { getProfile, saveProfile } from '@/lib/store';

// GitHub Configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'CoderNjoro';
const REPO_NAME = 'Portfolio';
const FILE_PATH = 'data/profile.json';
const BRANCH = 'main';

async function saveToGitHub(profile: any) {
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

        const jsonString = JSON.stringify(profile, null, 4);
        const content = Buffer.from(jsonString).toString('base64');

        const putRes = await fetch(getUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Update profile via Admin Panel',
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
        const profile = getProfile();
        return NextResponse.json(profile);
    } catch (error) {
        return NextResponse.json(null, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const profile = await request.json();

        // 1. Local Save (if not Vercel)
        if (!process.env.VERCEL) {
            saveProfile(profile);
        }

        // 2. GitHub Sync
        const githubResult = await saveToGitHub(profile);

        return NextResponse.json({
            success: true,
            githubSynced: githubResult.success,
            githubError: githubResult.error,
            profile
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
