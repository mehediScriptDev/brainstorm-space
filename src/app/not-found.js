"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function NotFound() {
    // Dynamic Title
    useEffect(() => {
        document.title = "404 - Concept Lost | IdeaVault";
    }, []);

    return (
        <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-16 bg-base-100 text-center relative overflow-hidden">
            {/* Blurry decorative background blobs */}
            <div className="absolute top-1/4 left-1/4 h-72 w-72 bg-custom/10 rounded-full blur-3xl -z-10 scale-95" />
            <div className="absolute bottom-1/4 right-1/4 h-72 w-72 bg-rose-500/5 rounded-full blur-3xl -z-10 scale-95" />

            <div className="max-w-md space-y-6 relative">
                
                {/* 404 Illustration */}
                <div className="text-8xl animate-bounce">🚀</div>

                <div className="space-y-2.5">
                    <h1 className="text-6xl font-black text-custom tracking-tighter leading-none">404</h1>
                    <h2 className="text-2xl font-black text-base-content tracking-tight">Concept Lost In Space</h2>
                    <p className="text-sm text-base-content/65 font-medium leading-relaxed max-w-sm mx-auto">
                        The startup idea you're trying to find has either been pivoted, acquired, or got lost during launch sequence calibration.
                    </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="btn btn-custom rounded-full px-8 py-3.5 text-xs font-black shadow-md shadow-custom/10 hover:shadow-custom/25"
                    >
                        Return to Hub
                    </Link>
                    <Link
                        href="/ideas"
                        className="btn btn-outline border-base-300 rounded-full px-8 py-3.5 text-xs font-black"
                    >
                        Browse Other Ideas
                    </Link>
                </div>

            </div>
        </div>
    );
}
