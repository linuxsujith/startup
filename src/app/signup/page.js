"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, CheckSquare, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreed: false
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.agreed) {
            setError("You must agree to the Terms & Privacy.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            await signup(formData.email, formData.password, formData.name);
            router.push("/dashboard");
        } catch (err) {
            setError(err.message || "Failed to create account. Please check your details.");
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-brand-background text-white selection:bg-brand-blue/30 overflow-hidden">
            {/* Desktop Split Content */}
            <div className="hidden lg:flex w-1/2 flex-col justify-between p-16 bg-[#080C10] border-r border-brand-border">
                <div className="fade-in">
                    <Link href="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center shadow-lg shadow-brand-blue/20">
                            <Zap size={18} fill="white" />
                        </div>
                        CreatorOS
                    </Link>

                    <div className="mt-32 max-w-lg">
                        <h1 className="text-5xl font-bold leading-tight tracking-tight text-white">
                            Create Your Account
                        </h1>
                        <p className="mt-6 text-xl text-gray-400">
                            Set up your workspace in less than a minute.
                        </p>
                    </div>
                </div>

                <div className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} CreatorOS. All rights reserved.
                </div>
            </div>

            {/* Signup Form */}
            <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md space-y-8"
                >
                    <div className="lg:hidden text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-blue mb-4">
                            <Zap size={24} fill="white" />
                        </div>
                        <h2 className="text-3xl font-bold">Create Account</h2>
                    </div>

                    <div className="matte-glass rounded-2xl p-8 shadow-2xl executive-border">
                        <div className="mb-8 font-inter">
                            <h3 className="text-lg font-semibold text-white">Get Started</h3>
                            <p className="text-sm text-gray-400 mt-1">Join the elite creator community.</p>
                        </div>

                        <form onSubmit={handleSignup} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-blue/50 transition-colors" size={18} />
                                    <input
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="executive-input pl-12"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-blue/50 transition-colors" size={18} />
                                    <input
                                        type="email"
                                        required
                                        placeholder="name@company.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="executive-input pl-12"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-blue/50 transition-colors" size={18} />
                                        <input
                                            type="password"
                                            required
                                            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="executive-input pl-12"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Confirm</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-blue/50 transition-colors" size={18} />
                                        <input
                                            type="password"
                                            required
                                            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            className="executive-input pl-12"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 py-2">
                                <input
                                    id="agreed"
                                    type="checkbox"
                                    required
                                    className="w-4 h-4 mt-0.5 rounded border-brand-border bg-transparent text-brand-blue focus:ring-0 cursor-pointer"
                                    checked={formData.agreed}
                                    onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                                />
                                <label htmlFor="agreed" className="text-xs text-gray-400 leading-normal cursor-pointer select-none">
                                    I agree to the <Link href="/terms" className="text-brand-blue hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-brand-blue hover:underline">Privacy Policy</Link>.
                                </label>
                            </div>

                            {error && (
                                <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3 text-center fade-in">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="executive-button-primary group"
                            >
                                {loading ? "Creating account..." : (
                                    <>
                                        Create Account
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-brand-border text-center">
                            <p className="text-sm text-gray-400">
                                Already have an account? <Link href="/login" className="text-brand-blue font-semibold hover:underline decoration-brand-blue/30 underline-offset-4">Sign in &rarr;</Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
