"use client";

import React, { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useIdeaVault } from "@/lib/ideaVaultStore";
import { Search, Lightbulb } from "lucide-react";
import IdeaCard from "@/app/components/shared/IdeaCard";

function IdeasContent() {
    const { ideas, likeIdea } = useIdeaVault();
    const searchParams = useSearchParams();
    
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const catParam = searchParams.get("category");
        if (catParam) {
            setSelectedCategory(catParam);
        }
    }, [searchParams]);

    const categories = ["Tech", "Health", "AI", "Education", "Finance", "E-commerce", "Other"];

    const filteredIdeas = useMemo(() => {
        return ideas.filter((idea) => {
            const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory ? idea.category === selectedCategory : true;
            return matchesSearch && matchesCategory;
        }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [ideas, searchTerm, selectedCategory]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in text-left">
            <div className="mb-10 text-center space-y-4">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    Explore Innovations
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
                    Discover, filter, and dive deep into the startup ideas shared by our community.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-10 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="relative grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search ideas by title..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm"
                    />
                </div>
                <div className="w-full md:w-64">
                    <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer font-bold text-sm"
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
            </div>

            {filteredIdeas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-in">
                    {filteredIdeas.map((idea) => (
                        <IdeaCard key={idea.id} idea={idea} onLike={likeIdea} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 max-w-xl mx-auto space-y-4">
                    <Lightbulb className="mx-auto h-16 w-16 text-gray-400" />
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                        No ideas found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto font-medium">
                        Try adjusting your search query or category parameters to find curated concepts.
                    </p>
                </div>
            )}
        </div>
    );
}

export default function IdeasPage() {
    return (
        <Suspense fallback={
            <div className="min-h-[80vh] w-full flex flex-col items-center justify-center bg-base-100">
                <span className="loading loading-spinner text-custom loading-lg"></span>
                <p className="text-sm text-base-content/50 font-bold mt-4 animate-pulse">Filtering Curated Repository...</p>
            </div>
        }>
            <IdeasContent />
        </Suspense>
    );
}
