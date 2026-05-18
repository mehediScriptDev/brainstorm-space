"use client";

import React, { useState } from "react";

const AssessmentTool = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Tech");
    const [hasComp, setHasComp] = useState(true);
    const [isDefined, setIsDefined] = useState(true);
    const [stage, setStage] = useState("pre-mvp");
    
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleAssess = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        setIsAnalyzing(true);
        setResult(null);

        setTimeout(() => {
            let score = 70;
            if (hasComp) score += 10;
            if (isDefined) score += 15;
            if (stage === "prototype") score += 5;
            
            score = Math.min(score, 98);

            const marketSizes = {
                Tech: "$125 Billion",
                Health: "$84 Billion",
                AI: "$210 Billion",
                Education: "$45 Billion",
                Finance: "$165 Billion"
            };

            const recommendations = {
                high: "Excellent signals! Your concept stands in a high-potential market. We recommend proceeding immediately with detailed landing-page validation and early signups.",
                mid: "Solid foundation. To accelerate momentum, focus on narrowing your primary target persona and building a low-cost clickable wireframe prototype.",
                low: "Concept needs refinement. Re-evaluate the core friction you are solving. Conduct 10 developer/user interviews to sharpen your proposed value proposition."
            };

            const fitGrade = score >= 85 ? "Excellent Market Fit" : score >= 75 ? "Strong Viability" : "Needs Refinement";
            const mockMarketVal = marketSizes[category] || "$75 Billion";
            const quote = score >= 85 ? recommendations.high : score >= 75 ? recommendations.mid : recommendations.low;

            setResult({
                score,
                fitGrade,
                marketVal: mockMarketVal,
                quote
            });
            setIsAnalyzing(false);
        }, 1200);
    };

    return (
        <section className="py-20 bg-base-200 border-y border-base-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div className="space-y-6 text-left">
                        <span className="inline-flex rounded-full border border-custom/15 bg-custom/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-custom">
                            Instant Market Signal
                        </span>
                        <h2 className="text-3xl font-black text-base-content sm:text-4xl tracking-tight leading-tight">
                            Quick Startup Idea Validation Tool
                        </h2>
                        <p className="text-base leading-relaxed text-base-content/70 font-medium">
                            Have a fresh startup idea? Put it through our instant evaluation engine to estimate target market size, validation score, and recommended execution steps.
                        </p>

                        <div className="space-y-4 pt-2">
                            {[
                                "Estimate potential market size instantly",
                                "Receive tailor-made MVP validation advice",
                                "Refine concepts before writing a single line of code"
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3 font-semibold text-base-content/85">
                                    <div className="h-6 w-6 rounded-full bg-custom/10 text-custom flex items-center justify-center text-xs">✓</div>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 -z-10 scale-95 bg-custom/10 blur-3xl rounded-4xl opacity-75" />

                        <div className="rounded-4xl border border-base-300/70 bg-base-100 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                            {!result && !isAnalyzing ? (
                                <form onSubmit={handleAssess} className="space-y-5">
                                    <div className="form-control">
                                        <label className="label text-sm font-bold text-base-content/70">Idea Title</label>
                                        <input
                                            type="text"
                                            required
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="e.g. AI-Powered Recipe Builder"
                                            className="input input-bordered w-full rounded-2xl focus:border-custom focus:outline-none"
                                        />
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="form-control">
                                            <label className="label text-sm font-bold text-base-content/70">Category Sector</label>
                                            <select
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                className="select select-bordered w-full rounded-2xl focus:border-custom focus:outline-none font-medium"
                                            >
                                                <option value="Tech">Technology & SaaS</option>
                                                <option value="Health">Healthcare</option>
                                                <option value="AI">AI & Machine Learning</option>
                                                <option value="Education">EdTech</option>
                                                <option value="Finance">FinTech</option>
                                            </select>
                                        </div>

                                        <div className="form-control">
                                            <label className="label text-sm font-bold text-base-content/70">Development Stage</label>
                                            <select
                                                value={stage}
                                                onChange={(e) => setStage(e.target.value)}
                                                className="select select-bordered w-full rounded-2xl focus:border-custom focus:outline-none font-medium"
                                            >
                                                <option value="pre-mvp">Idea Phase (Pre-MVP)</option>
                                                <option value="prototype">Prototype / Wireframe</option>
                                                <option value="mvp">Live MVP</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-3.5 bg-base-200/50 p-4.5 rounded-2xl border border-base-200">
                                        <div className="flex items-center justify-between">
                                            <div className="pr-2">
                                                <p className="text-sm font-bold text-base-content">Existing Competition?</p>
                                                <p className="text-xs text-base-content/50 font-medium">Validates active market demand</p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={hasComp}
                                                onChange={(e) => setHasComp(e.target.checked)}
                                                className="toggle toggle-custom"
                                            />
                                        </div>
                                        <div className="border-t border-base-200 my-2" />
                                        <div className="flex items-center justify-between">
                                            <div className="pr-2">
                                                <p className="text-sm font-bold text-base-content">Target Niche Defined?</p>
                                                <p className="text-xs text-base-content/50 font-medium">Narrow user segment targeting</p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={isDefined}
                                                onChange={(e) => setIsDefined(e.target.checked)}
                                                className="toggle toggle-custom"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn-custom btn w-full rounded-full py-3.5 text-sm font-extrabold shadow-lg shadow-custom/10 hover:shadow-custom/25"
                                    >
                                        Evaluate Concept Fit
                                    </button>
                                </form>
                            ) : isAnalyzing ? (
                                <div className="h-96 flex flex-col items-center justify-center text-center space-y-6">
                                    <div className="relative">
                                        <div className="h-16 w-16 rounded-full border-4 border-base-200 border-t-custom animate-spin" />
                                        <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-custom">VA</div>
                                    </div>
                                    <div className="space-y-1.5 animate-pulse">
                                        <p className="text-lg font-extrabold text-base-content">Analyzing Model Fit...</p>
                                        <p className="text-xs text-base-content/50 font-semibold tracking-wider uppercase">Running Monte Carlo simulations</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6 text-center py-4">
                                    <h3 className="text-2xl font-black text-base-content leading-tight">Your Idea Analysis</h3>
                                    
                                    <div className="flex justify-center pt-2">
                                        <div className="relative h-32 w-32 rounded-full border-8 border-base-200 flex flex-col items-center justify-center bg-base-200/25">
                                            <span className="text-3xl font-black text-custom leading-none">{result.score}%</span>
                                            <span className="text-[10px] uppercase font-bold text-base-content/40 mt-1">Score</span>
                                        </div>
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-2 text-left pt-2">
                                        <div className="rounded-2xl border border-base-200 p-4 bg-base-200/30">
                                            <span className="text-xs uppercase font-extrabold text-base-content/40">Market Size Est.</span>
                                            <p className="text-lg font-black text-base-content mt-0.5">{result.marketVal}</p>
                                        </div>
                                        <div className="rounded-2xl border border-base-200 p-4 bg-base-200/30">
                                            <span className="text-xs uppercase font-extrabold text-base-content/40">Viability Grade</span>
                                            <p className="text-lg font-black text-custom mt-0.5">{result.fitGrade}</p>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-custom/20 bg-custom/5 p-4 text-left">
                                        <p className="text-xs uppercase font-extrabold text-custom tracking-wider">Expert Recommendation</p>
                                        <p className="text-sm font-medium text-base-content/80 mt-1.5 leading-relaxed">{result.quote}</p>
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <button
                                            onClick={() => setResult(null)}
                                            className="btn btn-outline border-base-300 rounded-full flex-1 py-3"
                                        >
                                            Evaluate New Idea
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AssessmentTool;
