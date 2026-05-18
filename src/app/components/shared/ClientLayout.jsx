"use client";

import React from "react";
import { useIdeaVault } from "@/context/IdeaVaultContext";

export default function ClientLayout({ children }) {
    const { toasts } = useIdeaVault();

    return (
        <>
            {toasts && toasts.length > 0 && (
                <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
                    {toasts.map((toast) => (
                        <div
                            key={toast.id}
                            className={`flex items-center gap-3.5 px-4.5 py-4 rounded-2xl shadow-2xl text-white font-medium transition-all duration-300 pointer-events-auto border border-white/10 animate-slide-in ${
                                toast.type === "success"
                                    ? "bg-emerald-500 shadow-emerald-500/25"
                                    : toast.type === "error"
                                    ? "bg-rose-500 shadow-rose-500/25"
                                    : "bg-custom shadow-custom/25"
                            }`}
                        >
                            {toast.type === "success" && (
                                <div className="h-6 w-6 shrink-0 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">✓</div>
                            )}
                            {toast.type === "error" && (
                                <div className="h-6 w-6 shrink-0 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">✕</div>
                            )}
                            {toast.type === "info" && (
                                <div className="h-6 w-6 shrink-0 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">i</div>
                            )}
                            <span className="text-sm tracking-wide leading-tight">{toast.message}</span>
                        </div>
                    ))}
                </div>
            )}
            {children}
        </>
    );
}
