"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types";
import { X, Github, ExternalLink, Calendar, CheckCircle2, Clock, ChevronLeft, ChevronRight, Play, ArrowRight, Search } from "lucide-react";
import Image from "next/image";

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (!project) return null;

    const mediaItems = [
        ...(project.video ? [{ type: 'video', url: project.video }] : []),
        ...project.images.map(img => ({ type: 'image', url: img }))
    ];

    return (
        <AnimatePresence>
            {project && (
                <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col overflow-y-auto no-scrollbar">
                    {/* Full Screen Close Button */}
                    <button
                        onClick={onClose}
                        className="fixed top-8 right-8 z-[110] p-4 rounded-full bg-white/5 hover:bg-white/10 text-white backdrop-blur-xl border border-white/10 transition-all active:scale-90 group"
                        aria-label="Close project"
                    >
                        <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
                    </button>

                    {/* Immersive Background Blur Decor */}
                    <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
                        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#4ade80]/20 rounded-full blur-[150px]" />
                        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#fb923c]/20 rounded-full blur-[150px]" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 space-y-24"
                    >
                        {/* Hero Header Section */}
                        <div className="space-y-8 text-center md:text-left">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className={`inline-flex px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] ${project.status === 'completed' ? 'bg-[#4ade80]/20 text-[#4ade80] border border-[#4ade80]/30' : 'bg-[#fb923c]/20 text-[#fb923c] border border-[#fb923c]/30'}`}
                            >
                                {project.status}
                            </motion.div>
                            <h2 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tight text-white uppercase leading-[0.9]">{project.title}</h2>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 text-white/30 font-black uppercase tracking-[0.3em] text-xs">
                                {project.year && (
                                    <span className="flex items-center gap-3">
                                        <Calendar className="w-5 h-5" />
                                        {project.year}
                                    </span>
                                )}
                                <span className="w-2 h-2 rounded-full bg-white/10" />
                                <span>Software Engineering</span>
                            </div>
                        </div>

                        {/* Expansive Media Wall */}
                        <div className="space-y-12">
                            {mediaItems.length > 0 ? (
                                <div className="grid grid-cols-1 gap-12 md:gap-20">
                                    {mediaItems.map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 40 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="relative group cursor-zoom-in rounded-[3rem] overflow-hidden bg-[#111] border border-white/5 shadow-2xl"
                                            onClick={() => item.type === 'image' && setSelectedImage(item.url)}
                                        >
                                            {item.type === 'video' ? (
                                                <div className="aspect-video w-full">
                                                    <iframe
                                                        src={item.url}
                                                        className="w-full h-full"
                                                        allowFullScreen
                                                    />
                                                </div>
                                            ) : (
                                                <img
                                                    src={item.url}
                                                    alt={`${project.title} detailed view ${idx + 1}`}
                                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            )}
                                            {item.type === 'image' && (
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                                    <div className="p-6 rounded-full bg-white/10 border border-white/20 text-white">
                                                        <Search className="w-8 h-8" />
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-[60vh] rounded-[3rem] border-2 border-dashed border-white/5 flex items-center justify-center text-white/5">
                                    <Play className="w-32 h-32" />
                                </div>
                            )}
                        </div>

                        {/* Deep Details Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start border-t border-white/5 pt-24">
                            <div className="lg:col-span-8 space-y-12">
                                <section className="space-y-8 text-center md:text-left">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">The Challenge & Solution</h3>
                                    <div className="text-2xl md:text-4xl text-white/90 leading-[1.2] font-medium tracking-tight">
                                        {project.description}
                                    </div>
                                </section>

                                {project.status === 'underway' && project.progress !== undefined && (
                                    <section className="space-y-10 p-12 md:p-16 rounded-[3rem] bg-white/5 border border-white/5">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Current Velocity</span>
                                            <span className="font-black text-6xl text-white">{project.progress}%</span>
                                        </div>
                                        <div className="h-6 w-full bg-white/5 rounded-full overflow-hidden p-1.5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${project.progress}%` }}
                                                className="h-full bg-gradient-to-r from-[#fb923c] to-[#4ade80] rounded-full shadow-[0_0_50px_rgba(74,222,128,0.3)]"
                                            />
                                        </div>
                                    </section>
                                )}
                            </div>

                            <div className="lg:col-span-4 space-y-16">
                                <section className="space-y-8">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Stack Visualization</h3>
                                    <div className="flex flex-wrap gap-4">
                                        {project.tech.map((t) => (
                                            <span key={t} className="px-6 py-3 bg-white/5 text-white/70 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all cursor-default">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </section>

                                <div className="flex flex-col gap-6">
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative flex items-center justify-between p-8 bg-[#4ade80] text-black rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-[#3ce676] hover:scale-[1.03] active:scale-[0.97] transition-all shadow-[0_30px_60px_-15px_rgba(74,222,128,0.3)] overflow-hidden"
                                        >
                                            <span>Live Experience</span>
                                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-all" />
                                        </a>
                                    )}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative flex items-center justify-between p-8 bg-[#fb923c] text-black rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-[#f97316] hover:scale-[1.03] active:scale-[0.97] transition-all shadow-[0_30px_60px_-15px_rgba(251,146,60,0.3)] overflow-hidden"
                                        >
                                            <span>Technical Source</span>
                                            <Github className="w-6 h-6" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Full Screen Image Lightbox */}
                    <AnimatePresence>
                        {selectedImage && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[150] bg-black flex items-center justify-center p-4 md:p-12"
                                onClick={() => setSelectedImage(null)}
                            >
                                <button className="absolute top-12 right-12 text-white/50 hover:text-white transition-all">
                                    <X className="w-12 h-12" />
                                </button>
                                <motion.img
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    src={selectedImage}
                                    className="max-w-full max-h-full object-contain shadow-2xl rounded-2xl"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Footer for the Full Screen Modal */}
                    <footer className="relative z-10 border-t border-white/5 py-16 text-center text-[10px] font-black uppercase tracking-[0.5em] text-white/10">
                        &copy; {new Date().getFullYear()} Robert Njoroge &bull; Professional Engineering Portfolio
                    </footer>
                </div>
            )}
        </AnimatePresence>
    );
}
