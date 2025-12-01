"use client";

import { useState, useEffect } from "react";
import { SkillGroup } from "@/types";
import { db } from "@/lib/db";
import { Save, Loader2, Plus, Trash2, X } from "lucide-react";

export function SkillsEditor() {
    const [skills, setSkills] = useState<SkillGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        loadSkills();
    }, []);

    const loadSkills = async () => {
        try {
            const data = await db.getSkills();
            setSkills(data);
        } catch (error) {
            console.error("Failed to load skills", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);

        try {
            await db.updateSkills(skills);
            setMessage({ type: 'success', text: 'Skills updated successfully' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update skills' });
        } finally {
            setSaving(false);
        }
    };

    const addGroup = () => {
        setSkills([...skills, { category: "New Category", skills: [] }]);
    };

    const removeGroup = (index: number) => {
        const newSkills = [...skills];
        newSkills.splice(index, 1);
        setSkills(newSkills);
    };

    const updateCategory = (index: number, value: string) => {
        const newSkills = [...skills];
        newSkills[index].category = value;
        setSkills(newSkills);
    };

    const addSkill = (groupIndex: number) => {
        const newSkills = [...skills];
        newSkills[groupIndex].skills.push("New Skill");
        setSkills(newSkills);
    };

    const removeSkill = (groupIndex: number, skillIndex: number) => {
        const newSkills = [...skills];
        newSkills[groupIndex].skills.splice(skillIndex, 1);
        setSkills(newSkills);
    };

    const updateSkill = (groupIndex: number, skillIndex: number, value: string) => {
        const newSkills = [...skills];
        newSkills[groupIndex].skills[skillIndex] = value;
        setSkills(newSkills);
    };

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-4xl space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Edit Skills</h2>
                <div className="flex gap-4">
                    <button
                        onClick={addGroup}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200"
                    >
                        <Plus className="w-4 h-4" />
                        Add Category
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </button>
                </div>
            </div>

            {message && (
                <div className={`p-3 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((group, groupIndex) => (
                    <div key={groupIndex} className="border rounded-lg p-4 bg-white shadow-sm relative group">
                        <button
                            onClick={() => removeGroup(groupIndex)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove Category"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="mb-4 pr-8">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Category Name</label>
                            <input
                                type="text"
                                value={group.category}
                                onChange={(e) => updateCategory(groupIndex, e.target.value)}
                                className="w-full p-2 border rounded-md font-medium"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Skills</label>
                            {group.skills.map((skill, skillIndex) => (
                                <div key={skillIndex} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={skill}
                                        onChange={(e) => updateSkill(groupIndex, skillIndex, e.target.value)}
                                        className="flex-1 p-2 border rounded-md text-sm"
                                    />
                                    <button
                                        onClick={() => removeSkill(groupIndex, skillIndex)}
                                        className="p-2 text-gray-400 hover:text-red-500"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => addSkill(groupIndex)}
                                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 mt-2"
                            >
                                <Plus className="w-3 h-3" /> Add Skill
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {skills.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
                    <p className="text-gray-500">No skill categories yet. Click "Add Category" to start.</p>
                </div>
            )}
        </div>
    );
}
