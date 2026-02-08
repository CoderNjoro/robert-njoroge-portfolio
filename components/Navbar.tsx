"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled ? "bg-background/70 backdrop-blur-xl border-b border-black/[0.03] dark:border-white/[0.03] py-3 shadow-sm" : "bg-transparent py-6"
            )}
        >
            <div className="container px-4 md:px-6 mx-auto flex items-center justify-between">
                <Link href="/" className="group flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center rounded-xl font-black text-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                        RN
                    </div>
                    <span className="text-xl font-bold tracking-tight hidden sm:block">
                        Robert Njoroge
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-1 bg-secondary/50 p-1 rounded-2xl border border-black/[0.03] dark:border-white/[0.03] backdrop-blur-md">
                    <Link href="#projects" className="px-5 py-2 text-sm font-bold rounded-xl hover:bg-background hover:shadow-sm transition-all text-muted-foreground hover:text-foreground">
                        Project Work
                    </Link>
                    <Link href="#skills" className="px-5 py-2 text-sm font-bold rounded-xl hover:bg-background hover:shadow-sm transition-all text-muted-foreground hover:text-foreground">
                        Expertise
                    </Link>
                    <Link href="#contact" className="px-5 py-2 text-sm font-bold rounded-xl hover:bg-background hover:shadow-sm transition-all text-muted-foreground hover:text-foreground">
                        Get In Touch
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/10"
                    >
                        Hire Me
                    </a>
                    {/* Mobile menu button could be added here */}
                </div>
            </div>
        </header>
    );
}
