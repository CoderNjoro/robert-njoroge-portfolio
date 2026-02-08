"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types";
import { X, Github, ExternalLink, Calendar, CheckCircle2, Clock, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
    const [activeMediaIndex, setActiveMediaIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    if (!project) return null;

    const mediaItems = [
        ...(project.video ? [{ type: 'video', url: project.video }] : []),
        ...project.images.map(img => ({ type: 'image', url: img }))
    ];

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveMediaIndex((prev) => (prev + 1) % mediaItems.length);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    };

    return (
        <AnimatePresence>
            {project && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-8">
                    {/* Darker, more solid backdrop to prevent background content bleed */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className={`relative w-full ${isExpanded ? 'max-w-full h-full' : 'max-w-6xl max-h-[95vh]'} bg-card border shadow-2xl rounded-none sm:rounded-2xl overflow-hidden flex flex-col transition-all duration-300 z-10`}
                    >
                        {/* Header - Solid background */}
                        <div className="flex items-center justify-between p-5 md:p-7 border-b bg-card z-30 shadow-sm">
                            <div className="space-y-1">
                                <h2 className="text-2xl md:text-3xl font-black tracking-tight">{project.title}</h2>
                                <div className="flex items-center gap-3">
                                    {project.year && (
                                        <div className="text-sm text-muted-foreground flex items-center gap-1.5 font-medium">
                                            <Calendar className="w-4 h-4" />
                                            {project.year}
                                        </div>
                                    )}
                                    <div className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${project.status === 'completed' ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-blue-500/10 text-blue-600 border border-blue-500/20'}`}>
                                        {project.status}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 rounded-xl hover:bg-muted transition-all active:scale-90 group bg-background border shadow-sm"
                                aria-label="Close modal"
                            >
                                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar bg-background">
                            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-full">
                                {/* Media Section - Larger share */}
                                <div className="lg:col-span-8 bg-black relative flex flex-col min-h-[400px] lg:min-h-0 border-b lg:border-b-0 lg:border-r border-black/10">
                                    <div className="relative flex-1 flex items-center justify-center overflow-hidden group">
                                        {mediaItems.length > 0 ? (
                                            <>
                                                {mediaItems[activeMediaIndex].type === 'video' ? (
                                                    <iframe
                                                        src={mediaItems[activeMediaIndex].url}
                                                        className="w-full h-full aspect-video"
                                                        allowFullScreen
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    />
                                                ) : (
                                                    <motion.img
                                                        key={activeMediaIndex}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.4 }}
                                                        src={mediaItems[activeMediaIndex].url}
                                                        alt={`${project.title} screenshot`}
                                                        className="w-full h-full object-contain pointer-events-none"
                                                    />
                                                )}

                                                {/* Navigation controls - High visibility */}
                                                {mediaItems.length > 1 && (
                                                    <>
                                                        <button
                                                            onClick={handlePrev}
                                                            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-2xl bg-black/40 backdrop-blur-xl text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60 hover:scale-110 active:scale-95 z-40 shadow-2xl"
                                                        >
                                                            <ChevronLeft className="w-8 h-8 stroke-[3]" />
                                                        </button>
                                                        <button
                                                            onClick={handleNext}
                                                            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-2xl bg-black/40 backdrop-blur-xl text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60 hover:scale-110 active:scale-95 z-40 shadow-2xl"
                                                        >
                                                            <ChevronRight className="w-8 h-8 stroke-[3]" />
                                                        </button>
                                                    </>
                                                )}

                                                {/* Dots indicator */}
                                                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-40 bg-black/20 backdrop-blur-md p-2 rounded-full border border-white/5">
                                                    {mediaItems.map((_, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => setActiveMediaIndex(i)}
                                                            className={`h-2 rounded-full transition-all duration-300 ${activeMediaIndex === i ? 'w-10 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-white/20 flex flex-col items-center gap-4">
                                                <Play className="w-16 h-16 opacity-10" />
                                                <span className="font-bold tracking-widest uppercase text-xs">Preview Loading...</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="lg:col-span-4 p-8 md:p-10 flex flex-col space-y-10">
                                    <div className="space-y-10 flex-1">
                                        <section className="space-y-4">
                                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground/60 border-b pb-4 border-black/5 dark:border-white/5">Overview</h3>
                                            <div className="text-lg text-foreground/90 leading-relaxed font-normal whitespace-pre-line">
                                                {project.description}
                                            </div>
                                        </section>

                                        {project.status === 'underway' && project.progress !== undefined && (
                                            <section className="space-y-4 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-bold uppercase tracking-wider text-primary">Development Progress</span>
                                                    <span className="font-black text-xl text-primary">{project.progress}%</span>
                                                </div>
                                                <div className="h-3 w-full bg-primary/10 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${project.progress}%` }}
                                                        className="h-full bg-primary rounded-full shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                                                    />
                                                </div>
                                            </section>
                                        )}

                                        <section className="space-y-5">
                                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground/60 border-b pb-4 border-black/5 dark:border-white/5">Technology</h3>
                                            <div className="flex flex-wrap gap-2.5">
                                                {project.tech.map((t) => (
                                                    <span key={t} className="px-4 py-2 bg-secondary/80 text-foreground border border-black/5 dark:border-white/5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground hover:border-transparent transition-all cursor-default">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </section>
                                    </div>

                                    {/* Action links */}
                                    <div className="pt-10 border-t border-black/5 dark:border-white/5 flex flex-col gap-4">
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-primary text-primary-foreground rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/20"
                                            >
                                                Visit Project site
                                                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </a>
                                        )}
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-background border-2 border-black/5 dark:border-white/5 text-foreground rounded-2xl hover:bg-muted hover:scale-[1.02] active:scale-[0.98] transition-all font-black text-sm uppercase tracking-widest"
                                            >
                                                <Github className="w-5 h-5" />
                                                View Source
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
