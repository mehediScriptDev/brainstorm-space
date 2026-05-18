"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const IdeaVaultContext = createContext();

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
    },
    {
        id: "c-5",
        ideaId: "idea-2",
        authorName: "John Davis",
        authorEmail: "john@ideavault.com",
        authorPhoto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
        text: "Yes, Emma! We are aiming for standalone Meta Quest or low-cost school tablets with spatial mapping to lower hardware adoption barriers.",
        timestamp: "2026-05-13T13:10:00.000Z"
    },
    {
        id: "c-6",
        ideaId: "idea-3",
        authorName: "Sarah Jenkins",
        authorEmail: "admin@ideavault.com",
        authorPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
        text: "I love the emphasis on stopping greenwashing. Consumers want proof, not just glossy marketing.",
        timestamp: "2026-05-14T09:40:00.000Z"
    },
    {
        id: "c-7",
        ideaId: "idea-4",
        authorName: "Emma Watson",
        authorEmail: "emma@ideavault.com",
        authorPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
        text: "This freelancer tax rounding idea is a lifesaver. I am constantly scrambling to pay quarterly estimated taxes.",
        timestamp: "2026-05-14T15:10:00.000Z"
    },
    {
        id: "c-8",
        ideaId: "idea-5",
        authorName: "John Davis",
        authorEmail: "john@ideavault.com",
        authorPhoto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
        text: "How will you prevent the AI from giving dangerous medical advice? Guardrails here are absolutely critical.",
        timestamp: "2026-05-16T10:14:00.000Z"
    },
    {
        id: "c-9",
        ideaId: "idea-5",
        authorName: "Emma Watson",
        authorEmail: "emma@ideavault.com",
        authorPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
        text: "We implement an assertive triaging filter. If the system detects keys terms relating to severe distress or clinical urgency, it halts conversation and displays immediate hotlines.",
        timestamp: "2026-05-16T11:45:00.000Z"
    }
];

export const IdeaVaultProvider = ({ children }) => {
    const router = useRouter();

    const [ideas, setIdeas] = useState([]);
    const [comments, setComments] = useState([]);
    const [activeUser, setActiveUser] = useState(null);
    const [token, setToken] = useState(null);
    const [theme, setTheme] = useState("light");
    const [toasts, setToasts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        
        const storedTheme = localStorage.getItem("iv_theme") || "light";
        setTheme(storedTheme);
        document.documentElement.setAttribute("data-theme", storedTheme);
        if (storedTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        const storedIdeas = localStorage.getItem("iv_ideas");
        if (storedIdeas) {
            setIdeas(JSON.parse(storedIdeas));
        } else {
            setIdeas(initialIdeas);
            localStorage.setItem("iv_ideas", JSON.stringify(initialIdeas));
        }

        const storedComments = localStorage.getItem("iv_comments");
        if (storedComments) {
            setComments(JSON.parse(storedComments));
        } else {
            setComments(initialComments);
            localStorage.setItem("iv_comments", JSON.stringify(initialComments));
        }

        const storedUser = localStorage.getItem("iv_user");
        const storedToken = localStorage.getItem("iv_token");
        if (storedUser && storedToken) {
            setActiveUser(JSON.parse(storedUser));
            setToken(storedToken);
        } else {
            const defaultUser = {
                name: "Sarah Jenkins",
                email: "admin@ideavault.com",
                photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
            };
            const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGlkZWF2YXVsdC5jb20iLCJuYW1lIjoiU2FyYWggSmVua2lucyJ9";
            setActiveUser(defaultUser);
            setToken(mockToken);
            localStorage.setItem("iv_user", JSON.stringify(defaultUser));
            localStorage.setItem("iv_token", mockToken);
        }

        setIsLoading(false);
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === "light" ? "dark" : "light";
        setTheme(nextTheme);
        localStorage.setItem("iv_theme", nextTheme);
        document.documentElement.setAttribute("data-theme", nextTheme);
        if (nextTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        showToast(`Switched to ${nextTheme} mode`, "info");
    };

    const showToast = (message, type = "success") => {
        const newToast = {
            id: Date.now() + Math.random().toString(36).substr(2, 9),
            message,
            type
        };
        setToasts((prev) => [...prev, newToast]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
        }, 3500);
    };

    const generateMockJWT = (email, name) => {
        return `mock_jwt_${btoa(JSON.stringify({ email, name, exp: Date.now() + 3600000 }))}`;
    };

    const login = (email, password) => {
        setIsLoading(true);
        if (!email || !password) {
            showToast("Please enter email and password", "error");
            setIsLoading(false);
            return false;
        }

        let foundUser = {
            name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
            email: email,
            photoUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop"
        };

        if (email === "admin@ideavault.com") {
            foundUser = {
                name: "Sarah Jenkins",
                email: "admin@ideavault.com",
                photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
            };
        }

        const mockToken = generateMockJWT(foundUser.email, foundUser.name);
        
        setActiveUser(foundUser);
        setToken(mockToken);
        
        localStorage.setItem("iv_user", JSON.stringify(foundUser));
        localStorage.setItem("iv_token", mockToken);

        showToast(`Welcome back, ${foundUser.name}!`, "success");
        setIsLoading(false);
        return true;
    };

    const loginWithGoogle = () => {
        setIsLoading(true);
        const googleUser = {
            name: "Alex Mercer",
            email: "alex.mercer@gmail.com",
            photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
        };
        const mockToken = generateMockJWT(googleUser.email, googleUser.name);

        setActiveUser(googleUser);
        setToken(mockToken);
        
        localStorage.setItem("iv_user", JSON.stringify(googleUser));
        localStorage.setItem("iv_token", mockToken);

        showToast("Logged in with Google successfully!", "success");
        setIsLoading(false);
        return true;
    };

    const register = (name, email, photoUrl, password) => {
        setIsLoading(true);
        
        if (!name || !email || !password) {
            showToast("All fields are required", "error");
            setIsLoading(false);
            return false;
        }

        if (password.length < 6) {
            showToast("Password must be at least 6 characters long", "error");
            setIsLoading(false);
            return false;
        }

        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            showToast("Password must contain at least one uppercase and one lowercase letter", "error");
            setIsLoading(false);
            return false;
        }

        const newUser = {
            name,
            email,
            photoUrl: photoUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop"
        };

        const mockToken = generateMockJWT(newUser.email, newUser.name);

        setActiveUser(newUser);
        setToken(mockToken);

        localStorage.setItem("iv_user", JSON.stringify(newUser));
        localStorage.setItem("iv_token", mockToken);

        showToast(`Account registered! Welcome, ${name}`, "success");
        setIsLoading(false);
        return true;
    };

    const updateProfile = (name, photoUrl) => {
        if (!activeUser) return false;

        const updatedUser = {
            ...activeUser,
            name: name || activeUser.name,
            photoUrl: photoUrl || activeUser.photoUrl
        };

        setActiveUser(updatedUser);
        localStorage.setItem("iv_user", JSON.stringify(updatedUser));

        const updatedComments = comments.map(c => {
            if (c.authorEmail === activeUser.email) {
                return { ...c, authorName: updatedUser.name, authorPhoto: updatedUser.photoUrl };
            }
            return c;
        });
        setComments(updatedComments);
        localStorage.setItem("iv_comments", JSON.stringify(updatedComments));

        const updatedIdeas = ideas.map(idea => {
            if (idea.authorEmail === activeUser.email) {
                return { ...idea, authorName: updatedUser.name };
            }
            return idea;
        });
        setIdeas(updatedIdeas);
        localStorage.setItem("iv_ideas", JSON.stringify(updatedIdeas));

        showToast("Profile details updated successfully!", "success");
        return true;
    };

    const logout = () => {
        setActiveUser(null);
        setToken(null);
        localStorage.removeItem("iv_user");
        localStorage.removeItem("iv_token");
        showToast("Logged out successfully", "info");
        router.push("/");
    };

    const addIdea = (ideaData) => {
        if (!activeUser) {
            showToast("You must be logged in to submit ideas", "error");
            return false;
        }

        const newIdea = {
            id: `idea-${Date.now()}`,
            ...ideaData,
            authorEmail: activeUser.email,
            authorName: activeUser.name,
            createdAt: new Date().toISOString(),
            likes: 0,
            commentsCount: 0
        };

        const updatedIdeas = [newIdea, ...ideas];
        setIdeas(updatedIdeas);
        localStorage.setItem("iv_ideas", JSON.stringify(updatedIdeas));
        
        showToast("Your startup idea has been published!", "success");
        return true;
    };

    const updateIdea = (id, updatedData) => {
        const targetIdea = ideas.find(i => i.id === id);
        if (!targetIdea) {
            showToast("Idea not found", "error");
            return false;
        }

        if (targetIdea.authorEmail !== activeUser?.email) {
            showToast("Unauthorized request", "error");
            return false;
        }

        const updatedIdeas = ideas.map(i => {
            if (i.id === id) {
                return { ...i, ...updatedData };
            }
            return i;
        });

        setIdeas(updatedIdeas);
        localStorage.setItem("iv_ideas", JSON.stringify(updatedIdeas));

        showToast("Startup idea updated successfully!", "success");
        return true;
    };

    const deleteIdea = (id) => {
        const targetIdea = ideas.find(i => i.id === id);
        if (!targetIdea) {
            showToast("Idea not found", "error");
            return false;
        }

        if (targetIdea.authorEmail !== activeUser?.email) {
            showToast("Unauthorized request", "error");
            return false;
        }

        const filteredIdeas = ideas.filter(i => i.id !== id);
        setIdeas(filteredIdeas);
        localStorage.setItem("iv_ideas", JSON.stringify(filteredIdeas));

        const filteredComments = comments.filter(c => c.ideaId !== id);
        setComments(filteredComments);
        localStorage.setItem("iv_comments", JSON.stringify(filteredComments));

        showToast("Startup idea deleted successfully!", "success");
        return true;
    };

    const likeIdea = (id) => {
        if (!activeUser) {
            showToast("Log in to validate this idea!", "error");
            return;
        }
        const updatedIdeas = ideas.map(i => {
            if (i.id === id) {
                return { ...i, likes: i.likes + 1 };
            }
            return i;
        });
        setIdeas(updatedIdeas);
        localStorage.setItem("iv_ideas", JSON.stringify(updatedIdeas));
        showToast("Idea validation recorded!", "success");
    };

    const addComment = (ideaId, text) => {
        if (!activeUser) {
            showToast("Log in to leave feedback", "error");
            return false;
        }

        if (!text.trim()) {
            showToast("Comment text cannot be blank", "error");
            return false;
        }

        const newComment = {
            id: `c-${Date.now()}`,
            ideaId,
            authorName: activeUser.name,
            authorEmail: activeUser.email,
            authorPhoto: activeUser.photoUrl,
            text,
            timestamp: new Date().toISOString()
        };

        const updatedComments = [newComment, ...comments];
        setComments(updatedComments);
        localStorage.setItem("iv_comments", JSON.stringify(updatedComments));

        const updatedIdeas = ideas.map(i => {
            if (i.id === ideaId) {
                return { ...i, commentsCount: (i.commentsCount || 0) + 1 };
            }
            return i;
        });
        setIdeas(updatedIdeas);
        localStorage.setItem("iv_ideas", JSON.stringify(updatedIdeas));

        showToast("Feedback submitted!", "success");
        return true;
    };

    const editComment = (id, newText) => {
        const targetComment = comments.find(c => c.id === id);
        if (!targetComment) {
            showToast("Comment not found", "error");
            return false;
        }

        if (targetComment.authorEmail !== activeUser?.email) {
            showToast("Unauthorized request", "error");
            return false;
        }

        if (!newText.trim()) {
            showToast("Comment cannot be blank", "error");
            return false;
        }

        const updatedComments = comments.map(c => {
            if (c.id === id) {
                return { ...c, text: newText, timestamp: new Date().toISOString() };
            }
            return c;
        });

        setComments(updatedComments);
        localStorage.setItem("iv_comments", JSON.stringify(updatedComments));
        showToast("Feedback updated!", "success");
        return true;
    };

    const deleteComment = (id, ideaId) => {
        const targetComment = comments.find(c => c.id === id);
        if (!targetComment) {
            showToast("Comment not found", "error");
            return false;
        }

        if (targetComment.authorEmail !== activeUser?.email) {
            showToast("Unauthorized request", "error");
            return false;
        }

        const filteredComments = comments.filter(c => c.id !== id);
        setComments(filteredComments);
        localStorage.setItem("iv_comments", JSON.stringify(filteredComments));

        const updatedIdeas = ideas.map(i => {
            if (i.id === ideaId) {
                return { ...i, commentsCount: Math.max(0, (i.commentsCount || 1) - 1) };
            }
            return i;
        });
        setIdeas(updatedIdeas);
        localStorage.setItem("iv_ideas", JSON.stringify(updatedIdeas));

        showToast("Feedback deleted!", "success");
        return true;
    };

    return (
        <IdeaVaultContext.Provider
            value={{
                ideas,
                comments,
                activeUser,
                token,
                theme,
                toasts,
                isLoading,
                toggleTheme,
                showToast,
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
                deleteComment
            }}
        >
            {children}
        </IdeaVaultContext.Provider>
    );
};

export const useIdeaVault = () => useContext(IdeaVaultContext);
