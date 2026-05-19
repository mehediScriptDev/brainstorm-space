"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useIdeaVault } from "@/lib/ideaVaultStore";

export default function RegisterPage() {
    const router = useRouter();
    const { register, activeUser } = useIdeaVault();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = "Register | IdeaVault";
        if (activeUser) {
            router.push("/");
        }
    }, [activeUser, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const success = register(name, email, photoUrl, password);
        setLoading(false);
        if (success) {
            router.push("/");
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-base-100 transition-colors duration-200">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 animate-slide-in">
                
                <div className="text-center">
                    <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Create an Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-semibold">
                        Join the community of innovators
                    </p>
                </div>

                <form className="mt-8 space-y-5 text-left" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm font-medium"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="form-control">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm font-medium"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="form-control">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                            Photo URL
                        </label>
                        <input
                            type="url"
                            required
                            value={photoUrl}
                            onChange={(e) => setPhotoUrl(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm font-medium"
                            placeholder="https://example.com/photo.jpg"
                        />
                    </div>

                    <div className="form-control">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm font-medium"
                            placeholder="••••••••"
                        />
                        <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 font-semibold leading-relaxed">
                            Password must contain min 6 characters, 1 uppercase, and 1 lowercase letter.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50 transition-colors mt-6"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400 font-semibold">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                    >
                        Log in
                    </Link>
                </p>

            </div>
        </div>
    );
}
