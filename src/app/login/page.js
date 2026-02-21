"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Shield, Privacy, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) router.push("/dashboard");
    }, [user, router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(formData.email, formData.password);
            router.push("/dashboard");
        } catch (err) {
            setError("Invalid email or password. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-brand-background text-white selection:bg-brand-blue/30 overflow-hidden">
            {/* Left Side: Brand & Trust (Desktop only) */}
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
                            Welcome Back
                        </h1>
                        <p className="mt-6 text-xl text-gray-400">
                            Access your Creator Command Center.
                        </p>

                        <div className="mt-12 space-y-5">
                            <div className="flex items-center gap-4 text-gray-300">
                                <CheckCircle2 className="text-brand-blue" size={20} />
                                <span className="font-medium">Secure authentication</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <CheckCircle2 className="text-brand-blue" size={20} />
                                <span className="font-medium">Private by design</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <CheckCircle2 className="text-brand-blue" size={20} />
                                <span className="font-medium">Fast AI workflows</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} CreatorOS. All rights reserved.
                </div>
            </div>

            {/* Right Side: Login Form */}
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
                        <h2 className="text-3xl font-bold">Welcome Back</h2>
                    </div>

                    <div className="matte-glass rounded-2xl p-8 shadow-2xl executive-border">
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-white">Sign In</h3>
                            <p className="text-sm text-gray-400 mt-1">Please enter your credentials.</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-blue/50 transition-colors" size={18} />
                                    <input
                                        type="email"
                                        required
                                        autoFocus
                                        placeholder="name@company.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="executive-input pl-12"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
                                    <Link href="/forgot-password" size="sm" className="text-xs font-medium text-brand-blue hover:text-brand-blue/80 transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-blue/50 transition-colors" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="executive-input pl-12 pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-brand-border bg-transparent text-brand-blue focus:ring-0 cursor-pointer"
                                    checked={formData.rememberMe}
                                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                />
                                <label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer select-none">Remember me</label>
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
                                {loading ? "Signing in..." : (
                                    <>
                                        Sign In
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-brand-border text-center">
                            <p className="text-sm text-gray-400">
                                New here? <Link href="/signup" className="text-brand-blue font-semibold hover:underline decoration-brand-blue/30 underline-offset-4">Create an account &rarr;</Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
