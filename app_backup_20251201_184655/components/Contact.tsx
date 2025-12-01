"use client";

import { Profile } from "@/types";
import { Mail, Github, Linkedin } from "lucide-react";

interface ContactProps {
    profile: Profile;
}

export function Contact({ profile }: ContactProps) {
    return (
        <section id="contact" className="py-20 border-t">
            <div className="container px-4 md:px-6 mx-auto max-w-4xl text-center">
                <h2 className="text-3xl font-bold tracking-tight mb-6">Get In Touch</h2>
                <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Interested in collaborating on ML projects, quant finance, or algorithmic trading initiatives?
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                    {profile.email && (
                        <a
                            href={`mailto:${profile.email}`}
                            className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 active:scale-95"
                        >
                            <Mail className="w-5 h-5" />
                            Email Me
                        </a>
                    )}
                    {profile.github && (
                        <a
                            href={profile.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-8 py-4 bg-card border text-card-foreground rounded-full font-medium hover:bg-secondary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95"
                        >
                            <Github className="w-5 h-5" />
                            GitHub
                        </a>
                    )}
                    {profile.linkedin && (
                        <a
                            href={profile.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-8 py-4 bg-card border text-card-foreground rounded-full font-medium hover:bg-secondary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95"
                        >
                            <Linkedin className="w-5 h-5" />
                            LinkedIn
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}
