export interface Project {
    id: string;
    title: string;
    description: string;
    status: 'completed' | 'underway' | 'future';
    year?: string;
    startDate?: string;
    endDate?: string;
    progress?: number;
    images: string[]; // Base64 or URL
    video?: string; // Embed URL
    tech: string[];
    github?: string;
    link?: string;
    createdAt: number;
}

export interface Profile {
    title: string;
    subtitle: string;
    bio: string;
    email?: string;
    github?: string;
    linkedin?: string;
}

export interface SkillGroup {
    category: string;
    skills: string[];
}
