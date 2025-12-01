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
    try {
        const dir = path.dirname(dataFilePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(dataFilePath, JSON.stringify(projects, null, 4), 'utf-8');
    } catch (error) {
        console.error("Error writing projects:", error);
    }
};
