"use client";

import { Profile } from "@/types";
import { Mail, Github, Linkedin } from "lucide-react";

interface ContactProps {
    profile: Profile;
}

export function Contact({ profile }: ContactProps) {
    return (
        <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl relative z-10">
                <div className="relative p-8 md:p-16 bg-primary text-primary-foreground rounded-[2rem] md:rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                                Ready to build something extraordinary?
                            </h2>
                            <p className="text-lg md:text-xl text-primary-foreground/70 font-medium">
                                I'm currently open to new roles and collaborations in software engineering, machine learning, and quantitative finance.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 w-full sm:w-auto">
                            {profile.email && (
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black rounded-2xl font-bold hover:scale-[1.03] active:scale-[0.97] transition-all shadow-2xl shadow-white/10"
                                >
                                    <Mail className="w-5 h-5" />
                                    Work With Me
                                </a>
                            )}
                            <div className="flex gap-4">
                                {profile.github && (
                                    <a
                                        href={profile.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 sm:flex-none p-5 bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-2xl hover:bg-white/20 transition-all hover:scale-110 active:scale-90"
                                        aria-label="GitHub"
                                    >
                                        <Github className="w-6 h-6" />
                                    </a>
                                )}
                                {profile.linkedin && (
                                    <a
                                        href={profile.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 sm:flex-none p-5 bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-2xl hover:bg-white/20 transition-all hover:scale-110 active:scale-90"
                                        aria-label="LinkedIn"
                                    >
                                        <Linkedin className="w-6 h-6" />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/10 w-full flex flex-col items-center gap-2">
                            <p className="text-xs uppercase tracking-[0.3em] font-bold text-white/30">Based in Kenya, Remote Worldwide</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
