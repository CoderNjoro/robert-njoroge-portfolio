import { Project, Profile, SkillGroup } from '@/types';
import { createClient } from '@supabase/supabase-js';

// Mock Data
const MOCK_PROJECTS: Project[] = [
    {
        id: '1',
        title: 'Algorithmic Trading Bot',
        description: 'A high-frequency trading bot utilizing machine learning to predict market movements and execute trades with sub-millisecond latency.',
        status: 'completed',
        year: '2024',
        images: [],
        tech: ['Python', 'TensorFlow', 'Redis', 'Docker'],
        github: 'https://github.com',
        createdAt: Date.now(),
    },
    {
        id: '2',
        title: 'Portfolio Optimizer',
        description: 'Web application for optimizing investment portfolios using Modern Portfolio Theory and risk parity strategies.',
        status: 'underway',
        progress: 65,
        startDate: 'Jan 2025',
        endDate: 'Mar 2025',
        images: [],
        tech: ['Next.js', 'Python', 'FastAPI'],
        createdAt: Date.now() - 10000,
    }
];

const MOCK_PROFILE: Profile = {
    title: 'Machine Learning Engineer',
    subtitle: 'Specializing in Quantitative Finance & Algorithmic Trading',
    bio: 'Focused on building intelligent systems for financial markets, developing machine learning models for algorithmic trading, and analyzing complex financial data patterns.',
    email: 'contact@example.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com'
};

const MOCK_SKILLS: SkillGroup[] = [
    { category: 'ML & AI', skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Neural Networks', 'Deep Learning'] },
    { category: 'Quantitative Finance', skills: ['Algorithmic Trading', 'Risk Analysis', 'Portfolio Optimization', 'Time Series Analysis'] },
    { category: 'Data & Tools', skills: ['Python', 'SQL', 'Pandas', 'NumPy', 'AWS', 'Docker'] }
];

// Supabase Client (initialized only if env vars exist)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

export const db = {
    getProjects: async (): Promise<Project[]> => {
        if (supabase) {
            const { data, error } = await supabase.from('projects').select('*').order('createdAt', { ascending: false });
            if (!error && data) return data as any;
        }

        try {
            const res = await fetch('/api/projects');
            if (res.ok) {
                const data = await res.json();
                return data;
            }
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        }

        return MOCK_PROJECTS;
    },

    getProfile: async (): Promise<Profile> => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('portfolio-profile');
            if (stored) return JSON.parse(stored);
        }
        return MOCK_PROFILE;
    },

    getSkills: async (): Promise<SkillGroup[]> => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('portfolio-skills');
            if (stored) return JSON.parse(stored);
        }
        return MOCK_SKILLS;
    },

    // Admin Actions (Mock implementation for local storage / Supabase)
    addProject: async (project: Project) => {
        if (supabase) {
            // Implement Supabase insert
        }

        try {
            await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'create', project })
            });
        } catch (error) {
            console.error("Failed to add project:", error);
        }
    },

    updateProject: async (project: Project) => {
        try {
            await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'update', project })
            });
        } catch (error) {
            console.error("Failed to update project:", error);
        }
    },

    deleteProject: async (id: string) => {
        try {
            await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete', id })
            });
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
    },

    updateProfile: async (profile: Profile) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('portfolio-profile', JSON.stringify(profile));
        }
    },

    updateSkills: async (skills: SkillGroup[]) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('portfolio-skills', JSON.stringify(skills));
        }
    },

    getAdminPassword: async (): Promise<string> => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('portfolio-admin-password');
            if (stored) return stored;
        }
        return "admin123"; // Default password
    },

    updateAdminPassword: async (password: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('portfolio-admin-password', password);
        }
    }
};
