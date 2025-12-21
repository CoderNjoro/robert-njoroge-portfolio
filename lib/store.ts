import fs from 'fs';
import path from 'path';
import { Project } from '@/types';

const dataFilePath = path.join(process.cwd(), 'data', 'projects.json');

export const getProjects = (): Project[] => {
    try {
        if (!fs.existsSync(dataFilePath)) {
            return [];
        }
        const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Error reading projects:", error);
        return [];
    }
};

export const saveProjects = (projects: Project[]) => {
    // On Vercel, filesystem is read-only - skip local save
    // GitHub sync is the only way to persist data on Vercel
    if (process.env.VERCEL) {
        return;
    }
    
    try {
        const dir = path.dirname(dataFilePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(dataFilePath, JSON.stringify(projects, null, 4), 'utf-8');
    } catch (error: any) {
        // Silently fail if filesystem is read-only (e.g., on Vercel)
        // GitHub sync will handle persistence
        if (error?.code === 'EROFS') {
            return;
        }
        console.error("Error writing projects:", error);
    }
};
