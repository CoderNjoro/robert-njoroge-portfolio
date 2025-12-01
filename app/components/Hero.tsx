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
        <section className="py-20 md:py-32">
            <div className="container px-4 md:px-6 mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                >
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        {profile.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground font-light">
                        {profile.subtitle}
                    </p>
                    <p className="max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
                        {profile.bio}
                    </p>
                    <div className="pt-4">
                        <button
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 active:scale-95 h-12 px-8 py-3"
                        >
                            View Projects
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-4 h-4 transition-transform group-hover:translate-y-1"
                            >
                                <path d="M12 5v14M19 12l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
