"use client";

import React from "react";
import Link from "next/link";
import { useIdeaVault } from "@/context/IdeaVaultContext";
import { User, Target, Heart, MessageSquare } from "lucide-react";

const TrendingIdeas = () => {
    const { ideas, likeIdea } = useIdeaVault();

    const trendingList = ideas.slice(0, 6);

    return (
        <section id="trending" className="py-16 bg-white dark:bg-gray-900 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-10 text-left">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center tracking-tight">
                            <span className="mr-3 text-indigo-600 dark:text-indigo-400">🔥</span>
                            Trending Ideas
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium">
                            Discover the most recent innovations capturing community attention.
                        </p>
                    </div>
                    <Link
                        href="/ideas"
                        className="hidden md:flex items-center text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-semibold text-sm"
                    >
                        View All <span className="ml-2">→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trendingList.map((idea) => (
                        <div
                            key={idea.id}
                            className="group bg-white dark:bg-gray-800/95 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/90 overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/10"
                        >
                            <div className="h-52 w-full overflow-hidden relative bg-gray-200 dark:bg-gray-700">
                                <img
                                    src={idea.imageUrl}
                                    alt={idea.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                                    }}
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/10 to-transparent" />
                                <div className="absolute top-4 right-4 bg-indigo-600/95 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-sm">
                                    {idea.category}
                                </div>
                            </div>

                            <div className="p-6 grow flex flex-col text-left">
                                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight line-clamp-1">
                                    {idea.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300/90 text-sm mb-5 line-clamp-2 leading-relaxed grow">
                                    {idea.shortDescription}
                                </p>

                                <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300 mb-4 font-semibold">
                                    <span className="flex items-start">
                                        <User size={16} className="mr-1.5 text-indigo-500" />
                                        {idea.authorName}
                                    </span>
                                    <span className="flex items-start">
                                        <Target size={16} className="mr-1.5 text-indigo-500" />
                                        <span className="line-clamp-2">{idea.targetAudience || "General"}</span>
                                    </span>
                                </div>

                                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4 mt-1">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => likeIdea(idea.id)}
                                            className="flex items-center gap-1 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                                            title="Validate Idea"
                                        >
                                            <Heart size={15} className="fill-none stroke-current" />
                                            <span>{idea.likes}</span>
                                        </button>
                                        <Link
                                            href={`/ideas/${idea.id}#feedback`}
                                            className="flex items-center gap-1 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-indigo-500 transition-colors"
                                            title="Comments"
                                        >
                                            <MessageSquare size={15} />
                                            <span>{idea.commentsCount || 0}</span>
                                        </Link>
                                    </div>

                                    <Link
                                        href={`/ideas/${idea.id}`}
                                        className="py-2 px-4 bg-gray-50 hover:bg-indigo-50 text-indigo-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-indigo-300 font-bold rounded-lg transition-colors text-xs border border-gray-200 dark:border-gray-600 shadow-sm"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingIdeas;
