"use client";

import { useState, useEffect } from "react";
import { SkillGroup } from "@/types";
import { db } from "@/lib/db";
import { Code, Database, Terminal, Cpu, Layout, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface SkillsProps {
    skills: SkillGroup[];
}

const CATEGORY_ICONS: Record<string, any> = {
    "ML & AI": Cpu,
    "Quantitative Finance": Terminal,
    "Data & Tools": Database,
    "Frontend": Layout,
    "Backend": Code,
    "Tools": Globe
};

export function Skills({ skills: initialSkills }: SkillsProps) {
    const [skills, setSkills] = useState<SkillGroup[]>(initialSkills);

    useEffect(() => {
        const loadSkills = async () => {
            const data = await db.getSkills();
            if (data && data.length > 0) {
                setSkills(data);
            }
        };
        loadSkills();
    }, []);

    return (
        <section id="skills" className="py-24 md:py-32 bg-secondary/10 relative overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">Expertise</h2>
                        <p className="text-muted-foreground/80 text-lg max-w-2xl font-medium">
                            A focused set of technologies and domains I specialize in to deliver high-impact engineering solutions.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.map((group, groupIdx) => {
                        const Icon = CATEGORY_ICONS[group.category] || Code;
                        return (
                            <motion.div
                                key={group.category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: groupIdx * 0.1 }}
                                className="group p-10 bg-card border border-black/5 dark:border-white/5 rounded-3xl hover:shadow-xl transition-all duration-500 flex flex-col h-full"
                            >
                                <div className="flex items-center gap-5 mb-10">
                                    <div className="p-4 bg-primary/5 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                        <Icon className="w-6 h-6 stroke-[2.5]" />
                                    </div>
                                    <h3 className="text-xl font-black tracking-tight uppercase">
                                        {group.category}
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2.5 mt-auto">
                                    {group.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-4 py-2 bg-secondary/80 text-foreground border border-black/5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-primary-foreground hover:border-transparent transition-all"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
