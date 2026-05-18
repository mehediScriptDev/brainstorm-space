"use client";

import React from "react";
import Link from "next/link";
import { useIdeaVault } from "@/context/IdeaVaultContext";
import IdeaCard from "@/app/components/shared/IdeaCard";

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
                        <IdeaCard key={idea.id} idea={idea} onLike={likeIdea} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingIdeas;
