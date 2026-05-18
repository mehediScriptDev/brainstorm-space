"use client";

import React from "react";
import { PlusCircle, Search, MessageSquare, CheckCircle } from "lucide-react";

const HowItWorks = () => {
    const steps = [
        {
            icon: <PlusCircle className="h-6 w-6" />,
            title: "1. Share Concepts",
            desc: "Draft your innovative startup idea with a clear problem definition and target budget size."
        },
        {
            icon: <Search className="h-6 w-6" />,
            title: "2. Explore Ideas",
            desc: "Browse breakthrough proposals using direct search indexing and sector filtering parameters."
        },
        {
            icon: <MessageSquare className="h-6 w-6" />,
            title: "3. Share Feedback",
            desc: "Collaborate by leaving reviews, suggesting iterations, and helping refine value propositions."
        },
        {
            icon: <CheckCircle className="h-6 w-6" />,
            title: "4. Get Validated",
            desc: "Watch your concept rank higher through community verification hearts and active discussions."
        }
    ];

    return (
        <section id="how-it-works" className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        How It Works
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
                        Four simple, streamlined steps to start collaborating inside the IdeaVault ecosystem.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow text-left flex flex-col items-start"
                        >
                            <div className="h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4.5">
                                {step.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                {step.title}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
