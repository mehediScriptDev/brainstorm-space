"use client";

import React from "react";
import { PlusCircle, MessageSquare, Target } from "lucide-react";

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="bg-indigo-50/50 dark:bg-gray-800/30 py-20 transition-colors border-y border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="space-y-3 mb-16">
                    <span className="inline-flex rounded-full border border-indigo-400/25 bg-indigo-500/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                        Operational Blueprint
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        How IdeaVault Works
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xl mx-auto leading-relaxed font-medium">
                        Explore our frictionless pipeline to capture early indicators, refine features, and launch product MVPs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Step 1 */}
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg text-center">
                        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <PlusCircle size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 dark:text-white">1. Post Your Idea</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                            Detail your startup concept, target audience segmentation, and proposed solution securely in our catalog.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg text-center">
                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MessageSquare size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 dark:text-white">2. Get Feedback</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                            Engage with the community network through structural critiques, comments, and pivot recommendations.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg text-center">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Target size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 dark:text-white">3. Validate & Build</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                            Leverage aggregate metrics, user validation votes, and validation logic to confidently engineer the MVP.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
