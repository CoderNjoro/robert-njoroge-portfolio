"use client";

import { useState, useEffect } from "react";
import { Project } from "@/types";
import { db } from "@/lib/db";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export function ProjectEditor() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        const data = await db.getProjects();
        setProjects(data);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProject?.title) return;

        const projectToSave = {
            ...editingProject,
            id: editingProject.id || Date.now().toString(),
            createdAt: editingProject.createdAt || Date.now(),
            images: editingProject.images || [],
            tech: editingProject.tech || [],
        } as Project;

        if (editingProject.id) {
            await db.updateProject(projectToSave);
        } else {
            await db.addProject(projectToSave);
        }

        setEditingProject(null);
        loadProjects();
    };

    const handleDelete = async (id: string) => {
        if (confirm("Delete this project?")) {
            await db.deleteProject(id);
            loadProjects();
        }
    };

    if (editingProject) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{editingProject.id ? 'Edit Project' : 'New Project'}</h2>
                    <button onClick={() => setEditingProject(null)} className="p-2 hover:bg-muted rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title</label>
                            <input
                                className="w-full p-2 border rounded-md"
                                value={editingProject.title || ''}
                                onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>
                            <select
                                className="w-full p-2 border rounded-md"
                                value={editingProject.status || 'underway'}
                                onChange={e => setEditingProject({ ...editingProject, status: e.target.value as any })}
                            >
                                <option value="completed">Completed</option>
                                <option value="underway">In Progress</option>
                                <option value="future">Future</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            className="w-full p-2 border rounded-md h-32"
                            value={editingProject.description || ''}
                            onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Technologies (comma separated)</label>
                        <input
                            className="w-full p-2 border rounded-md"
                            value={editingProject.tech?.join(', ') || ''}
                            onChange={e => setEditingProject({ ...editingProject, tech: e.target.value.split(',').map(t => t.trim()) })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">GitHub URL</label>
                            <input
                                className="w-full p-2 border rounded-md"
                                value={editingProject.github || ''}
                                onChange={e => setEditingProject({ ...editingProject, github: e.target.value })}
                                placeholder="https://github.com/username/repo"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Live Demo URL</label>
                            <input
                                className="w-full p-2 border rounded-md"
                                value={editingProject.link || ''}
                                onChange={e => setEditingProject({ ...editingProject, link: e.target.value })}
                                placeholder="https://example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Video URL (Embed Link)</label>
                        <input
                            className="w-full p-2 border rounded-md"
                            value={editingProject.video || ''}
                            onChange={e => setEditingProject({ ...editingProject, video: e.target.value })}
                            placeholder="https://www.youtube.com/embed/..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Project Images</label>
                        <div className="grid grid-cols-2 gap-4 mb-2">
                            {editingProject.images?.map((img, idx) => (
                                <div key={idx} className="relative aspect-video bg-muted rounded-md overflow-hidden group">
                                    <img src={img} alt={`Project ${idx}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newImages = [...(editingProject.images || [])];
                                            newImages.splice(idx, 1);
                                            setEditingProject({ ...editingProject, images: newImages });
                                        }}
                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                                const files = Array.from(e.target.files || []);
                                files.forEach(file => {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setEditingProject(prev => ({
                                            ...prev!,
                                            images: [...(prev?.images || []), reader.result as string]
                                        }));
                                    };
                                    reader.readAsDataURL(file);
                                });
                            }}
                            className="w-full p-2 border rounded-md"
                        />
                        <p className="text-xs text-muted-foreground">Upload images. First image will be the thumbnail.</p>
                    </div>

                    <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
                        Save Project
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Projects</h2>
                <button
                    onClick={() => setEditingProject({ status: 'underway', tech: [] })}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                    <Plus className="w-4 h-4" />
                    Add Project
                </button>
            </div>

            <div className="space-y-4">
                {projects.map(project => (
                    <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg bg-background">
                        <div>
                            <h3 className="font-medium">{project.title}</h3>
                            <p className="text-sm text-muted-foreground">{project.status}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setEditingProject(project)}
                                className="p-2 hover:bg-muted rounded-md text-blue-500"
                            >
                                <Pencil className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleDelete(project.id)}
                                className="p-2 hover:bg-muted rounded-md text-red-500"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
                {projects.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No projects yet.</p>
                )}
            </div>
        </div>
    );
}
