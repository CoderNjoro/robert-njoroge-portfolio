import { NextResponse } from 'next/server';
import { getProjects, saveProjects } from '@/lib/store';

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
            const index = projects.findIndex(p => p.id === project.id);
            if (index !== -1) {
                projects[index] = project;
            }
        } else if (action === 'delete') {
            projects = projects.filter(p => p.id !== id);
        }

        saveProjects(projects);
        return NextResponse.json({ success: true, projects });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
    }
}
