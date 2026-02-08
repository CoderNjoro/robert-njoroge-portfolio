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
                "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
                scrolled ? "bg-background/80 backdrop-blur-xl border-b border-black/[0.03] dark:border-white/[0.03] py-4 shadow-sm" : "bg-transparent py-8"
            )}
        >
            <div className="container px-4 md:px-6 mx-auto flex items-center justify-between">
                <Link href="/" className="group">
                    <span className="text-xl font-black tracking-tight uppercase group-hover:text-primary transition-colors">
                        Robert Njoroge
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="#projects" className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">
                        Projects
                    </Link>
                    <Link href="#skills" className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">
                        Skills
                    </Link>
                    <Link href="#contact" className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">
                        Contact
                    </Link>
                </nav>

                <div className="flex items-center gap-6">
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        className="hidden sm:inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#fb923c] text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#f97316] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-orange-500/10"
                    >
                        View Resume
                    </a>
                </div>
            </div>
        </header>
    );
}
