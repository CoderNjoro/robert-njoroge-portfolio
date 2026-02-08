"use client";

import { Profile } from "@/types";
import { Mail, Github, Linkedin } from "lucide-react";

interface ContactProps {
    profile: Profile;
}

export function Contact({ profile }: ContactProps) {
    return (
        <section id="contact" className="py-24 md:py-32 bg-background border-t">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-7xl font-black tracking-tight leading-tight">
                                Let's build<br />together.
                            </h2>
                            <p className="text-xl text-muted-foreground font-medium max-w-lg leading-relaxed">
                                Currently seeking new engineering challenges. If you have a project or a role that matches my expertise, I'd love to hear from you.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground/60">Located in</p>
                            <p className="text-lg font-bold">Nairobi, Kenya — Remote Worldwide</p>
                        </div>
                    </div>

                    <div className="bg-secondary/50 p-8 md:p-12 rounded-[2rem] border border-black/5 dark:border-white/5 space-y-10">
                        <div className="space-y-6">
                            <h3 className="text-xl font-black uppercase tracking-tight">Direct Contact</h3>
                            <div className="flex flex-col gap-4">
                                {profile.email && (
                                    <a
                                        href={`mailto:${profile.email}`}
                                        className="inline-flex items-center justify-between p-6 bg-[#4ade80] text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#3ce676] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(74,222,128,0.1)]"
                                    >
                                        Send an Email
                                        <Mail className="w-5 h-5 flex-shrink-0" />
                                    </a>
                                )}
                                <div className="grid grid-cols-2 gap-4">
                                    {profile.github && (
                                        <a
                                            href={profile.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-6 bg-background border-2 border-[#fb923c]/20 hover:border-[#fb923c] rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#fb923c]/5 transition-all"
                                        >
                                            GitHub
                                            <Github className="w-5 h-5 flex-shrink-0" />
                                        </a>
                                    )}
                                    {profile.linkedin && (
                                        <a
                                            href={profile.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-6 bg-background border-2 border-[#fb923c]/20 hover:border-[#fb923c] rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#fb923c]/5 transition-all"
                                        >
                                            LinkedIn
                                            <Linkedin className="w-5 h-5 flex-shrink-0" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
