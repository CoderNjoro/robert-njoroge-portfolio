import { Project, Profile, SkillGroup } from '@/types';

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
        year: '2025',
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
    github: 'https://github.com/CoderNjoro',
    linkedin: 'https://linkedin.com'
};

const MOCK_SKILLS: SkillGroup[] = [
    { category: 'ML & AI', skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Neural Networks', 'Deep Learning'] },
    { category: 'Quantitative Finance', skills: ['Algorithmic Trading', 'Risk Analysis', 'Portfolio Optimization', 'Time Series Analysis'] },
    { category: 'Data & Tools', skills: ['Python', 'SQL', 'Pandas', 'NumPy', 'AWS', 'Docker'] }
];

export const db = {
    getProjects: async (): Promise<Project[]> => {
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
        try {
            const res = await fetch('/api/profile');
            if (res.ok) {
                const data = await res.json();
                if (data) return data;
            }
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        }

        // Fallback to localStorage for compatibility or MOCK if not available
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('portfolio-profile');
            if (stored) return JSON.parse(stored);
        }
        return MOCK_PROFILE;
    },

    getSkills: async (): Promise<SkillGroup[]> => {
        try {
            const res = await fetch('/api/skills');
            if (res.ok) {
                const data = await res.json();
                if (data && data.length > 0) return data;
            }
        } catch (error) {
            console.error("Failed to fetch skills:", error);
        }

        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('portfolio-skills');
            if (stored) return JSON.parse(stored);
        }
        return MOCK_SKILLS;
    },

    // Admin Actions
    addProject: async (project: Project) => {
        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'create', project })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to add project');
            // On Vercel, GitHub sync is required for persistence - treat failures as errors
            if (data.githubError || !data.githubSynced) {
                const errorMsg = data.githubError || 'GitHub sync failed - project will not persist on Vercel';
                throw new Error(`Failed to save project: ${errorMsg}. Please check your GITHUB_TOKEN environment variable.`);
            }
            return data;
        } catch (error: any) {
            console.error("Failed to add project:", error);
            throw error;
        }
    },

    updateProject: async (project: Project) => {
        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'update', project })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to update project');
            // On Vercel, GitHub sync is required for persistence - treat failures as errors
            if (data.githubError || !data.githubSynced) {
                const errorMsg = data.githubError || 'GitHub sync failed - project will not persist on Vercel';
                throw new Error(`Failed to update project: ${errorMsg}. Please check your GITHUB_TOKEN environment variable.`);
            }
            return data;
        } catch (error: any) {
            console.error("Failed to update project:", error);
            throw error;
        }
    },

    deleteProject: async (id: string) => {
        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete', id })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to delete project');
            // On Vercel, GitHub sync is required for persistence - treat failures as errors
            if (data.githubError || !data.githubSynced) {
                const errorMsg = data.githubError || 'GitHub sync failed - deletion will not persist on Vercel';
                throw new Error(`Failed to delete project: ${errorMsg}. Please check your GITHUB_TOKEN environment variable.`);
            }
            return data;
        } catch (error: any) {
            console.error("Failed to delete project:", error);
            throw error;
        }
    },

    updateProfile: async (profile: Profile) => {
        try {
            const res = await fetch('/api/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to update profile');

            if (typeof window !== 'undefined') {
                localStorage.setItem('portfolio-profile', JSON.stringify(profile));
            }

            if (data.githubError || !data.githubSynced) {
                const errorMsg = data.githubError || 'GitHub sync failed - profile will not persist on Vercel';
                throw new Error(`Failed to save profile: ${errorMsg}. Please check your GITHUB_TOKEN.`);
            }
            return data;
        } catch (error: any) {
            console.error("Failed to update profile:", error);
            throw error;
        }
    },

    updateSkills: async (skills: SkillGroup[]) => {
        try {
            const res = await fetch('/api/skills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(skills)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to update skills');

            if (typeof window !== 'undefined') {
                localStorage.setItem('portfolio-skills', JSON.stringify(skills));
            }

            if (data.githubError || !data.githubSynced) {
                const errorMsg = data.githubError || 'GitHub sync failed - skills will not persist on Vercel';
                throw new Error(`Failed to save skills: ${errorMsg}. Please check your GITHUB_TOKEN.`);
            }
            return data;
        } catch (error: any) {
            console.error("Failed to update skills:", error);
            throw error;
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
