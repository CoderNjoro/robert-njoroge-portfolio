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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 drop-shadow-2xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/90 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 10 }}
                        className={`relative w-full ${isExpanded ? 'max-w-full h-full' : 'max-w-6xl max-h-[90vh]'} bg-card border shadow-2xl rounded-xl overflow-hidden flex flex-col transition-all duration-300`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 md:p-6 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-20">
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold tracking-tight">{project.title}</h2>
                                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                                    {project.year && (
                                        <>
                                            <Calendar className="w-3.5 h-3.5" />
                                            {project.year}
                                            <span className="opacity-30">|</span>
                                        </>
                                    )}
                                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${project.status === 'completed' ? 'bg-green-500/10 text-green-600' : 'bg-blue-500/10 text-blue-600'}`}>
                                        {project.status === 'completed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                        {project.status}
                                    </span>
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2.5 rounded-full hover:bg-muted transition-all active:scale-95 group shadow-sm bg-background border"
                                aria-label="Close modal"
                            >
                                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto no-scrollbar">
                            <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
                                {/* Media Section (Left/Top) */}
                                <div className="lg:col-span-3 bg-muted/30 relative flex flex-col h-full border-b lg:border-b-0 lg:border-r">
                                    <div className="relative flex-1 min-h-[300px] md:min-h-[450px] bg-black flex items-center justify-center overflow-hidden group">
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
                                                        transition={{ duration: 0.3 }}
                                                        src={mediaItems[activeMediaIndex].url}
                                                        alt={`${project.title} - View ${activeMediaIndex + 1}`}
                                                        className={`w-full h-full ${isExpanded ? 'object-contain' : 'object-contain'} transition-all`}
                                                    />
                                                )}

                                                {/* Nav Controls */}
                                                {mediaItems.length > 1 && (
                                                    <>
                                                        <button
                                                            onClick={handlePrev}
                                                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 hover:scale-110 active:scale-90 z-30"
                                                        >
                                                            <ChevronLeft className="w-6 h-6" />
                                                        </button>
                                                        <button
                                                            onClick={handleNext}
                                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 hover:scale-110 active:scale-90 z-30"
                                                        >
                                                            <ChevronRight className="w-6 h-6" />
                                                        </button>
                                                    </>
                                                )}

                                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-30">
                                                    <button
                                                        onClick={() => setIsExpanded(!isExpanded)}
                                                        className="p-2 rounded-lg bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-colors"
                                                        title={isExpanded ? "Exit Full Screen" : "Full Screen"}
                                                    >
                                                        {isExpanded ? <X className="w-4 h-4" /> : <Play className="w-4 h-4 rotate-90" />}
                                                    </button>
                                                </div>

                                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
                                                    {mediaItems.map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`h-1.5 rounded-full transition-all duration-300 ${activeMediaIndex === i ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-muted-foreground flex flex-col items-center gap-2">
                                                <Play className="w-12 h-12 opacity-10" />
                                                <span>No media to show</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Small Thumbnails Bar */}
                                    {mediaItems.length > 1 && (
                                        <div className="p-4 bg-muted/10 border-t flex gap-3 overflow-x-auto no-scrollbar scroll-smooth">
                                            {mediaItems.map((item, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setActiveMediaIndex(idx)}
                                                    className={`relative group flex-shrink-0 w-20 md:w-28 aspect-video rounded-lg overflow-hidden border-2 transition-all ${activeMediaIndex === idx ? 'border-primary ring-4 ring-primary/10 scale-[1.02]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                                >
                                                    {item.type === 'video' ? (
                                                        <div className="w-full h-full bg-black flex items-center justify-center">
                                                            <Play className="w-5 h-5 text-white fill-white" />
                                                        </div>
                                                    ) : (
                                                        <img src={item.url} alt="" className="w-full h-full object-cover" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Content Section (Right/Bottom) */}
                                <div className="lg:col-span-2 p-6 md:p-8 space-y-8 flex flex-col h-full bg-background/50">
                                    <div className="space-y-6 flex-1">
                                        <section className="space-y-3">
                                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">About the Project</h3>
                                            <div className="text-base md:text-lg text-foreground/80 leading-relaxed font-normal whitespace-pre-line">
                                                {project.description}
                                            </div>
                                        </section>

                                        {project.status === 'underway' && project.progress !== undefined && (
                                            <section className="space-y-3 p-4 rounded-xl bg-blue-50/50 border border-blue-100/50">
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="font-semibold text-blue-700">Project Progress</span>
                                                    <span className="font-mono text-blue-800">{project.progress}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-blue-200/50 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${project.progress}%` }}
                                                        className="h-full bg-blue-600 rounded-full shadow-sm"
                                                    />
                                                </div>
                                            </section>
                                        )}

                                        <section className="space-y-4">
                                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Tech Stack</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map((t) => (
                                                    <span key={t} className="px-3 py-1.5 bg-background border shadow-sm text-foreground rounded-lg text-sm font-medium hover:border-primary/50 transition-colors">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </section>
                                    </div>

                                    {/* Links Footer */}
                                    <div className="pt-8 border-t flex flex-col sm:flex-row gap-4">
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold text-sm shadow-xl shadow-primary/20 group"
                                            >
                                                Live Experience
                                                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                            </a>
                                        )}
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-secondary text-secondary-foreground border border-black/5 rounded-xl hover:bg-secondary/80 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold text-sm"
                                            >
                                                <Github className="w-4 h-4" />
                                                Source Code
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
