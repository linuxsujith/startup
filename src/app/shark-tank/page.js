'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Check, ShieldAlert, BadgeCheck, Zap, History, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function SharkTank() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [simulation, setSimulation] = useState(null);
    const [selectedIdea, setSelectedIdea] = useState(null);
    const [error, setError] = useState(null);

    const myIdeas = [
        { id: 1, startup_name: 'EcoPack', pitch: 'Biodegradable packaging from waste.', problem: 'Plastic waste.', solution: 'Bio-tech.', target: 'Global retailers.', revenue: 'Product sales.', stage: 'Growth' },
        { id: 2, startup_name: 'MedSync AI', pitch: 'AI records for clinics.', problem: 'Data fragmentation.', solution: 'Cloud AI.', target: 'Clinics.', revenue: 'SaaS.', stage: 'MVP' }
    ];

    const startSimulation = async () => {
        if (!selectedIdea) return;
        setLoading(true);
        setSimulation(null);
        setError(null);

        try {
            const response = await fetch('/api/shark-tank', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedIdea),
            });

            const data = await response.json();
            if (response.ok) {
                setSimulation(data);
            } else {
                setError(data.error || 'Simulation failed');
            }
        } catch (err) {
            setError('Failed to reach investor tank');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 space-y-12 fade-in">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold text-white tracking-tight outfit">Shark Tank AI</h1>
                <p className="text-gray-400 text-lg">Simulate a pitch to professional investors. High-stakes feedback.</p>
            </div>

            {!simulation && !loading && (
                <div className="matte-glass rounded-3xl p-10 executive-border max-w-2xl mx-auto text-center space-y-10">
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-brand-blue/10 text-brand-blue rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-brand-blue/5">
                            <Zap size={32} />
                        </div>
                        <h2 className="text-2xl font-bold">Ready to Pitch?</h2>
                        <p className="text-gray-400">Select one of your saved ideas to begin the simulation.</p>
                    </div>

                    <div className="space-y-3 text-left">
                        {myIdeas.map(idea => (
                            <button
                                key={idea.id}
                                onClick={() => setSelectedIdea(idea)}
                                className={`w-full p-5 rounded-2xl border transition-all text-left group relative ${selectedIdea?.id === idea.id ? 'border-brand-blue bg-brand-blue/5 ring-1 ring-brand-blue/20' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
                            >
                                <h3 className="font-bold text-lg">{idea.startup_name}</h3>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-1">{idea.pitch}</p>
                                {selectedIdea?.id === idea.id && <Check className="absolute top-5 right-5 text-brand-blue" size={20} />}
                            </button>
                        ))}
                    </div>

                    <button
                        className="executive-button-primary"
                        disabled={!selectedIdea}
                        onClick={startSimulation}
                    >
                        Start Pitch Simulation <Play size={18} />
                    </button>
                </div>
            )}

            {loading && (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                    <div className="relative w-24 h-24">
                        <div className="absolute inset-0 border-4 border-brand-blue/10 rounded-full" />
                        <div className="absolute inset-0 border-4 border-t-brand-blue rounded-full animate-spin" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold">Sharks are entering...</h3>
                        <p className="text-gray-400 max-w-xs">Analyzing your startup through the eyes of professional investors.</p>
                    </div>
                </div>
            )}

            {simulation && (
                <div className="space-y-12">
                    {/* Shark Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {simulation.sharks_involved.map((shark, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                key={idx}
                                className="matte-glass rounded-2xl p-6 executive-border space-y-4"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                                        <img
                                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${shark.name}&backgroundColor=3E7EFF`}
                                            alt={shark.name}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold">{shark.name}</h4>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${shark.decision === 'Deal' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                            {shark.decision}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400 italic font-inter leading-relaxed">&quot;{shark.feedback}&quot;</p>
                                {shark.equity > 0 && (
                                    <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                                        <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Equity Demand</span>
                                        <span className="text-brand-blue font-bold">{shark.equity}%</span>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <div className="matte-glass rounded-3xl p-8 executive-border">
                        <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                            <History size={20} className="text-brand-blue" />
                            The Q&A Battle
                        </h3>
                        <div className="space-y-6">
                            {simulation.q_and_a.map((item, idx) => (
                                <div key={idx} className="p-6 rounded-2xl bg-white/5 space-y-4 border-l-4 border-brand-blue">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">{item.asked_by} Question</span>
                                        <p className="text-white font-medium">{item.question}</p>
                                    </div>
                                    <div className="pl-4 border-l border-white/10 space-y-1">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Founder Response</span>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="matte-glass rounded-3xl p-10 executive-border shadow-2xl relative overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="flex items-center gap-8">
                                {simulation.final_verdict.is_deal ? (
                                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                                        <BadgeCheck size={40} />
                                    </div>
                                ) : (
                                    <div className="w-20 h-20 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20">
                                        <ShieldAlert size={40} />
                                    </div>
                                )}
                                <div className="space-y-2 text-center md:text-left">
                                    <h2 className="text-3xl font-bold tracking-tight">
                                        {simulation.final_verdict.is_deal ? 'IT\'S A DEAL!' : 'OUT OF THE TANK'}
                                    </h2>
                                    <p className="text-gray-400 max-w-xl leading-relaxed">{simulation.final_verdict.combined_reasoning}</p>
                                </div>
                            </div>
                            {simulation.final_verdict.is_deal && (
                                <div className="flex gap-8 border-l border-white/10 pl-10">
                                    <div className="text-center">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Investment</span>
                                        <span className="text-2xl font-bold text-brand-blue">{simulation.final_verdict.total_investment}</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Equity</span>
                                        <span className="text-2xl font-bold text-white">{simulation.final_verdict.equity_taken}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-10 pt-10 border-t border-white/5 space-y-4">
                            <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase tracking-widest">
                                <span>Deal Confidence</span>
                                <span>{simulation.deal_probability_percent}%</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${simulation.deal_probability_percent}%` }}
                                    className="h-full bg-brand-blue shadow-[0_0_15px_rgba(62,126,255,0.4)]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={() => setSimulation(null)} className="flex-1 py-4 rounded-2xl border border-white/10 font-bold hover:bg-white/5 transition-all">
                            New Simulation
                        </button>
                    </div>
                </div>
            )}

            {error && (
                <div className="matte-glass rounded-3xl p-12 text-center max-w-xl mx-auto space-y-6">
                    <ShieldAlert size={48} className="text-rose-500 mx-auto" />
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">Tank Error</h2>
                        <p className="text-gray-400">{error}</p>
                    </div>
                    <button onClick={startSimulation} className="executive-button-primary max-w-xs mx-auto">
                        Retry Simulation
                    </button>
                </div>
            )}
        </div>
    );
}
