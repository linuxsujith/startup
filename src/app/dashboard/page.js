"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Zap,
    Rocket,
    Trophy,
    Sword,
    History,
    ArrowRight,
    Send,
    LayoutDashboard,
    User
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-pulse">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                        <div className="h-10 w-64 bg-white/5 rounded-lg" />
                        <div className="h-4 w-48 bg-white/5 rounded-md" />
                    </div>
                    <div className="h-10 w-32 bg-white/5 rounded-lg" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-32 bg-white/5 rounded-2xl border border-white/5" />
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 h-[400px] bg-white/5 rounded-3xl" />
                    <div className="space-y-6">
                        <div className="h-48 bg-white/5 rounded-3xl" />
                        <div className="h-64 bg-white/5 rounded-3xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!user) return null;

    const stats = [
        { name: 'Total Analyses', value: '12', icon: <Zap className="text-blue-500" /> },
        { name: 'Pitch Streak', value: '5 days', icon: <Trophy className="text-amber-500" /> },
        { name: 'Global Rank', value: '#42', icon: <Sword className="text-emerald-500" /> },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 fade-in">
            {/* Executive Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white tracking-tight">
                        Command Center
                    </h1>
                    <p className="text-gray-400 mt-2 text-lg">
                        Welcome back, <span className="text-white font-medium">{user.displayName || "User"}</span>.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/submit" className="rounded-lg bg-brand-blue/10 border border-brand-blue/20 px-5 py-2.5 text-sm font-semibold text-brand-blue hover:bg-brand-blue/20 transition-all flex items-center gap-2">
                        <Send size={16} />
                        New Analysis
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <motion.div
                        key={stat.name}
                        whileHover={{ translateY: -4 }}
                        className="matte-glass rounded-2xl p-6 executive-border shadow-lg"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-white/5">
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.name}</p>
                                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="matte-glass rounded-3xl p-8 executive-border min-h-[400px] shadow-xl">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-xl font-bold flex items-center gap-3">
                                <History className="text-blue-500" size={24} />
                                Recent Activity
                            </h2>
                            <button className="text-sm text-brand-blue hover:text-brand-blue/80 font-bold transition-colors">View all</button>
                        </div>
                        <div className="flex flex-col items-center justify-center h-64 text-center space-y-6">
                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-gray-600 border border-white/5">
                                <History size={40} />
                            </div>
                            <div className="space-y-2">
                                <p className="text-white font-semibold text-lg">No activity yet</p>
                                <p className="text-gray-400 max-w-xs mx-auto">Your analysis history will appear here as you build your Creator Empire.</p>
                            </div>
                            <Link href="/submit" className="text-brand-blue font-bold text-sm hover:underline underline-offset-4 decoration-brand-blue/30">
                                Start your first analysis &rarr;
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-3xl p-8 bg-gradient-to-br from-brand-blue to-brand-blue-muted text-white shadow-2xl shadow-brand-blue/20 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Zap size={100} fill="currentColor" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Upgrade to Pro</h3>
                        <p className="text-white/80 mb-8 text-sm leading-relaxed">Unlock deep market insights, priority AI models, and custom reports.</p>
                        <button className="w-full py-3.5 rounded-2xl bg-white text-brand-blue font-bold shadow-xl hover:bg-gray-50 transition-all">
                            View Plans
                        </button>
                    </motion.div>

                    <div className="matte-glass rounded-3xl p-8 executive-border shadow-xl">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Quick Links</h3>
                        <div className="space-y-3">
                            {[
                                { name: 'Idea Arena', href: '/arena' },
                                { name: 'Leaderboard', href: '/leaderboard' },
                                { name: 'Shark Tank AI', href: '/shark-tank' },
                            ].map(link => (
                                <Link key={link.name} href={link.href} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group">
                                    <span className="text-sm font-semibold">{link.name}</span>
                                    <ArrowRight size={16} className="text-gray-600 group-hover:text-brand-blue transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
