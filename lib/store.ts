import fs from 'fs';
import path from 'path';
import { Project } from '@/types';

const projectsFilePath = path.join(process.cwd(), 'data', 'projects.json');
const profileFilePath = path.join(process.cwd(), 'data', 'profile.json');
const skillsFilePath = path.join(process.cwd(), 'data', 'skills.json');

export const getProjects = (): Project[] => {
    try {
        if (!fs.existsSync(projectsFilePath)) {
            return [];
        }
        const fileContent = fs.readFileSync(projectsFilePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Error reading projects:", error);
        return [];
    }
};

export const saveProjects = (projects: Project[]) => {
    if (process.env.VERCEL) return;
    try {
        const dir = path.dirname(projectsFilePath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 4), 'utf-8');
    } catch (error: any) {
        if (error?.code === 'EROFS') return;
        console.error("Error writing projects:", error);
    }
};

export const getProfile = (): any => {
    try {
        if (!fs.existsSync(profileFilePath)) return null;
        return JSON.parse(fs.readFileSync(profileFilePath, 'utf-8'));
    } catch (error) {
        return null;
    }
};

export const saveProfile = (profile: any) => {
    if (process.env.VERCEL) return;
    try {
        const dir = path.dirname(profileFilePath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(profileFilePath, JSON.stringify(profile, null, 4), 'utf-8');
    } catch (error: any) {
        if (error?.code === 'EROFS') return;
        console.error("Error writing profile:", error);
    }
};

export const getSkills = (): any[] => {
    try {
        if (!fs.existsSync(skillsFilePath)) return [];
        return JSON.parse(fs.readFileSync(skillsFilePath, 'utf-8'));
    } catch (error) {
        return [];
    }
};

export const saveSkills = (skills: any[]) => {
    if (process.env.VERCEL) return;
    try {
        const dir = path.dirname(skillsFilePath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(skillsFilePath, JSON.stringify(skills, null, 4), 'utf-8');
    } catch (error: any) {
        if (error?.code === 'EROFS') return;
        console.error("Error writing skills:", error);
    }
};
