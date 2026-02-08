"use client";

import { useState, useEffect } from "react";
import { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { cn } from "@/lib/utils";
import { db } from "@/lib/db";

interface ProjectsGridProps {
    projects: Project[];
}

type Filter = 'all' | 'completed' | 'underway' | 'future';

export function ProjectsGrid({ projects: initialProjects }: ProjectsGridProps) {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        const loadProjects = async () => {
            const data = await db.getProjects();
            setProjects(data);
        };
        loadProjects();

        // Listen for updates (optional, but good for UX if tabs are open)
        const handleStorageChange = () => loadProjects();
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);
    const [filter, setFilter] = useState<Filter>('all');

    const filteredProjects = projects.filter(p => {
        if (filter === 'all') return true;
        return p.status === filter;
    });

    return (
        <section id="projects" className="py-24 md:py-32 relative">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">Featured Work</h2>
                        <p className="text-muted-foreground text-lg max-w-xl">
                            A collection of specialized projects focusing on engineering excellence, data analysis, and intelligent systems.
                        </p>
                    </div>

                    <div className="flex bg-secondary/50 p-1 rounded-2xl border border-black/[0.03] dark:border-white/[0.03] backdrop-blur-md overflow-x-auto no-scrollbar">
                        {(['all', 'completed', 'underway', 'future'] as Filter[]).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap",
                                    filter === f
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10"
                                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                                )}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={setSelectedProject}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="relative group p-20 border-2 border-dashed border-black/5 dark:border-white/5 rounded-[3rem] text-center bg-secondary/10">
                        <div className="text-muted-foreground font-medium italic">
                            Building something great here... stay tuned.
                        </div>
                    </div>
                )}
            </div>

            <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
}
