"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useIdeaVault } from "@/lib/ideaVaultStore";
import { 
  Clock, Target, MessageSquare, Heart, Trash2, Edit, X, ArrowLeft 
} from "lucide-react";

export default function IdeaDetailsPage({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const router = useRouter();
    
    const { 
        ideas, 
        comments, 
        activeUser, 
        isLoading, 
        likeIdea, 
        addComment, 
        editComment, 
        deleteComment 
    } = useIdeaVault();

    const [idea, setIdea] = useState(null);
    const [newCommentText, setNewCommentText] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentText, setEditingCommentText] = useState("");

    useEffect(() => {
        if (!isLoading && !activeUser) {
            router.push("/login");
        }
    }, [activeUser, isLoading, router]);

    useEffect(() => {
        if (ideas.length > 0) {
            const foundIdea = ideas.find((i) => i.id === params.id);
            if (foundIdea) {
                setIdea(foundIdea);
                document.title = `${foundIdea.title} | IdeaVault`;
            } else if (!isLoading) {
                router.replace("/404");
            }
        }
    }, [ideas, params.id, isLoading, router]);

    if (isLoading || !activeUser || !idea) {
        return (
            <div className="min-h-[80vh] w-full flex flex-col items-center justify-center bg-base-100">
                <span className="loading loading-spinner text-custom loading-lg"></span>
                <p className="text-sm text-base-content/50 font-bold mt-4 animate-pulse">Decrypting Security Credentials...</p>
            </div>
        );
    }

    const ideaComments = comments
        .filter((c) => c.ideaId === idea.id)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const handleAddComment = async (e) => {
        e.preventDefault();
        const success = await addComment(idea.id, newCommentText);
        if (success) {
            setNewCommentText("");
        }
    };

    const handleStartEdit = (comment) => {
        setEditingCommentId(comment.id);
        setEditingCommentText(comment.text);
    };

    const handleSaveEdit = async (commentId) => {
        const success = await editComment(commentId, editingCommentText);
        if (success) {
            setEditingCommentId(null);
            setEditingCommentText("");
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in text-left">
            
            <div className="mb-6 flex justify-start">
                <Link href="/ideas" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors">
                    <ArrowLeft size={16} />
                    Back to Directory
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden mb-10">
                <div className="h-64 md:h-96 w-full relative">
                    <img 
                        src={idea.imageUrl} 
                        alt={idea.title} 
                        className="w-full h-full object-cover" 
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 text-white w-full text-left">
                        <span className="inline-block px-3 py-1 bg-indigo-600 rounded-full text-xs font-extrabold mb-3 uppercase tracking-wider">
                            {idea.category}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black mb-2 text-shadow-md tracking-tight leading-tight">
                            {idea.title}
                        </h1>
                        <p className="text-base md:text-lg text-gray-200 max-w-3xl line-clamp-2 leading-relaxed">
                            {idea.shortDescription}
                        </p>
                    </div>
                </div>

                <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full border-2 border-indigo-100 dark:border-gray-700 bg-indigo-50 font-black text-indigo-600 flex items-center justify-center text-sm shadow-sm shrink-0">
                                {idea.authorName.charAt(0)}
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-gray-900 dark:text-white leading-tight">{idea.authorName}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center font-semibold">
                                    <Clock size={14} className="mr-1 text-indigo-500" /> 
                                    {new Date(idea.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {idea.tags?.map(tag => (
                                <span key={tag} className="px-3.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs font-bold">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        
                        <div className="md:col-span-2 space-y-8">
                            <section className="text-left space-y-3">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Problem Statement</h3>
                                <div className="p-6 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30">
                                    <p className="text-gray-700 dark:text-gray-300 text-sm font-semibold leading-relaxed whitespace-pre-wrap">{idea.problemStatement}</p>
                                </div>
                            </section>
                            
                            <section className="text-left space-y-3">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Proposed Solution</h3>
                                <div className="p-6 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/30">
                                    <p className="text-gray-700 dark:text-gray-300 text-sm font-semibold leading-relaxed whitespace-pre-wrap">{idea.proposedSolution}</p>
                                </div>
                            </section>

                            <section className="text-left space-y-3">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Detailed Description</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm font-medium leading-relaxed whitespace-pre-wrap">
                                    {idea.detailedDescription}
                                </p>
                            </section>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-750 text-left">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-base border-b border-gray-200 dark:border-gray-800 pb-2.5 uppercase tracking-wider">
                                    Quick Facts
                                </h4>
                                <ul className="space-y-4">
                                    <li>
                                        <span className="block text-xs uppercase font-extrabold text-gray-400">Target Audience</span>
                                        <span className="font-bold text-gray-900 dark:text-white flex items-center mt-1 text-sm">
                                            <Target size={16} className="mr-2 text-indigo-500" /> 
                                            {idea.targetAudience}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="block text-xs uppercase font-extrabold text-gray-400">Estimated Budget</span>
                                        <span className="font-bold text-gray-900 dark:text-white flex items-center mt-1 text-sm">
                                            <span className="text-green-500 font-extrabold mr-2">$</span> 
                                            {idea.budget ? idea.budget : "Bootstrapped"}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="block text-xs uppercase font-extrabold text-gray-400">Validation Score</span>
                                        <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center mt-1 text-sm">
                                            <Heart size={16} className="mr-2 text-red-500 fill-current" /> 
                                            {idea.likes} votes
                                        </span>
                                    </li>
                                </ul>

                                <div className="mt-6">
                                    <button
                                        onClick={() => likeIdea(idea.id)}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-md shadow-indigo-600/10"
                                    >
                                        <Heart size={15} className="fill-current" />
                                        Validate Concept
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="feedback" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 md:p-8 text-left">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center tracking-tight">
                    <MessageSquare className="mr-2.5 text-indigo-500" /> 
                    Discussion ({ideaComments.length})
                </h3>
                
                <form onSubmit={handleAddComment} className="mb-8">
                    <textarea 
                        required
                        rows={3} 
                        value={newCommentText} 
                        onChange={(e) => setNewCommentText(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none mb-3 text-sm font-medium leading-relaxed" 
                        placeholder="Share your thoughts, ask questions, or provide feedback..."
                    />
                    <button 
                        type="submit" 
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
                    >
                        Post Comment
                    </button>
                </form>

                <div className="space-y-6">
                    {ideaComments.length > 0 ? (
                        ideaComments.map((comment) => (
                            <div key={comment.id} className="flex space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group text-left">
                                <img 
                                    src={comment.authorPhoto || `https://ui-avatars.com/api/?name=${comment.authorName}`} 
                                    alt={comment.authorName} 
                                    className="w-10 h-10 rounded-full object-cover border border-indigo-100 dark:border-gray-700 shrink-0" 
                                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop"; }}
                                />
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <span className="font-bold text-gray-900 dark:text-white mr-2 text-sm">{comment.authorName}</span>
                                            <span className="text-[10px] text-gray-400 font-bold">{new Date(comment.timestamp).toLocaleString()}</span>
                                        </div>
                                        
                                        {comment.authorEmail === activeUser.email && (
                                            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    onClick={() => handleStartEdit(comment)} 
                                                    className="text-gray-400 hover:text-indigo-500"
                                                    title="Edit Comment"
                                                >
                                                    <Edit size={15} />
                                                </button>
                                                <button 
                                                    onClick={() => deleteComment(comment.id, idea.id)} 
                                                    className="text-gray-400 hover:text-red-500"
                                                    title="Delete Comment"
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {editingCommentId === comment.id ? (
                                        <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(comment.id); }} className="mt-2 text-left space-y-2">
                                            <input 
                                                type="text" 
                                                required
                                                value={editingCommentText} 
                                                onChange={(e) => setEditingCommentText(e.target.value)} 
                                                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-white focus:outline-none" 
                                            />
                                            <div className="flex space-x-2">
                                                <button type="submit" className="text-[10px] font-bold bg-indigo-600 text-white px-3.5 py-1 rounded">Save</button>
                                                <button type="button" onClick={() => setEditingCommentId(null)} className="text-[10px] font-bold bg-gray-200 text-gray-800 px-3.5 py-1 rounded">Cancel</button>
                                            </div>
                                        </form>
                                    ) : (
                                        <p className="text-gray-700 dark:text-gray-300 text-sm mt-1 font-medium leading-relaxed">
                                            {comment.text}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400 py-6 text-sm font-semibold">
                            No comments yet. Be the first to share your feedback!
                        </p>
                    )}
                </div>
            </div>

        </div>
    );
}
