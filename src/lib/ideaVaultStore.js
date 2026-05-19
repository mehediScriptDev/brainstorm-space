"use client";

import React, { useEffect, useState } from "react";

const STORAGE_KEYS = {
    ideas: "iv_ideas",
    comments: "iv_comments",
    user: "iv_user",
    token: "iv_token",
    theme: "iv_theme"
};

const API_BASE_URL = process.env.NEXT_PUBLIC_IDEAVAULT_API_URL || "http://localhost:8000";

const initialIdeas = [
    {
        id: "idea-1",
        title: "MediConnect AI",
        shortDescription: "AI-driven patient triaging and clinical workflow automation platform.",
        detailedDescription: "MediConnect AI leverages custom NLP models to analyze patient intake data, predict triage severity levels, and route them to optimal medical professionals. This dramatically reduces emergency room wait times and administrative burden for doctors, resulting in higher patient throughput and fewer medical errors.",
        category: "Health",
        tags: ["AI", "Healthcare", "SaaS"],
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
        budget: "$45,000",
        targetAudience: "Hospitals, private clinics, emergency care centers.",
        problemStatement: "Emergency room wait times are soaring and clinical administrative overhead consumes over 30% of doctors' working hours, causing severe burnout.",
        proposedSolution: "Develop a secure, HIPAA-compliant AI triage engine that captures patient complaints, auto-summarizes clinical history, and suggests initial triage categories with 94% accuracy.",
        authorEmail: "admin@ideavault.com",
        authorName: "Sarah Jenkins",
        createdAt: "2026-05-10T14:30:00.000Z",
        likes: 42,
        commentsCount: 3
    },
    {
        id: "idea-2",
        title: "EduSphere VR",
        shortDescription: "Immersive virtual reality classrooms for STEM learning in schools.",
        detailedDescription: "EduSphere VR brings textbook science and math to life. With interactive 3D physics simulators, molecular chemistry modeling, and astronomical space tours, student engagement skyrockets. Schools can subscribe to curriculum-aligned modules that students explore using low-cost virtual reality headsets.",
        category: "Education",
        tags: ["EdTech", "VR", "STEM"],
        imageUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=800&auto=format&fit=crop",
        budget: "$65,000",
        targetAudience: "Middle and high schools, remote learning academic programs.",
        problemStatement: "Traditional STEM teaching methods often struggle to explain abstract, spatial scientific concepts, leading to lower student retention and interest.",
        proposedSolution: "A school-friendly VR curriculum platform complete with ready-to-run interactive simulations that align with global science standards.",
        authorEmail: "john@ideavault.com",
        authorName: "John Davis",
        createdAt: "2026-05-12T09:15:00.000Z",
        likes: 38,
        commentsCount: 2
    },
    {
        id: "idea-3",
        title: "EcoTrace Supply Chain",
        shortDescription: "Blockchain verification tracking for sustainable consumer brands.",
        detailedDescription: "EcoTrace is a transparency-as-a-service application. It enables eco-conscious brands to track every step of their supply chain—from raw material farming to shipping—and display it to consumers via a verified QR code on packaging. Every transaction and supply node is anchored to an eco-friendly blockchain network.",
        category: "Tech",
        tags: ["Blockchain", "Sustainability", "Web3"],
        imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
        budget: "$30,000",
        targetAudience: "Ethical fashion labels, organic food producers, carbon-neutral brands.",
        problemStatement: "Greenwashing makes it difficult for sustainable brands to prove their authenticity, while consumers are skeptical of generic eco-friendly claims.",
        proposedSolution: "Create an open-API supply ledger backed by cryptographically signed receipts from farmers, auditors, and shipping partners, presenting a gorgeous consumer journey map.",
        authorEmail: "emma@ideavault.com",
        authorName: "Emma Watson",
        createdAt: "2026-05-13T16:45:00.000Z",
        likes: 29,
        commentsCount: 1
    },
    {
        id: "idea-4",
        title: "FinGrow Micro-Invest",
        shortDescription: "Micro-investing and automated tax savings tailored for gig workers.",
        detailedDescription: "FinGrow automatically rounds up gig transactions (Uber, Fiverr, Upwork) and allocates those cents to a diversified, tax-advantaged portfolio. The app calculates estimated quarterly taxes in real-time, setting aside appropriate funds to prevent end-of-year tax shock for freelancers.",
        category: "Finance",
        tags: ["FinTech", "GigEconomy", "Automation"],
        imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop",
        budget: "$25,000",
        targetAudience: "Freelancers, independent contractors, ride-share drivers.",
        problemStatement: "Gig economy workers experience volatile incomes and rarely save for retirement, while constantly getting penalized for miscalculating freelance taxes.",
        proposedSolution: "Build a smart wallet app linked to gig bank accounts that routes pennies to investments and automatically cushions estimated tax liabilities.",
        authorEmail: "admin@ideavault.com",
        authorName: "Sarah Jenkins",
        createdAt: "2026-05-14T11:20:00.000Z",
        likes: 55,
        commentsCount: 3
    },
    {
        id: "idea-5",
        title: "MindEase Companion",
        shortDescription: "Generative AI mental wellness app for daily emotional journaling.",
        detailedDescription: "MindEase acts as an active listener and wellness planner. Users chat naturally with an emotionally aware AI companion, which provides customized mindfulness exercises, identifies cognitive distortions, and maps mood logs over time. It stands as an interim wellness aid before professional therapy.",
        category: "Health",
        tags: ["MentalHealth", "AI", "Wellness"],
        imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
        budget: "$20,000",
        targetAudience: "Stressed professionals, university students, wellness seekers.",
        problemStatement: "Mental health therapy is highly expensive, difficult to schedule, and suffers from social stigma, preventing millions from getting timely emotional support.",
        proposedSolution: "A secure, therapeutic AI assistant powered by CBT and DBT methodologies, designed for low-stress daily wellness check-ins.",
        authorEmail: "emma@ideavault.com",
        authorName: "Emma Watson",
        createdAt: "2026-05-15T08:00:00.000Z",
        likes: 64,
        commentsCount: 4
    },
    {
        id: "idea-6",
        title: "AgriSense IoT",
        shortDescription: "Soil-moisture sensor grids with predictive irrigation software.",
        detailedDescription: "AgriSense deploys ultra-low-cost, battery-powered soil moisture and temperature sensors throughout commercial crop fields. The cloud engine processes this data alongside localized satellite weather forecasts to supply farmers with absolute, zone-by-zone guidelines on when, where, and how much to irrigate.",
        category: "AI",
        tags: ["IoT", "Agritech", "Sustainability"],
        imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop",
        budget: "$50,000",
        targetAudience: "Commercial agricultural farms, vineyards, greenhouses.",
        problemStatement: "Over-irrigation wastes massive water reserves and erodes soil minerals, while under-irrigation devastates potential crop yields.",
        proposedSolution: "Deploy mesh-connected sensors that synchronize with hyper-local weather predictions to reduce water usage by 40% while preserving maximum crop productivity.",
        authorEmail: "john@ideavault.com",
        authorName: "John Davis",
        createdAt: "2026-05-16T12:00:00.000Z",
        likes: 31,
        commentsCount: 2
    }
];

const initialComments = [
    {
        id: "c-1",
        ideaId: "idea-1",
        authorName: "John Davis",
        authorEmail: "john@ideavault.com",
        authorPhoto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
        text: "This is exactly what the ER at our local county hospital needs. Wait times are absolutely criminal. How will you handle regulatory integration?",
        timestamp: "2026-05-11T10:00:00.000Z"
    },
    {
        id: "c-2",
        ideaId: "idea-1",
        authorName: "Emma Watson",
        authorEmail: "emma@ideavault.com",
        authorPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
        text: "Incredible validation framework. I think private clinics will jump on this first due to faster tech-adoption lifecycles.",
        timestamp: "2026-05-12T15:22:00.000Z"
    },
    {
        id: "c-3",
        ideaId: "idea-1",
        authorName: "Sarah Jenkins",
        authorEmail: "admin@ideavault.com",
        authorPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
        text: "Thanks John! We plan to launch an initially read-only sandbox integration that doesn't push data back to hospital EHR systems to ensure 100% security.",
        timestamp: "2026-05-12T18:05:00.000Z"
    },
    {
        id: "c-4",
        ideaId: "idea-2",
        authorName: "Emma Watson",
        authorEmail: "emma@ideavault.com",
        authorPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
        text: "VR in schools has massive potential! My main concern is the cost of high-quality headsets. Can this run on Google Cardboard style setups?",
        timestamp: "2026-05-13T11:30:00.000Z"
    }
];

const defaultUser = {
    name: "Sarah Jenkins",
    email: "admin@ideavault.com",
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
};

const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGlkZWF2YXVsdC5jb20iLCJuYW1lIjoiU2FyYWggSmVua2lucyJ9";

const subscribers = new Set();
let store = {
    ideas: initialIdeas,
    comments: initialComments,
    activeUser: defaultUser,
    token: mockToken,
    theme: "light",
    toasts: [],
    isLoading: true
};

function emitChange() {
    subscribers.forEach((listener) => listener());
}

function safeParse(value, fallback) {
    if (!value) {
        return fallback;
    }

    try {
        return JSON.parse(value);
    } catch {
        return fallback;
    }
}

function loadPersistedState() {
    if (typeof window === "undefined") {
        return;
    }

    const storedTheme = window.localStorage.getItem(STORAGE_KEYS.theme) || "light";
    const storedIdeas = safeParse(window.localStorage.getItem(STORAGE_KEYS.ideas), initialIdeas);
    const storedComments = safeParse(window.localStorage.getItem(STORAGE_KEYS.comments), initialComments);
    const storedUser = safeParse(window.localStorage.getItem(STORAGE_KEYS.user), defaultUser);
    const storedToken = window.localStorage.getItem(STORAGE_KEYS.token) || mockToken;

    store = {
        ...store,
        ideas: storedIdeas,
        comments: storedComments,
        activeUser: storedUser,
        token: storedToken,
        theme: storedTheme,
        isLoading: false
    };

    window.localStorage.setItem(STORAGE_KEYS.theme, storedTheme);
    window.localStorage.setItem(STORAGE_KEYS.ideas, JSON.stringify(storedIdeas));
    window.localStorage.setItem(STORAGE_KEYS.comments, JSON.stringify(storedComments));
    window.localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(storedUser));
    window.localStorage.setItem(STORAGE_KEYS.token, storedToken);

    document.documentElement.setAttribute("data-theme", storedTheme);
    if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}

function persistState() {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.setItem(STORAGE_KEYS.ideas, JSON.stringify(store.ideas));
    window.localStorage.setItem(STORAGE_KEYS.comments, JSON.stringify(store.comments));
    window.localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(store.activeUser));
    window.localStorage.setItem(STORAGE_KEYS.token, store.token || "");
    window.localStorage.setItem(STORAGE_KEYS.theme, store.theme);
}

function pushToast(message, type = "success") {
    const toast = {
        id: Date.now() + Math.random().toString(36).slice(2),
        message,
        type
    };

    store = {
        ...store,
        toasts: [...store.toasts, toast]
    };

    emitChange();

    if (typeof window !== "undefined") {
        window.setTimeout(() => {
            store = {
                ...store,
                toasts: store.toasts.filter((item) => item.id !== toast.id)
            };
            emitChange();
        }, 3500);
    }
}

function generateMockJWT(email, name) {
    return `mock_jwt_${btoa(JSON.stringify({ email, name, exp: Date.now() + 3600000 }))}`;
}

async function postIdeaToApi(idea) {
    try {
        const response = await fetch(`${API_BASE_URL}/ideas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(idea)
        });

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch {
        return null;
    }
}

export function useIdeaVault() {
    const [, setTick] = useState(0);

    useEffect(() => {
        loadPersistedState();

        const refresh = () => setTick((value) => value + 1);
        subscribers.add(refresh);

        const handleStorage = (event) => {
            if (!event.key || Object.values(STORAGE_KEYS).includes(event.key)) {
                loadPersistedState();
                emitChange();
            }
        };

        window.addEventListener("storage", handleStorage);

        return () => {
            subscribers.delete(refresh);
            window.removeEventListener("storage", handleStorage);
        };
    }, []);

    const toggleTheme = () => {
        const nextTheme = store.theme === "light" ? "dark" : "light";
        store = {
            ...store,
            theme: nextTheme
        };

        if (typeof window !== "undefined") {
            window.localStorage.setItem(STORAGE_KEYS.theme, nextTheme);
            document.documentElement.setAttribute("data-theme", nextTheme);
            if (nextTheme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }

        pushToast(`Switched to ${nextTheme} mode`, "info");
        emitChange();
    };

    const login = (email, password) => {
        if (!email || !password) {
            pushToast("Please enter email and password", "error");
            emitChange();
            return false;
        }

        const user = email === "admin@ideavault.com"
            ? defaultUser
            : {
                name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
                email,
                photoUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop"
            };

        const token = generateMockJWT(user.email, user.name);

        store = {
            ...store,
            activeUser: user,
            token
        };
        persistState();
        pushToast(`Welcome back, ${user.name}!`, "success");
        emitChange();
        return true;
    };

    const loginWithGoogle = () => {
        const user = {
            name: "Alex Mercer",
            email: "alex.mercer@gmail.com",
            photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
        };
        const token = generateMockJWT(user.email, user.name);

        store = {
            ...store,
            activeUser: user,
            token
        };
        persistState();
        pushToast("Logged in with Google successfully!", "success");
        emitChange();
        return true;
    };

    const register = (name, email, photoUrl, password) => {
        if (!name || !email || !password) {
            pushToast("All fields are required", "error");
            emitChange();
            return false;
        }

        if (password.length < 6) {
            pushToast("Password must be at least 6 characters long", "error");
            emitChange();
            return false;
        }

        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            pushToast("Password must contain at least one uppercase and one lowercase letter", "error");
            emitChange();
            return false;
        }

        const user = {
            name,
            email,
            photoUrl: photoUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop"
        };
        const token = generateMockJWT(user.email, user.name);

        store = {
            ...store,
            activeUser: user,
            token
        };
        persistState();
        pushToast(`Account registered! Welcome, ${name}`, "success");
        emitChange();
        return true;
    };

    const updateProfile = (name, photoUrl) => {
        if (!store.activeUser) {
            return false;
        }

        const updatedUser = {
            ...store.activeUser,
            name: name || store.activeUser.name,
            photoUrl: photoUrl || store.activeUser.photoUrl
        };

        const updatedComments = store.comments.map((comment) => {
            if (comment.authorEmail === store.activeUser.email) {
                return { ...comment, authorName: updatedUser.name, authorPhoto: updatedUser.photoUrl };
            }
            return comment;
        });

        const updatedIdeas = store.ideas.map((idea) => {
            if (idea.authorEmail === store.activeUser.email) {
                return { ...idea, authorName: updatedUser.name };
            }
            return idea;
        });

        store = {
            ...store,
            activeUser: updatedUser,
            comments: updatedComments,
            ideas: updatedIdeas
        };
        persistState();
        pushToast("Profile details updated successfully!", "success");
        emitChange();
        return true;
    };

    const logout = () => {
        store = {
            ...store,
            activeUser: null,
            token: null
        };

        if (typeof window !== "undefined") {
            window.localStorage.removeItem(STORAGE_KEYS.user);
            window.localStorage.removeItem(STORAGE_KEYS.token);
        }

        pushToast("Logged out successfully", "info");
        emitChange();
    };

    const addIdea = async (ideaData) => {
        if (!store.activeUser) {
            pushToast("You must be logged in to submit ideas", "error");
            emitChange();
            return false;
        }

        const baseIdea = {
            id: `idea-${Date.now()}`,
            ...ideaData,
            authorEmail: store.activeUser.email,
            authorName: store.activeUser.name,
            createdAt: new Date().toISOString(),
            likes: 0,
            commentsCount: 0
        };

        const serverIdea = await postIdeaToApi(baseIdea);
        const newIdea = serverIdea || baseIdea;

        const updatedIdeas = [newIdea, ...store.ideas];
        store = {
            ...store,
            ideas: updatedIdeas
        };
        persistState();
        pushToast("Your startup idea has been published!", "success");
        emitChange();
        return true;
    };

    const updateIdea = (id, updatedData) => {
        const targetIdea = store.ideas.find((idea) => idea.id === id);
        if (!targetIdea) {
            pushToast("Idea not found", "error");
            emitChange();
            return false;
        }

        if (targetIdea.authorEmail !== store.activeUser?.email) {
            pushToast("Unauthorized request", "error");
            emitChange();
            return false;
        }

        const updatedIdeas = store.ideas.map((idea) => (idea.id === id ? { ...idea, ...updatedData } : idea));
        store = {
            ...store,
            ideas: updatedIdeas
        };
        persistState();
        pushToast("Startup idea updated successfully!", "success");
        emitChange();
        return true;
    };

    const deleteIdea = (id) => {
        const targetIdea = store.ideas.find((idea) => idea.id === id);
        if (!targetIdea) {
            pushToast("Idea not found", "error");
            emitChange();
            return false;
        }

        if (targetIdea.authorEmail !== store.activeUser?.email) {
            pushToast("Unauthorized request", "error");
            emitChange();
            return false;
        }

        const filteredIdeas = store.ideas.filter((idea) => idea.id !== id);
        const filteredComments = store.comments.filter((comment) => comment.ideaId !== id);

        store = {
            ...store,
            ideas: filteredIdeas,
            comments: filteredComments
        };
        persistState();
        pushToast("Startup idea deleted successfully!", "success");
        emitChange();
        return true;
    };

    const likeIdea = (id) => {
        if (!store.activeUser) {
            pushToast("Log in to validate this idea!", "error");
            emitChange();
            return;
        }

        const updatedIdeas = store.ideas.map((idea) => (idea.id === id ? { ...idea, likes: (idea.likes || 0) + 1 } : idea));
        store = {
            ...store,
            ideas: updatedIdeas
        };
        persistState();
        pushToast("Idea validation recorded!", "success");
        emitChange();
    };

    const addComment = (ideaId, text) => {
        if (!store.activeUser) {
            pushToast("Log in to join the discussion", "error");
            emitChange();
            return false;
        }

        const targetIdea = store.ideas.find((idea) => idea.id === ideaId);
        if (!targetIdea) {
            pushToast("Idea not found", "error");
            emitChange();
            return false;
        }

        const newComment = {
            id: `c-${Date.now()}`,
            ideaId,
            authorName: store.activeUser.name,
            authorEmail: store.activeUser.email,
            authorPhoto: store.activeUser.photoUrl,
            text,
            timestamp: new Date().toISOString()
        };

        const updatedComments = [newComment, ...store.comments];
        const updatedIdeas = store.ideas.map((idea) => (
            idea.id === ideaId ? { ...idea, commentsCount: (idea.commentsCount || 0) + 1 } : idea
        ));

        store = {
            ...store,
            comments: updatedComments,
            ideas: updatedIdeas
        };
        persistState();
        pushToast("Comment posted successfully!", "success");
        emitChange();
        return true;
    };

    const editComment = (commentId, text) => {
        const updatedComments = store.comments.map((comment) => (comment.id === commentId ? { ...comment, text } : comment));
        store = {
            ...store,
            comments: updatedComments
        };
        persistState();
        pushToast("Comment updated successfully!", "success");
        emitChange();
        return true;
    };

    const deleteComment = (commentId, ideaId) => {
        const filteredComments = store.comments.filter((comment) => comment.id !== commentId);
        const updatedIdeas = store.ideas.map((idea) => (
            idea.id === ideaId ? { ...idea, commentsCount: Math.max(0, (idea.commentsCount || 0) - 1) } : idea
        ));

        store = {
            ...store,
            comments: filteredComments,
            ideas: updatedIdeas
        };
        persistState();
        pushToast("Comment deleted successfully!", "success");
        emitChange();
        return true;
    };

    return {
        ideas: store.ideas,
        comments: store.comments,
        activeUser: store.activeUser,
        token: store.token,
        theme: store.theme,
        toasts: store.toasts,
        isLoading: store.isLoading,
        login,
        loginWithGoogle,
        register,
        updateProfile,
        logout,
        addIdea,
        updateIdea,
        deleteIdea,
        likeIdea,
        addComment,
        editComment,
        deleteComment,
        toggleTheme
    };
}
