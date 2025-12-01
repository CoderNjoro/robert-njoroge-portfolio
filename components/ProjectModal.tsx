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

    if (!project) return null;

    // Combine video and images into a unified media list
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-5xl max-h-[95vh] overflow-y-auto bg-card border rounded-lg shadow-lg flex flex-col"
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-card/80 backdrop-blur-md border-b">
                            <h2 className="text-xl font-semibold tracking-tight">{project.title}</h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-muted transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-0">
                            {/* Main Gallery Viewer */}
                            <div className="relative aspect-video w-full bg-black/5 flex items-center justify-center overflow-hidden group">
                                {mediaItems.length > 0 ? (
                                    <>
                                        {mediaItems[activeMediaIndex].type === 'video' ? (
                                            <iframe
                                                src={mediaItems[activeMediaIndex].url}
                                                className="w-full h-full"
                                                allowFullScreen
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            />
                                        ) : (
                                            <img
                                                src={mediaItems[activeMediaIndex].url}
                                                alt={`${project.title} - View ${activeMediaIndex + 1}`}
                                                className="w-full h-full object-contain"
                                            />
                                        )}

                                        {/* Navigation Controls */}
                                        {mediaItems.length > 1 && (
                                            <>
                                                <button
                                                    onClick={handlePrev}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                                                >
                                                    <ChevronLeft className="w-6 h-6" />
                                                </button>
                                                <button
                                                    onClick={handleNext}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                                                >
                                                    <ChevronRight className="w-6 h-6" />
                                                </button>

                                                {/* Counter */}
                                                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 text-white text-xs rounded-full">
                                                    {activeMediaIndex + 1} / {mediaItems.length}
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-muted-foreground">
                                        No media available
                                    </div>
                                )}
                            </div>

                            {/* Thumbnails */}
                            {mediaItems.length > 1 && (
                                <div className="flex gap-2 p-4 overflow-x-auto border-b bg-muted/10">
                                    {mediaItems.map((item, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveMediaIndex(idx)}
                                            className={`relative flex-shrink-0 w-24 aspect-video rounded-md overflow-hidden border-2 transition-all ${activeMediaIndex === idx ? 'border-primary ring-2 ring-primary/20' : 'border-transparent opacity-60 hover:opacity-100'
                                                }`}
                                        >
                                            {item.type === 'video' ? (
                                                <div className="w-full h-full bg-black flex items-center justify-center">
                                                    <Play className="w-6 h-6 text-white" />
                                                </div>
                                            ) : (
                                                <img src={item.url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Project Details */}
                            <div className="p-6 space-y-8">
                                {/* Meta Info */}
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        {project.status === 'completed' ? (
                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <Clock className="w-4 h-4 text-blue-500" />
                                        )}
                                        <span className="capitalize">{project.status}</span>
                                    </div>
                                    {project.year && (
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>{project.year}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="prose dark:prose-invert max-w-none">
                                    <p className="text-lg leading-relaxed">{project.description}</p>
                                </div>

                                {/* Progress Bar for Underway */}
                                {project.status === 'underway' && project.progress !== undefined && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Progress</span>
                                            <span>{project.progress}%</span>
                                        </div>
                                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary transition-all duration-500"
                                                style={{ width: `${project.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Tech Stack */}
                                <div>
                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Technologies</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((t) => (
                                            <span key={t} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm font-medium">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Links */}
                                <div className="flex gap-4 pt-4 border-t">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium text-sm"
                                        >
                                            <Github className="w-4 h-4" />
                                            View Code
                                        </a>
                                    )}
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors font-medium text-sm"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
