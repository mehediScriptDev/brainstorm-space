"use client";

import React from "react";
import { useIdeaVault } from "@/context/IdeaVaultContext";

const Stats = () => {
    const { ideas } = useIdeaVault();

    // Aggregate counts
    const totalIdeas = ideas.length;
    const totalUsersCount = totalIdeas * 12 + 150;

    return (
        <section className="bg-indigo-600 dark:bg-indigo-900 py-16 text-white text-center transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <div className="text-4xl sm:text-5xl font-black mb-2 tracking-tight">
                            {totalUsersCount}+
                        </div>
                        <div className="text-indigo-200 text-sm font-semibold uppercase tracking-wider">
                            Innovators
                        </div>
                    </div>
                    <div>
                        <div className="text-4xl sm:text-5xl font-black mb-2 tracking-tight">
                            {totalIdeas}
                        </div>
                        <div className="text-indigo-200 text-sm font-semibold uppercase tracking-wider">
                            Ideas Shared
                        </div>
                    </div>
                    <div>
                        <div className="text-4xl sm:text-5xl font-black mb-2 tracking-tight">
                            24/7
                        </div>
                        <div className="text-indigo-200 text-sm font-semibold uppercase tracking-wider">
                            Community support
                        </div>
                    </div>
                    <div>
                        <div className="text-4xl sm:text-5xl font-black mb-2 tracking-tight">
                            100%
                        </div>
                        <div className="text-indigo-200 text-sm font-semibold uppercase tracking-wider">
                            Free to use
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
