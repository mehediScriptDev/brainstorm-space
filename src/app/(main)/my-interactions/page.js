"use client";

import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useIdeaVault } from "@/context/IdeaVaultContext";
import { MessageSquare } from "lucide-react";

export default function MyInteractionsPage() {
    const router = useRouter();
    const { ideas, comments, activeUser, isLoading } = useIdeaVault();

    // Private Route Security & Hydration
    useEffect(() => {
        if (!isLoading && !activeUser) {
            router.push("/login");
        }
    }, [activeUser, isLoading, router]);

    // Dynamic Title
    useEffect(() => {
        document.title = "Interactions | IdeaVault";
    }, []);

    if (isLoading || !activeUser) {
        return (
            <div className="min-h-[80vh] w-full flex flex-col items-center justify-center bg-base-100">
                <span className="loading loading-spinner text-custom loading-lg"></span>
                <p className="text-sm text-base-content/50 font-bold mt-4 animate-pulse">Decrypting Security Credentials...</p>
            </div>
        );
    }

    // Filter comments authored by this user
    const myComments = useMemo(() => {
        return comments.filter((c) => c.authorEmail === activeUser.email);
    }, [comments, activeUser.email]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in text-left">
            
            {/* Header Title & Icon */}
            <div className="mb-10 border-b border-gray-200 dark:border-gray-700 pb-5 flex items-center">
                <MessageSquare className="h-8 w-8 mr-3 text-indigo-600 dark:text-indigo-400" />
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Interactions</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1 font-medium">History of your feedback and discussions across the platform.</p>
                </div>
            </div>

            {/* Interactions List */}
            <div className="space-y-4">
                {myComments.length > 0 ? (
                    myComments.map((comment) => {
                        // Find matching idea title
                        const idea = ideas.find((i) => i.id === comment.ideaId);
                        const ideaTitle = idea ? idea.title : "Deleted Idea";

                        return (
                            <div 
                                key={comment.id} 
                                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md text-left"
                            >
                                <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">
                                        Commented on:{" "}
                                        <Link 
                                            href={`/ideas/${comment.ideaId}`} 
                                            className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                        >
                                            {ideaTitle}
                                        </Link>
                                    </h3>
                                    <span className="text-xs text-gray-500 font-bold shrink-0">
                                        {new Date(comment.timestamp).toLocaleDateString()}
                                    </span>
                                </div>

                                {/* Custom Indigo Left-Banded Callout */}
                                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border-l-4 border-indigo-500 italic text-gray-700 dark:text-gray-300 text-sm mt-3 font-semibold leading-relaxed">
                                    "{comment.text}"
                                </div>
                            </div>
                        );
                    })
                ) : (
                    /* Empty dashboard */
                    <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                        <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-3 animate-pulse" />
                        <p className="text-gray-500 dark:text-gray-400 text-lg font-bold">You haven't commented on any ideas yet.</p>
                        <Link 
                            href="/ideas" 
                            className="mt-4 inline-block text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                        >
                            Explore Ideas
                        </Link>
                    </div>
                )}
            </div>

        </div>
    );
}
