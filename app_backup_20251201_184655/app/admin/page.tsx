"use client";

import { useState, useEffect } from "react";
import { Project, Profile, SkillGroup } from "@/types";
import { db } from "@/lib/db";
import { ProjectEditor } from "@/components/admin/ProjectEditor";
import { ProfileEditor } from "@/components/admin/ProfileEditor";
import { SkillsEditor } from "@/components/admin/SkillsEditor";
import { SettingsEditor } from "@/components/admin/SettingsEditor";
import { Lock } from "lucide-react";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<'projects' | 'profile' | 'skills' | 'settings'>('projects');

    // Mock Auth
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const correctPassword = await db.getAdminPassword();
        if (password === correctPassword) {
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Invalid password");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-muted/20">
                <div className="w-full max-w-md p-8 bg-card border rounded-lg shadow-lg">
                    <div className="flex flex-col items-center mb-6">
                        <div className="p-3 bg-primary/10 rounded-full mb-4">
                            <Lock className="w-6 h-6 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold">Admin Access</h1>
                        <p className="text-muted-foreground">Enter password to manage portfolio</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded-md bg-background"
                            placeholder="Password"
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                        >
                            Access Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/20 p-6">
            <div className="max-w-6xl mx-auto space-y-6">
                <header className="flex items-center justify-between bg-card p-6 rounded-lg border shadow-sm">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <button
                        onClick={() => setIsAuthenticated(false)}
                        className="text-sm text-muted-foreground hover:text-foreground"
                    >
                        Logout
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <aside className="space-y-2">
                        <button
                            onClick={() => setActiveTab('projects')}
                            className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'projects' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                        >
                            Projects
                        </button>
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'profile' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                        >
                            Profile
                        </button>
                        <button
                            onClick={() => setActiveTab('skills')}
                            className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'skills' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                        >
                            Skills
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'settings' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                        >
                            Settings
                        </button>
                    </aside>

                    <main className="md:col-span-3 bg-card p-6 rounded-lg border shadow-sm">
                        {activeTab === 'projects' && <ProjectEditor />}
                        {activeTab === 'profile' && <ProfileEditor />}
                        {activeTab === 'skills' && <SkillsEditor />}
                        {activeTab === 'settings' && <SettingsEditor />}
                    </main>
                </div>
            </div>
        </div>
    );
}
