"use client";

import { SkillGroup } from "@/types";
import { useEffect, useState } from "react";
import { db } from "@/lib/db";

interface SkillsProps {
    skills: SkillGroup[];
}

export function Skills({ skills: initialSkills }: SkillsProps) {
    const [skills, setSkills] = useState<SkillGroup[]>(initialSkills);

    useEffect(() => {
        const loadSkills = async () => {
            const data = await db.getSkills();
            setSkills(data);
        };
        loadSkills();
    }, []);
    return (
        <section id="skills" className="py-20 border-t bg-secondary/30">
            <div className="container px-4 md:px-6 mx-auto max-w-5xl">
                <h2 className="text-3xl font-bold tracking-tight mb-12">Skills</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {skills.map((group) => (
                        <div key={group.category} className="space-y-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                {group.category}
                            </h3>
                            <ul className="space-y-3">
                                {group.skills.map((skill) => (
                                    <li key={skill} className="flex items-center gap-2 text-base font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
