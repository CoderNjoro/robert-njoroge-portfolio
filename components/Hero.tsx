"use client";

import { motion } from "framer-motion";
import { Profile } from "@/types";
import { useEffect, useState } from "react";
import { db } from "@/lib/db";

interface HeroProps {
    profile: Profile;
}

export function Hero({ profile: initialProfile }: HeroProps) {
    const [profile, setProfile] = useState<Profile>(initialProfile);

    useEffect(() => {
        const loadProfile = async () => {
            const data = await db.getProfile();
            setProfile(data);
        };
        loadProfile();
    }, []);
    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
            {/* Background Aesthetics */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.4]" />
            </div>

            <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-6xl">
                <div className="flex flex-col gap-8 md:gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="space-y-8 max-w-4xl"
                    >
                        {/* Status Badge - Subtler */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-secondary/80 border border-black/5 dark:border-white/5 text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em]"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Forward-Thinking Software Engineer
                        </motion.div>

                        <h1 className="text-6xl md:text-9xl font-black tracking-tight leading-[0.85] text-foreground">
                            {profile.title.split(' ').map((word, i) => (
                                <span key={i} className="inline-block mr-4 last:mr-0">
                                    {word}
                                </span>
                            ))}
                        </h1>

                        <p className="text-2xl md:text-4xl font-black text-muted-foreground/60 tracking-tight max-w-3xl leading-tight">
                            {profile.subtitle}
                        </p>

                        <p className="max-w-2xl text-lg md:text-xl text-muted-foreground/80 leading-relaxed font-medium">
                            {profile.bio}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 pt-6">
                            <button
                                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group relative inline-flex items-center justify-center gap-3 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 bg-[#4ade80] text-black hover:bg-[#3ce676] hover:scale-[1.02] active:scale-[0.98] h-16 px-12 shadow-[0_20px_40px_rgba(74,222,128,0.2)]"
                            >
                                View Projects
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5 transition-transform group-hover:translate-y-1"
                                >
                                    <path d="M12 5v14M19 12l-7 7-7-7" />
                                </svg>
                            </button>

                            <button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="inline-flex items-center justify-center gap-3 rounded-2xl text-xs font-black uppercase tracking-[0.2em] h-16 px-12 bg-[#fb923c] text-black hover:bg-[#f97316] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(251,146,60,0.2)]"
                            >
                                Let's Connect
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
            >
                <div className="w-6 h-10 rounded-full border-2 border-primary/20 flex justify-center p-1.5">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-1 h-3 bg-primary/40 rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
}
