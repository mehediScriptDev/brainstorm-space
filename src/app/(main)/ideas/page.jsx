"use client";

import React, { useState, useEffect, Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useIdeaVault } from "@/context/IdeaVaultContext";
import { Search, Lightbulb, User, Target, Heart, MessageSquare } from "lucide-react";

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
                        <div
                            key={idea.id}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="h-48 w-full overflow-hidden relative bg-gray-200 dark:bg-gray-700">
                                <img 
                                    src={idea.imageUrl} 
                                    alt={idea.title} 
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }}
                                />
                                <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                    {idea.category}
                                </div>
                            </div>

                            <div className="p-6 grow flex flex-col">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                                    {idea.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 grow">
                                    {idea.shortDescription}
                                </p>
                                
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 space-x-4 font-semibold">
                                    <span className="flex items-center">
                                        <User size={16} className="mr-1 text-indigo-500" /> 
                                        {idea.authorName}
                                    </span>
                                    <span className="flex items-center">
                                        <Target size={16} className="mr-1 text-indigo-500" /> 
                                        {idea.targetAudience || "General"}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4 mt-2">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => likeIdea(idea.id)}
                                            className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-red-500 transition-colors"
                                            title="Validate Idea"
                                        >
                                            <Heart size={15} />
                                            <span>{idea.likes}</span>
                                        </button>
                                        <Link
                                            href={`/ideas/${idea.id}#feedback`}
                                            className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-indigo-500 transition-colors"
                                        >
                                            <MessageSquare size={15} />
                                            <span>{idea.commentsCount || 0}</span>
                                        </Link>
                                    </div>

                                    <Link 
                                        href={`/ideas/${idea.id}`}
                                        className="py-2 px-4 bg-gray-50 text-indigo-600 text-xs text-center"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
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
