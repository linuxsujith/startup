"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Send } from "lucide-react";

export default function ForgotPasswordModal({ isOpen, onClose }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const { resetPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");
        try {
            await resetPassword(email);
            setMessage("Password reset link sent to your email!");
        } catch (err) {
            setError(err.message || "Failed to reset password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#16161A] p-8 shadow-2xl"
                    >
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 text-white/40 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-6 text-center">
                            <h2 className="text-2xl font-bold text-white">Reset Password</h2>
                            <p className="mt-2 text-sm text-gray-400">
                                Enter your email and we&apos;ll send you a link to reset your password.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                <input
                                    type="email"
                                    required
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-white/20 outline-none transition-all focus:border-blue-500/50 focus:bg-white/10"
                                />
                            </div>

                            {message && (
                                <div className="rounded-lg bg-emerald-500/10 p-3 text-center text-sm text-emerald-400">
                                    {message}
                                </div>
                            )}

                            {error && (
                                <div className="rounded-lg bg-rose-500/10 p-3 text-center text-sm text-rose-400">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition-all hover:bg-blue-500 disabled:opacity-50"
                            >
                                {loading ? "Sending..." : (
                                    <>
                                        <Send size={18} />
                                        Send Reset Link
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
