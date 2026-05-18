"use client";

import React from "react";
import { useIdeaVault } from "@/context/IdeaVaultContext";

const Stats = () => {
    const { ideas, comments } = useIdeaVault();

    const uniqueContributors = new Set(ideas.map((i) => i.authorEmail)).size;
    const totalLikes = ideas.reduce((acc, i) => acc + (i.likes || 0), 0);

    const statsData = [
        { value: ideas.length, label: "Ideas Shared" },
        { value: comments.length, label: "Interactions Feed" },
        { value: uniqueContributors || 0, label: "Active Innovators" },
        { value: totalLikes, label: "Likes Recorded" }
    ];

    return (
        <section className="bg-indigo-600 dark:bg-indigo-900 transition-colors py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                    {statsData.map((stat, idx) => (
                        <div key={idx} className="p-4">
                            <p className="text-3xl sm:text-4xl font-extrabold text-white">
                                {stat.value}
                            </p>
                            <p className="text-xs sm:text-sm font-semibold text-indigo-100 uppercase tracking-widest mt-1">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
