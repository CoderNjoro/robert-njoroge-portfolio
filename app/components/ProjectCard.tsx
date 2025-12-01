"use client";

import { Project } from "@/types";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";

interface ProjectCardProps {
    project: Project;
    onClick: (project: Project) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
    return (
        <motion.div
            layoutId={`project-${project.id}`}
            onClick={() => onClick(project)}
            className="group cursor-pointer bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
            <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                {project.images.length > 0 ? (
                    <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                        No Preview
                    </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            <div className="p-5 space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg tracking-tight group-hover:text-primary transition-colors">
                            {project.title}
                        </h3>
                        {project.status === 'completed' ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                            <Clock className="w-4 h-4 text-blue-500" />
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((t) => (
                        <span
                            key={t}
                            className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded"
                        >
                            {t}
                        </span>
                    ))}
                    {project.tech.length > 3 && (
                        <span className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded">
                            +{project.tech.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
