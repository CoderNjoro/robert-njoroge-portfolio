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
                "fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-transparent",
                scrolled ? "bg-background/80 backdrop-blur-md border-border py-4" : "bg-transparent py-6"
            )}
        >
            <div className="container px-4 md:px-6 mx-auto flex items-center justify-between">
                <Link href="/" className="text-lg font-bold tracking-tighter">
                    Robert Njoroge
                </Link>
                <nav className="hidden md:flex gap-8">
                    <Link href="#projects" className="text-sm font-medium hover:text-primary transition-colors text-muted-foreground">
                        Work
                    </Link>
                    <Link href="#skills" className="text-sm font-medium hover:text-primary transition-colors text-muted-foreground">
                        Skills
                    </Link>
                    <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors text-muted-foreground">
                        Contact
                    </Link>
                </nav>
                {/* Mobile menu button could go here */}
            </div>
        </header>
    );
}
