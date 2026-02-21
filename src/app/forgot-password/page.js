"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Send, Zap } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();

    const handleReset = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await resetPassword(email);
            setSuccess(true);
        } catch (err) {
            setError("Unable to process request. Please check the email provided.");
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-brand-background text-white selection:bg-brand-blue/30 items-center justify-center px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md space-y-8"
            >
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-blue mb-6">
                        <Zap size={24} fill="white" />
                    </Link>
                    <h2 className="text-3xl font-bold tracking-tight">Recover Access</h2>
                    <p className="mt-2 text-gray-400">Enter your email to receive a reset link.</p>
                </div>

                <div className="matte-glass rounded-2xl p-8 shadow-2xl executive-border">
                    {!success ? (
                        <form onSubmit={handleReset} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Account Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-blue/50 transition-colors" size={18} />
                                    <input
                                        type="email"
                                        required
                                        autoFocus
                                        placeholder="name@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="executive-input pl-12"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3 text-center">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="executive-button-primary group"
                            >
                                {loading ? "Sending..." : (
                                    <>
                                        Send Reset Link
                                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center space-y-6 fade-in">
                            <div className="w-16 h-16 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center mx-auto">
                                <Send size={32} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold">Verification Sent</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    If that email exists in our system, a password reset link has been dispatched to <span className="text-white font-medium">{email}</span>.
                                </p>
                            </div>
                            <Link href="/login" className="executive-button-primary">
                                Return to Sign In
                            </Link>
                        </div>
                    )}

                    <div className="mt-8 pt-8 border-t border-brand-border text-center">
                        <Link href="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
                            <ArrowLeft size={16} />
                            Back to Sign In
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
