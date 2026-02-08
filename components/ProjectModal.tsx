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
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-10">
                    {/* Deep Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/98 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 30 }}
                        className="relative w-full max-w-7xl h-full lg:max-h-[92vh] bg-[#0a0a0a] border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)] rounded-none md:rounded-[2.5rem] overflow-hidden flex flex-col z-10"
                    >
                        {/* Header - Expansive and Clear */}
                        <div className="flex items-center justify-between p-8 md:p-12 bg-[#0a0a0a] z-30">
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">{project.title}</h2>
                                <div className="flex items-center gap-4">
                                    <div className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] shadow-lg ${project.status === 'completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'}`}>
                                        {project.status}
                                    </div>
                                    {project.year && (
                                        <div className="text-xs text-white/30 flex items-center gap-2 font-black uppercase tracking-[0.2em]">
                                            <Calendar className="w-4 h-4" />
                                            {project.year}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all active:scale-90 group border border-white/10 shadow-2xl"
                                aria-label="Close modal"
                            >
                                <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Expansive Vertical Scroll Layout */}
                        <div className="flex-1 overflow-y-auto no-scrollbar bg-[#0a0a0a] px-8 md:px-12 pb-20">
                            <div className="max-w-6xl mx-auto space-y-16">
                                {/* Media Section - Full Width for Maximum Detail */}
                                <div className="space-y-8">
                                    <div className="relative aspect-video w-full rounded-[2rem] overflow-hidden bg-[#111] border border-white/5 shadow-2xl transition-all group">
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
                                                    <motion.img
                                                        key={activeMediaIndex}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.5 }}
                                                        src={mediaItems[activeMediaIndex].url}
                                                        alt={project.title}
                                                        className="w-full h-full object-contain"
                                                    />
                                                )}

                                                {/* Large Nav Controls */}
                                                {mediaItems.length > 1 && (
                                                    <>
                                                        <button
                                                            onClick={handlePrev}
                                                            className="absolute left-8 top-1/2 -translate-y-1/2 p-6 rounded-3xl bg-black/60 backdrop-blur-2xl text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-black/90 hover:scale-110 active:scale-95 z-40 hidden md:flex items-center justify-center shadow-2xl"
                                                        >
                                                            <ChevronLeft className="w-10 h-10 stroke-[3]" />
                                                        </button>
                                                        <button
                                                            onClick={handleNext}
                                                            className="absolute right-8 top-1/2 -translate-y-1/2 p-6 rounded-3xl bg-black/60 backdrop-blur-2xl text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-black/90 hover:scale-110 active:scale-95 z-40 hidden md:flex items-center justify-center shadow-2xl"
                                                        >
                                                            <ChevronRight className="w-10 h-10 stroke-[3]" />
                                                        </button>
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-white/10 gap-6">
                                                <Play className="w-24 h-24 opacity-5" />
                                                <span className="font-black uppercase tracking-[0.4em] text-xs">Media Loading</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Pagination Dots - Prominent */}
                                    {mediaItems.length > 1 && (
                                        <div className="flex justify-center gap-4">
                                            {mediaItems.map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setActiveMediaIndex(i)}
                                                    className={`h-2.5 rounded-full transition-all duration-500 ${activeMediaIndex === i ? 'w-16 bg-white' : 'w-2.5 bg-white/20 hover:bg-white/40'}`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Content Details */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                                    <div className="lg:col-span-8 space-y-12">
                                        <section className="space-y-6">
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Background & Architecture</h3>
                                            <div className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium">
                                                {project.description}
                                            </div>
                                        </section>

                                        {project.status === 'underway' && project.progress !== undefined && (
                                            <section className="space-y-8 p-10 rounded-[2rem] bg-white/5 border border-white/5">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Build Status</span>
                                                    <span className="font-black text-4xl text-white">{project.progress}%</span>
                                                </div>
                                                <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden p-1">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${project.progress}%` }}
                                                        className="h-full bg-gradient-to-r from-orange-500 to-green-500 rounded-full shadow-[0_0_30px_rgba(74,222,128,0.4)]"
                                                    />
                                                </div>
                                            </section>
                                        )}
                                    </div>

                                    {/* Sidebar Styles for Tech/Links */}
                                    <div className="lg:col-span-4 space-y-12">
                                        <section className="space-y-6">
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Technology</h3>
                                            <div className="flex flex-wrap gap-3">
                                                {project.tech.map((t) => (
                                                    <span key={t} className="px-5 py-2.5 bg-white/5 text-white/80 border border-white/5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all cursor-default">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </section>

                                        {/* Colored Button Identification */}
                                        <div className="flex flex-col gap-4">
                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group w-full inline-flex items-center justify-between px-10 py-6 bg-[#4ade80] text-black rounded-2xl hover:bg-[#3ce676] hover:scale-[1.02] active:scale-[0.98] transition-all font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(74,222,128,0.2)]"
                                                >
                                                    <span>Launch Experience</span>
                                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </a>
                                            )}
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group w-full inline-flex items-center justify-between px-10 py-6 bg-[#fb923c] text-black rounded-2xl hover:bg-[#f97316] hover:scale-[1.02] active:scale-[0.98] transition-all font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(251,146,60,0.2)]"
                                                >
                                                    <span>Browse Source</span>
                                                    <Github className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
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
