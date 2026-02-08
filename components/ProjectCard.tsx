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
            className="group cursor-pointer bg-card border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col"
        >
            <div className="aspect-[16/10] bg-muted relative overflow-hidden border-b border-black/5 dark:border-white/5">
                {project.images.length > 0 ? (
                    <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full bg-secondary/30 text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                        Preview Pending
                    </div>
                )}

                {/* Status Badge - Pinned */}
                <div className="absolute top-4 left-4">
                    <div className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm border ${project.status === 'completed' ? 'bg-white text-green-600 border-green-100' : 'bg-white text-blue-600 border-blue-100'}`}>
                        {project.status}
                    </div>
                </div>
            </div>

            <div className="p-8 space-y-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1">
                    <h3 className="font-black text-2xl tracking-tight leading-tight group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-base text-muted-foreground/80 leading-relaxed line-clamp-3 font-medium">
                        {project.description}
                    </p>
                </div>

                <div className="pt-6 border-t border-black/5 dark:border-white/5 flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map((t) => (
                            <span
                                key={t}
                                className="px-3 py-1 bg-secondary text-foreground rounded-lg text-[10px] font-black uppercase tracking-wider"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center text-xs font-black uppercase tracking-widest text-primary group-hover:translate-x-1 transition-transform">
                        Read Project Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
