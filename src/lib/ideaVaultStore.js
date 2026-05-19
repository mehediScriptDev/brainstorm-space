"use client";

import React, { useEffect, useState } from "react";
import authClient from "./auth-client";
import { useToast } from "@/app/components/shared/ToastProvider";

const API_BASE_URL = process.env.NEXT_PUBLIC_IDEAVAULT_API_URL;
if (!API_BASE_URL) console.warn("NEXT_PUBLIC_IDEAVAULT_API_URL is not set; API requests will fail without it.");

let bootstrapPromise = null;
let bootstrapIdeasCache = [];
let bootstrapCommentsCache = [];
let bootstrapSessionCache = { user: null, accessToken: null };

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

function normalizeComment(comment) {
  if (!comment) return null;
  return {
    ...comment,
    id: comment.id || (comment._id ? comment._id.toString() : `comment-${Date.now()}`),
    _id: comment._id ? comment._id.toString() : comment._id,
    timestamp: comment.timestamp || new Date().toISOString()
  };
}

const loadBootstrapData = async () => {
  if (!bootstrapPromise) {
    bootstrapPromise = Promise.all([
      fetch(`${API_BASE_URL}/ideas`).then(async (response) => (response.ok ? response.json() : [])),
      fetch(`${API_BASE_URL}/comments`).then(async (response) => (response.ok ? response.json() : [])),
      fetch(`/api/auth/get-session`).then(async (response) => (response.ok ? response.json() : null))
    ])
      .then(([ideasRes, commentsRes, sessionRes]) => {
        bootstrapIdeasCache = Array.isArray(ideasRes) ? ideasRes.map(normalizeIdea).filter(Boolean) : [];
        bootstrapCommentsCache = Array.isArray(commentsRes) ? commentsRes.map(normalizeComment).filter(Boolean) : [];

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

        return { ideas: bootstrapIdeasCache, comments: bootstrapCommentsCache, session: bootstrapSessionCache };
      })
      .catch((error) => {
        console.error("Error loading bootstrap data:", error);
        bootstrapIdeasCache = [];
        bootstrapCommentsCache = [];
        bootstrapSessionCache = { user: null, accessToken: null };
        return { ideas: [], comments: [], session: bootstrapSessionCache };
      });
  }

  return bootstrapPromise;
};

export function useIdeaVault() {
  const [ideas, setIdeas] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState("light");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileNameDraft, setProfileNameDraft] = useState("");
  const [profilePhotoDraft, setProfilePhotoDraft] = useState("");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const { ideas: loadedIdeas, comments: loadedComments, session: loadedSession } = await loadBootstrapData();
      if (cancelled) return;

      setIdeas(loadedIdeas);
      setComments(loadedComments);
      setActiveUser(loadedSession.user);
      setToken(loadedSession.accessToken);
      setIsLoading(false);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const toast = useToast();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("iv_theme") || "light";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
    document.documentElement.classList.toggle("dark", stored === "dark");
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

  const openProfileModal = () => {
    if (!activeUser) return;
    setProfileNameDraft(activeUser.name || "");
    setProfilePhotoDraft(activeUser.photoUrl || "");
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const login = async (email, password) => {
    try {
      const { error } = await authClient.signIn.email({ email, password });
      if (error) throw new Error(error.message || "Login failed");
      await refreshSession();
      return true;
    } catch {
      return false;
    }
  };

  const register = async (name, email, photoUrl, password) => {
    try {
      const { error } = await authClient.signUp.email({ name, email, password, image: photoUrl });
      if (error) throw new Error(error.message || "Register failed");
      await refreshSession();
      return true;
    } catch {
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
      document.documentElement.classList.toggle("dark", next === "dark");
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
        body: JSON.stringify({
          ...ideaData,
          authorEmail: activeUser.email,
          authorName: activeUser.name,
          authorPhoto: activeUser.photoUrl
        })
      });
      if (!res.ok) return false;
      const newIdea = normalizeIdea(await res.json());
      setIdeas((prev) => [newIdea, ...prev.filter((idea) => idea.id !== newIdea.id)]);
      bootstrapIdeasCache = [newIdea, ...bootstrapIdeasCache.filter((idea) => idea.id !== newIdea.id)];
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
      setIdeas((prev) => prev.map((idea) => (idea.id === id ? updated : idea)));
      bootstrapIdeasCache = bootstrapIdeasCache.map((idea) => (idea.id === id ? updated : idea));
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
      setIdeas((prev) => prev.filter((idea) => idea.id !== id));
      bootstrapIdeasCache = bootstrapIdeasCache.filter((idea) => idea.id !== id);
      return true;
    } catch {
      return false;
    }
  };

  const likeIdea = async (id) => {
    const target = ideas.find((idea) => idea.id === id);
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
      setIdeas((prev) => prev.map((idea) => (idea.id === id ? updated : idea)));
      bootstrapIdeasCache = bootstrapIdeasCache.map((idea) => (idea.id === id ? updated : idea));
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
      const refreshed = await fetch(`${API_BASE_URL}/ideas`).then((response) => (response.ok ? response.json() : []));
      const nextIdeas = Array.isArray(refreshed) ? refreshed.map(normalizeIdea).filter(Boolean) : [];
      setIdeas(nextIdeas);
      bootstrapIdeasCache = nextIdeas;
      await refreshSession();
      return true;
    } catch {
      return false;
    }
  };

  const addComment = async (ideaId, text) => {
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
      const newComment = normalizeComment({
        id: saved.id || saved._id || `c-${Date.now()}`,
        ideaId,
        authorName: saved.authorName || activeUser.name,
        authorEmail: saved.authorEmail || activeUser.email,
        authorPhoto: saved.authorPhoto || activeUser.photoUrl,
        text: saved.text,
        timestamp: saved.timestamp || new Date().toISOString()
      });
      setComments((prev) => [newComment, ...prev]);
      bootstrapCommentsCache = [newComment, ...bootstrapCommentsCache.filter((comment) => comment.id !== newComment.id)];
      setIdeas((prev) => prev.map((idea) => (idea.id === ideaId ? { ...idea, commentsCount: (idea.commentsCount || 0) + 1 } : idea)));
      toast?.addToast?.("success", "Comment posted");
      return true;
    } catch {
      toast?.addToast?.("error", "Failed to post comment");
      return false;
    }
  };

  const editComment = async (commentId, text) => {
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
      setComments((prev) => prev.map((comment) => (comment.id === commentId ? { ...comment, text: updated.text || text } : comment)));
      toast?.addToast?.("success", "Comment updated");
      return true;
    } catch {
      toast?.addToast?.("error", "Failed to edit comment");
      return false;
    }
  };

  const deleteComment = async (commentId, ideaId) => {
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
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
      bootstrapCommentsCache = bootstrapCommentsCache.filter((comment) => comment.id !== commentId);
      setIdeas((prev) => prev.map((idea) => (idea.id === ideaId ? { ...idea, commentsCount: Math.max(0, (idea.commentsCount || 0) - 1) } : idea)));
      toast?.addToast?.("success", "Comment deleted");
      return true;
    } catch {
      toast?.addToast?.("error", "Failed to delete comment");
      return false;
    }
  };

  return {
    ideas,
    comments,
    activeUser,
    token,
    isLoading,
    isProfileModalOpen,
    profileNameDraft,
    profilePhotoDraft,
    setProfileNameDraft,
    setProfilePhotoDraft,
    openProfileModal,
    closeProfileModal,
    login,
    loginWithGoogle: async () => {
      try {
        const { data, error } = await authClient.signInWithProvider("google", { disableRedirect: true });
        if (error) return false;
        if (data && data.url) {
          window.location.href = data.url;
          return true;
        }
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
    addComment,
    editComment,
    deleteComment,
    theme,
    toggleTheme
  };
}

export default useIdeaVault;
