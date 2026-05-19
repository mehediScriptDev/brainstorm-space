"use client";

import React, { useEffect, useState } from "react";
import authClient from "./auth-client";
import { useToast } from "@/app/components/shared/ToastProvider";

const API_BASE_URL = process.env.NEXT_PUBLIC_IDEAVAULT_API_URL;
if (!API_BASE_URL) console.warn("NEXT_PUBLIC_IDEAVAULT_API_URL is not set; API requests will fail without it.");

let bootstrapPromise = null;
let bootstrapIdeasCache = [];
let bootstrapSessionCache = { user: null, accessToken: null };

const loadBootstrapData = async () => {
  if (!bootstrapPromise) {
    bootstrapPromise = Promise.all([
      fetch(`${API_BASE_URL}/ideas`).then(async (response) => {
        if (!response.ok) {
          console.warn(`Failed to load ideas from ${API_BASE_URL}/ideas - status ${response.status}`);
          return [];
        }
        return response.json();
      }),
      fetch(`/api/auth/get-session`).then(async (response) => (response.ok ? response.json() : null))
    ])
      .then(([ideasRes, sessionRes]) => {
        bootstrapIdeasCache = Array.isArray(ideasRes) ? ideasRes.map(normalizeIdea).filter(Boolean) : [];

        if (sessionRes && sessionRes.user) {
          const raw = sessionRes.user;
          bootstrapSessionCache = {
            user: { name: raw.name, email: raw.email, photoUrl: raw.image || raw.photoUrl || raw.photo || null },
            accessToken: sessionRes.accessToken || null
          };
        } else if (sessionRes && sessionRes.data && sessionRes.data.user) {
          const raw = sessionRes.data.user;
          bootstrapSessionCache = {
            user: { name: raw.name, email: raw.email, photoUrl: raw.image || raw.photoUrl || raw.photo || null },
            accessToken: sessionRes.data?.accessToken || null
          };
        } else {
          bootstrapSessionCache = { user: null, accessToken: null };
        }

        return { ideas: bootstrapIdeasCache, session: bootstrapSessionCache };
      })
      .catch((error) => {
        console.error("Error loading ideas/session:", error);
        bootstrapIdeasCache = [];
        bootstrapSessionCache = { user: null, accessToken: null };
        return { ideas: [], session: bootstrapSessionCache };
      });
  }

  return bootstrapPromise;
};

function normalizeIdea(idea) {
  if (!idea) return null;
  return {
    ...idea,
    id: idea.id || (idea._id ? idea._id.toString() : `idea-${Date.now()}`),
    _id: idea._id ? idea._id.toString() : idea._id,
    likes: Number(idea.likes || 0),
    commentsCount: Number(idea.commentsCount || 0)
  };
}

export function useIdeaVault() {
  const [ideas, setIdeas] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const { ideas: ideasRes, session: sessionRes } = await loadBootstrapData();

      if (cancelled) return;

      setIdeas(ideasRes);
      setActiveUser(sessionRes.user);
      setToken(sessionRes.accessToken);
      if (!cancelled) setIsLoading(false);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const toast = useToast();

  useEffect(() => {
    // load theme from localStorage and apply
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("iv_theme") || "light";
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
      if (stored === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const refreshSession = async () => {
    try {
      const res = await fetch(`/api/auth/get-session`);
      if (!res.ok) return null;
      const data = await res.json();
      const rawUser = data.user || data.data?.user || null;
      const user = rawUser
        ? {
            name: rawUser.name,
            email: rawUser.email,
            photoUrl: rawUser.image || rawUser.photoUrl || rawUser.photo || null
          }
        : null;
      setActiveUser(user);
      setToken(data.accessToken || data.data?.accessToken || null);
      bootstrapSessionCache = { user, accessToken: data.accessToken || data.data?.accessToken || null };
      return user;
    } catch {
      return null;
    }
  };

  const login = async (email, password) => {
    try {
      const { data, error } = await authClient.signIn.email({ email, password });
      if (error) throw new Error(error.message || "Login failed");
      await refreshSession();
      return true;
    } catch (err) {
      return false;
    }
  };

  const register = async (name, email, photoUrl, password) => {
    try {
      const { data, error } = await authClient.signUp.email({ name, email, password, image: photoUrl });
      if (error) throw new Error(error.message || "Register failed");
      await refreshSession();
      return true;
    } catch (err) {
      return false;
    }
  };

  const logout = async () => {
    try {
      await authClient.signOut();
    } catch {}
    setActiveUser(null);
    setToken(null);
    bootstrapSessionCache = { user: null, accessToken: null };
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("iv_theme", next);
      document.documentElement.setAttribute("data-theme", next);
      if (next === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  const addIdea = async (ideaData) => {
    if (!activeUser) return false;
    try {
      const res = await fetch(`${API_BASE_URL}/ideas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ ...ideaData })
      });
      if (!res.ok) return false;
      const newIdea = normalizeIdea(await res.json());
      setIdeas((prev) => [newIdea, ...prev.filter((i) => i.id !== newIdea.id)]);
      bootstrapIdeasCache = [newIdea, ...bootstrapIdeasCache.filter((i) => i.id !== newIdea.id)];
      return true;
    } catch {
      return false;
    }
  };

  const updateIdea = async (id, updatedData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/ideas/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(updatedData)
      });
      if (!res.ok) return false;
      const updated = normalizeIdea(await res.json());
      setIdeas((prev) => prev.map((i) => (i.id === id ? updated : i)));
      bootstrapIdeasCache = bootstrapIdeasCache.map((i) => (i.id === id ? updated : i));
      return true;
    } catch {
      return false;
    }
  };

  const deleteIdea = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/ideas/${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });
      if (res.status !== 204 && !res.ok) return false;
      setIdeas((prev) => prev.filter((i) => i.id !== id));
      bootstrapIdeasCache = bootstrapIdeasCache.filter((i) => i.id !== id);
      return true;
    } catch {
      return false;
    }
  };

  const likeIdea = async (id) => {
    const target = ideas.find((i) => i.id === id);
    if (!target) return;
    try {
      const res = await fetch(`${API_BASE_URL}/ideas/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ likes: (target.likes || 0) + 1 })
      });
      if (!res.ok) return;
      const updated = normalizeIdea(await res.json());
      setIdeas((prev) => prev.map((i) => (i.id === id ? updated : i)));
      bootstrapIdeasCache = bootstrapIdeasCache.map((i) => (i.id === id ? updated : i));
    } catch {}
  };

  const updateProfile = async (name, photoUrl) => {
    if (!activeUser) return false;
    try {
      const res = await fetch(`${API_BASE_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ email: activeUser.email, name, photoUrl })
      });
      if (!res.ok) return false;
      // refresh ideas to reflect updated author fields
      const refreshed = await fetch(`${API_BASE_URL}/ideas`).then((r) => (r.ok ? r.json() : []));
      const nextIdeas = Array.isArray(refreshed) ? refreshed.map(normalizeIdea).filter(Boolean) : [];
      setIdeas(nextIdeas);
      bootstrapIdeasCache = nextIdeas;
      // refresh session to update local user
      await refreshSession();
      return true;
    } catch {
      return false;
    }
  };

  return {
    ideas,
    comments,
    activeUser,
    token,
    isLoading,
    login,
    loginWithGoogle: async () => {
      try {
        const { data, error } = await authClient.signInWithProvider("google", { disableRedirect: true });
        if (error) return false;
        if (data && data.url) {
          // redirect the browser to the provider's auth URL
          window.location.href = data.url;
          return true;
        }
        // if the server returned a token/session directly, refresh session
        await refreshSession();
        return true;
      } catch {
        return false;
      }
    },
    register,
    updateProfile,
    logout,
    addIdea,
    updateIdea,
    deleteIdea,
    likeIdea,
    addComment: async (ideaId, text) => {
      if (!activeUser) {
        toast?.addToast?.("error", "You must be logged in to comment.");
        return false;
      }
      try {
        const res = await fetch(`${API_BASE_URL}/ideas/${encodeURIComponent(ideaId)}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          body: JSON.stringify({ text, authorName: activeUser.name, authorEmail: activeUser.email, authorPhoto: activeUser.photoUrl })
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          toast?.addToast?.("error", err.message || "Failed to post comment");
          return false;
        }
        const saved = await res.json();
        const newComment = {
          id: saved.id || saved._id || `c-${Date.now()}`,
          ideaId,
          authorName: saved.authorName || activeUser.name,
          authorEmail: saved.authorEmail || activeUser.email,
          authorPhoto: saved.authorPhoto || activeUser.photoUrl,
          text: saved.text,
          timestamp: saved.timestamp || new Date().toISOString()
        };
        setComments((prev) => [newComment, ...prev]);
        setIdeas((prev) => prev.map((i) => (i.id === ideaId ? { ...i, commentsCount: (i.commentsCount || 0) + 1 } : i)));
        toast?.addToast?.("success", "Comment posted");
        return true;
      } catch (err) {
        toast?.addToast?.("error", "Failed to post comment");
        return false;
      }
    },
    editComment: async (commentId, text) => {
      try {
        const res = await fetch(`${API_BASE_URL}/comments/${encodeURIComponent(commentId)}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          body: JSON.stringify({ text })
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          toast?.addToast?.("error", err.message || "Failed to edit comment");
          return false;
        }
        const updated = await res.json();
        setComments((prev) => prev.map((c) => (c.id === commentId ? { ...c, text: updated.text || text } : c)));
        toast?.addToast?.("success", "Comment updated");
        return true;
      } catch {
        toast?.addToast?.("error", "Failed to edit comment");
        return false;
      }
    },
    deleteComment: async (commentId, ideaId) => {
      try {
        const res = await fetch(`${API_BASE_URL}/comments/${encodeURIComponent(commentId)}`, {
          method: "DELETE",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          }
        });
        if (!res.ok && res.status !== 204) {
          const err = await res.json().catch(() => ({}));
          toast?.addToast?.("error", err.message || "Failed to delete comment");
          return false;
        }
        setComments((prev) => prev.filter((c) => c.id !== commentId));
        setIdeas((prev) => prev.map((i) => (i.id === ideaId ? { ...i, commentsCount: Math.max(0, (i.commentsCount || 0) - 1) } : i)));
        toast?.addToast?.("success", "Comment deleted");
        return true;
      } catch {
        toast?.addToast?.("error", "Failed to delete comment");
        return false;
      }
    },
    theme,
    toggleTheme
  };
}

export default useIdeaVault;
