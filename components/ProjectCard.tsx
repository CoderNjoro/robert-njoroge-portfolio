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
            className="group cursor-pointer bg-card border border-black/[0.03] dark:border-white/[0.03] rounded-2xl overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full bg-gradient-to-b from-card to-card/50"
        >
            <div className="aspect-[16/10] bg-muted relative overflow-hidden">
                {project.images.length > 0 ? (
                    <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full bg-secondary/30 text-muted-foreground text-xs uppercase tracking-widest font-bold">
                        Preview Pending
                    </div>
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                    <div className="px-5 py-2.5 bg-white/90 backdrop-blur-md text-black rounded-full font-bold text-xs opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                        View Details
                    </div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                    <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border shadow-sm ${project.status === 'completed' ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-blue-500/10 text-blue-600 border-blue-500/20'}`}>
                        {project.status}
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col">
                <div className="space-y-3 flex-1">
                    <h3 className="font-bold text-xl tracking-tight leading-tight group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed line-clamp-3 font-normal">
                        {project.description}
                    </p>
                </div>

                <div className="pt-4 flex flex-wrap gap-1.5 border-t border-black/[0.03] dark:border-white/[0.03]">
                    {project.tech.slice(0, 4).map((t) => (
                        <span
                            key={t}
                            className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-secondary/50 text-secondary-foreground rounded-lg border border-transparent hover:border-black/5 transition-colors"
                        >
                            {t}
                        </span>
                    ))}
                    {project.tech.length > 4 && (
                        <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-secondary/50 text-secondary-foreground rounded-lg">
                            +{project.tech.length - 4}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
