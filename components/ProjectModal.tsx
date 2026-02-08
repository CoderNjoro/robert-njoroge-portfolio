"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types";
import { X, Github, ExternalLink, Calendar, CheckCircle2, Clock, ChevronLeft, ChevronRight, Play, ArrowRight } from "lucide-react";
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
                    {/* Darker backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className={`relative w-full ${isExpanded ? 'max-w-full h-full' : 'max-w-6xl max-h-[95vh]'} bg-[#0a0a0a] border border-white/10 shadow-3xl rounded-none sm:rounded-3xl overflow-hidden flex flex-col transition-all duration-500 z-10`}
                    >
                        {/* Header - Styled like the screenshot */}
                        <div className="flex items-center justify-between p-6 md:p-8 bg-[#0f0f0f] border-b border-white/5 z-30">
                            <div className="space-y-2">
                                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">{project.title}</h2>
                                <div className="flex items-center gap-3">
                                    <div className={`px-4 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${project.status === 'completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                                        {project.status}
                                    </div>
                                    {project.year && (
                                        <div className="text-xs text-white/40 flex items-center gap-2 font-bold uppercase tracking-widest">
                                            <Calendar className="w-4 h-4" />
                                            {project.year}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all active:scale-95 group border border-white/10"
                                aria-label="Close modal"
                            >
                                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto no-scrollbar bg-[#0a0a0a]">
                            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-full">
                                {/* Media Section - Prominent and framed */}
                                <div className="lg:col-span-8 bg-black relative flex flex-col min-h-[450px] lg:min-h-0 border-b lg:border-b-0 lg:border-r border-white/5 group">
                                    <div className="relative flex-1 flex items-center justify-center p-4 sm:p-10">
                                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-[#111]">
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
                                                            alt={project.title}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    )}

                                                    {/* Navigation controls */}
                                                    {mediaItems.length > 1 && (
                                                        <>
                                                            <button
                                                                onClick={handlePrev}
                                                                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-2xl bg-black/60 backdrop-blur-xl text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-black/80 hover:scale-110 active:scale-95 z-40 hidden lg:flex items-center justify-center"
                                                            >
                                                                <ChevronLeft className="w-8 h-8 stroke-[3]" />
                                                            </button>
                                                            <button
                                                                onClick={handleNext}
                                                                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-2xl bg-black/60 backdrop-blur-xl text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-black/80 hover:scale-110 active:scale-95 z-40 hidden lg:flex items-center justify-center"
                                                            >
                                                                <ChevronRight className="w-8 h-8 stroke-[3]" />
                                                            </button>
                                                        </>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="text-white/10 flex flex-col items-center justify-center h-full gap-4">
                                                    <Play className="w-20 h-20 opacity-10" />
                                                    <span className="font-black uppercase tracking-widest text-[10px]">Media Unavailable</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Pagination dots indicator */}
                                        {mediaItems.length > 1 && (
                                            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-3 z-40 px-5 py-2.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                                                {mediaItems.map((_, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => setActiveMediaIndex(i)}
                                                        className={`h-2 rounded-full transition-all duration-300 ${activeMediaIndex === i ? 'w-10 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content Section - Inverted sidebar styling */}
                                <div className="lg:col-span-4 p-8 md:p-12 flex flex-col space-y-12 bg-[#0f0f0f]">
                                    <div className="space-y-12 flex-1">
                                        <section className="space-y-6">
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 border-b border-white/5 pb-4">Introduction</h3>
                                            <div className="text-lg text-white/80 leading-relaxed font-medium whitespace-pre-line">
                                                {project.description}
                                            </div>
                                        </section>

                                        <section className="space-y-6">
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 border-b border-white/5 pb-4">Technology</h3>
                                            <div className="flex flex-wrap gap-2.5">
                                                {project.tech.map((t) => (
                                                    <span key={t} className="px-5 py-2.5 bg-white/5 text-white/90 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all cursor-default">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </section>

                                        {project.status === 'underway' && project.progress !== undefined && (
                                            <section className="space-y-6">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Real-time Progress</span>
                                                    <span className="font-black text-3xl text-primary">{project.progress}%</span>
                                                </div>
                                                <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden p-1 border border-white/5">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${project.progress}%` }}
                                                        className="h-full bg-primary rounded-full shadow-[0_0_20px_rgba(var(--primary),0.5)]"
                                                    />
                                                </div>
                                            </section>
                                        )}
                                    </div>

                                    {/* Action buttons with light coloring for high visibility */}
                                    <div className="pt-12 border-t border-white/5 flex flex-col gap-5">
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group w-full inline-flex items-center justify-between px-10 py-6 bg-blue-600 text-white rounded-2xl hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98] transition-all font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20"
                                            >
                                                <span>Go to Dashboard</span>
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        )}
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full inline-flex items-center justify-between px-10 py-6 bg-white/5 text-white rounded-2xl border border-white/10 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all font-black text-xs uppercase tracking-[0.2em]"
                                            >
                                                <span>View Source Code</span>
                                                <Github className="w-5 h-5" />
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
