'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Info, Zap, ArrowRight, TrendingUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ShareCard from '@/components/ShareCard';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function SubmitIdea() {
    const [formData, setFormData] = useState({
        startup_name: '',
        pitch: '',
        problem: '',
        solution: '',
        target: '',
        revenue: '',
        stage: 'Idea',
        monthly_revenue: ''
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('/api/analyze-startup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Analysis failed');
            setResult(data);
        } catch (err) {
            setError(err.message || 'Failed to connect to AI engine');
        } finally {
            setLoading(false);
        }
    };

    const radarData = result ? {
        labels: ['Market', 'Problem', 'Uniqueness', 'Execution', 'Revenue'],
        datasets: [{
            label: 'Startup Potential',
            data: [
                result.market_score,
                result.problem_strength,
                result.uniqueness_score,
                10 - result.execution_difficulty,
                result.revenue_clarity
            ],
            backgroundColor: 'rgba(62, 126, 255, 0.2)',
            borderColor: 'rgba(62, 126, 255, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(62, 126, 255, 1)',
        }],
    } : null;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 fade-in">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold tracking-tight outfit text-white">Startup Intelligence</h1>
                <p className="text-gray-400 text-lg">Detailed AI-powered validation and institutional-grade reporting.</p>
            </div>

            <div className={`grid gap-8 ${result ? 'lg:grid-cols-2' : 'max-w-3xl mx-auto'}`}>
                {/* Form Section */}
                <div className="matte-glass rounded-3xl p-8 executive-border shadow-2xl h-fit">
                    <div className="mb-8 font-inter">
                        <h2 className="text-xl font-bold">Analysis Parameters</h2>
                        <p className="text-sm text-gray-500 mt-1">Provide comprehensive details for accurate assessment.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Startup Name</label>
                                <input name="startup_name" placeholder="e.g. AgriSafe" required onChange={handleChange} className="executive-input" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Current Stage</label>
                                <select name="stage" onChange={handleChange} className="executive-input cursor-pointer">
                                    <option value="Idea">Idea Stage</option>
                                    <option value="MVP">MVP Ready</option>
                                    <option value="Revenue">Early Revenue</option>
                                    <option value="Growth">Scaling</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">The Pitch</label>
                            <input name="pitch" placeholder="Describe your vision in one sentence" required onChange={handleChange} className="executive-input" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Pain Point</label>
                                <textarea name="problem" placeholder="What core problem do you solve?" required onChange={handleChange} className="executive-input h-32" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">The Solution</label>
                                <textarea name="solution" placeholder="How do you solve it uniquely?" required onChange={handleChange} className="executive-input h-32" />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="executive-button-primary mt-4">
                            {loading ? "Analyzing Data..." : (
                                <>
                                    Run Intelligence Analysis
                                    <Send size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Results Section */}
                <AnimatePresence mode="wait">
                    {!result && !loading && !error && (
                        <div className="flex flex-col items-center justify-center p-12 text-center space-y-4 border-2 border-dashed border-white/5 rounded-3xl opacity-50">
                            <Info size={40} />
                            <p>Ready to analyze. Submit the form to begin.</p>
                        </div>
                    )}

                    {loading && (
                        <div className="flex flex-col items-center justify-center p-12 text-center space-y-6">
                            <div className="w-16 h-16 border-4 border-t-brand-blue border-white/5 rounded-full animate-spin" />
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold">Generating Report</h3>
                                <p className="text-gray-500 text-sm">Running market simulations and risk assessments...</p>
                            </div>
                        </div>
                    )}

                    {result && (
                        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                            <div className="matte-glass rounded-3xl p-8 executive-border shadow-2xl relative overflow-hidden">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="space-y-1">
                                        <span className="text-5xl font-bold text-brand-blue">{result.overall_score}</span>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Aggregate Score</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xl font-bold text-white block">{result.valuation_estimate_range_inr}</span>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Est. Valuation</p>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-10">
                                    <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase">
                                        <span>Funding Probability</span>
                                        <span className="text-white">{result.funding_probability_percent}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${result.funding_probability_percent}%` }}
                                            className="h-full bg-brand-blue shadow-[0_0_15px_rgba(62,126,255,0.4)]"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mb-10">
                                    {[
                                        { label: 'Market', val: result.market_score },
                                        { label: 'Problem', val: result.problem_strength },
                                        { label: 'Uniqueness', val: result.uniqueness_score },
                                    ].map(m => (
                                        <div key={m.label} className="p-4 rounded-2xl bg-white/5 text-center">
                                            <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">{m.label}</span>
                                            <span className="text-xl font-bold">{m.val}/10</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="h-[300px] flex items-center justify-center py-4">
                                    <Radar data={radarData} options={{
                                        scales: { r: { grid: { color: 'rgba(255,255,255,0.05)' }, angleLines: { color: 'rgba(255,255,255,0.05)' }, ticks: { display: false }, pointLabels: { color: '#64748b', font: { weight: 'bold' } } } },
                                        plugins: { legend: { display: false } }
                                    }} />
                                </div>
                            </div>

                            <div className="grid gap-6">
                                <div className="matte-glass rounded-2xl p-6 executive-border">
                                    <h4 className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-4">Critical Risks</h4>
                                    <ul className="space-y-3">
                                        {result.top_risks.map((risk, i) => (
                                            <li key={i} className="flex gap-3 text-sm text-gray-400">
                                                <AlertCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />
                                                {risk}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="matte-glass rounded-2xl p-6 executive-border">
                                    <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4">Improvement Path</h4>
                                    <ul className="space-y-3">
                                        {result.improvement_plan.map((step, i) => (
                                            <li key={i} className="flex gap-3 text-sm text-gray-400">
                                                <TrendingUp size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                                                {step}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <ShareCard
                                startupName={formData.startup_name}
                                probability={result.funding_probability_percent}
                                valuation={result.valuation_estimate_range_inr}
                                rank={Math.floor(Math.random() * 1000) + 1}
                                badge={result.overall_score > 80 ? "Unicorn Potential" : "Market Contender"}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
