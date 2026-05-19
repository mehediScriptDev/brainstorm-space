"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useIdeaVault } from "@/lib/ideaVaultStore";

export default function AddIdeaPage() {
    const router = useRouter();
    const { addIdea, activeUser, isLoading } = useIdeaVault();

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Tech");
    const [shortDescription, setShortDescription] = useState("");
    const [detailedDescription, setDetailedDescription] = useState("");
    const [problemStatement, setProblemStatement] = useState("");
    const [proposedSolution, setProposedSolution] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [budget, setBudget] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [tagsString, setTagsString] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const categories = ["Tech", "Health", "AI", "Education", "Finance", "E-commerce", "Other"];

    useEffect(() => {
        if (!isLoading && !activeUser) {
            router.push("/login");
        }
    }, [activeUser, isLoading, router]);

    useEffect(() => {
        document.title = "Post Idea | IdeaVault";
    }, []);

    if (isLoading || !activeUser) {
        return (
            <div className="min-h-[80vh] w-full flex flex-col items-center justify-center bg-base-100">
                <span className="loading loading-spinner text-custom loading-lg"></span>
                <p className="text-sm text-base-content/50 font-bold mt-4 animate-pulse">Decrypting Security Credentials...</p>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        // Validate required fields
        if (!title.trim() || !shortDescription.trim() || !problemStatement.trim() || !proposedSolution.trim() || !targetAudience.trim() || !detailedDescription.trim()) {
            setError("All fields marked with * are required");
            setSubmitting(false);
            return;
        }

        const tags = tagsString
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t.length > 0);

        const ideaData = {
            title,
            category,
            shortDescription,
            detailedDescription,
            problemStatement,
            proposedSolution,
            targetAudience,
            budget: budget ? Number(budget) : 0,
            imageUrl: imageUrl.trim() || "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags
        };
        
        try {
            const success = await addIdea(ideaData);
            setSubmitting(false);
            if (success) {
                router.push("/my-ideas");
            } else {
                setError("Failed to post idea. Please try again.");
            }
        } catch (err) {
            setSubmitting(false);
            setError("An error occurred while posting your idea. Please try again.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in text-left">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                
                <div className="bg-indigo-600 p-8 text-white text-left">
                    <h2 className="text-3xl font-bold mb-2">Share Your Startup Idea</h2>
                    <p className="text-indigo-100 font-semibold text-sm">
                        Fill in the details below to publish your concept to the community.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 m-6">
                        <p className="text-red-700 dark:text-red-300 font-semibold text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="p-8 space-y-6 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                                Idea Title*
                            </label>
                            <input 
                                required 
                                type="text" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-250 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-sm" 
                                placeholder="e.g., EcoDelivery - Sustainable Logistics" 
                            />
                        </div>
                        
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                                Short Description*
                            </label>
                            <input 
                                required 
                                type="text" 
                                maxLength={150} 
                                value={shortDescription} 
                                onChange={(e) => setShortDescription(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-255 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-sm" 
                                placeholder="A catchy one-liner explaining the core concept..." 
                            />
                        </div>

                        <div className="form-control">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                                Category*
                            </label>
                            <select 
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer font-bold text-sm"
                            >
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                                Estimated Budget ($)
                            </label>
                            <input 
                                type="number" 
                                value={budget} 
                                onChange={(e) => setBudget(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-sm" 
                                placeholder="e.g., 5000" 
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                                Image URL*
                            </label>
                            <input 
                                required 
                                type="url" 
                                value={imageUrl} 
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-sm" 
                                placeholder="https://..." 
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                                Target Audience*
                            </label>
                            <input 
                                required 
                                type="text" 
                                value={targetAudience} 
                                onChange={(e) => setTargetAudience(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-sm" 
                                placeholder="e.g., College students, Small business owners" 
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                                Problem Statement*
                            </label>
                            <textarea 
                                required 
                                rows={3} 
                                value={problemStatement} 
                                onChange={(e) => setProblemStatement(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium leading-relaxed" 
                                placeholder="What specific problem are you solving?"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                                Proposed Solution*
                            </label>
                            <textarea 
                                required 
                                rows={3} 
                                value={proposedSolution} 
                                onChange={(e) => setProposedSolution(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium leading-relaxed" 
                                placeholder="How does your idea solve the problem?"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                                Detailed Description*
                            </label>
                            <textarea 
                                required 
                                rows={5} 
                                value={detailedDescription} 
                                onChange={(e) => setDetailedDescription(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium leading-relaxed" 
                                placeholder="Explain the mechanics, business model, and vision..."
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                                Tags (comma separated)
                            </label>
                            <input 
                                type="text" 
                                value={tagsString} 
                                onChange={(e) => setTagsString(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-sm" 
                                placeholder="eco, logistics, saas" 
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button 
                            type="submit" 
                            disabled={submitting} 
                            className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition-colors disabled:opacity-50 text-sm"
                        >
                            {submitting ? "Submitting..." : "Post Idea"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
