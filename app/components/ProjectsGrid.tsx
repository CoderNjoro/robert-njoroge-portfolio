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
        <section id="projects" className="py-20 border-t">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <h2 className="text-3xl font-bold tracking-tight">Projects</h2>

                    <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar">
                        {(['all', 'completed', 'underway', 'future'] as Filter[]).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
                                    "hover:-translate-y-0.5 active:scale-95",
                                    filter === f
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                        : "bg-card border text-card-foreground hover:bg-secondary hover:shadow-md"
                                )}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={setSelectedProject}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-muted-foreground">
                        No projects found in this category.
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
