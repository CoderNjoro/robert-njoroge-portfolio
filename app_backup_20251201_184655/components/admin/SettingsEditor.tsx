"use client";

import { useState } from "react";
import { db } from "@/lib/db";
import { Save, Loader2, Lock } from "lucide-react";

export function SettingsEditor() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: "New passwords don't match" });
            return;
        }

        if (newPassword.length < 6) {
            setMessage({ type: 'error', text: "Password must be at least 6 characters" });
            return;
        }

        setSaving(true);

        try {
            const actualCurrentPassword = await db.getAdminPassword();
            if (currentPassword !== actualCurrentPassword) {
                setMessage({ type: 'error', text: "Incorrect current password" });
                setSaving(false);
                return;
            }

            await db.updateAdminPassword(newPassword);
            setMessage({ type: 'success', text: 'Password updated successfully' });
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update password' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-md space-y-6">
            <div className="flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5" />
                <h2 className="text-xl font-semibold">Security Settings</h2>
            </div>

            <form onSubmit={handleSave} className="space-y-4 p-6 border rounded-lg bg-white shadow-sm">
                <h3 className="font-medium mb-4">Change Admin Password</h3>

                {message && (
                    <div className={`p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                        {message.text}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Current Password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 mt-4"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Update Password
                </button>
            </form>
        </div>
    );
}
