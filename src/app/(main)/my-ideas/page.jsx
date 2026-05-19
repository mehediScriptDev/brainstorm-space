"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useIdeaVault } from "@/lib/ideaVaultStore";

export default function MyIdeasPage() {
  const router = useRouter();
  const { ideas, activeUser, isLoading, updateIdea, deleteIdea } =
    useIdeaVault();

  useEffect(() => {
    if (!isLoading && !activeUser) {
      router.push("/login");
    }
  }, [activeUser, isLoading, router]);

  useEffect(() => {
    document.title = "My Ideas | IdeaVault";
  }, []);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editShortDescription, setEditShortDescription] = useState("");
  const [editCategory, setEditCategory] = useState("Tech");

  if (isLoading || !activeUser) {
    return (
      <div className="min-h-[80vh] w-full flex flex-col items-center justify-center bg-base-100">
        <span className="loading loading-spinner text-custom loading-lg"></span>
        <p className="text-sm text-base-content/50 font-bold mt-4 animate-pulse">
          Decrypting Security Credentials...
        </p>
      </div>
    );
  }

  const myIdeas = ideas.filter((idea) => idea.authorEmail === activeUser.email);

  const handleOpenEdit = (idea) => {
    setSelectedIdea(idea);
    setEditTitle(idea.title);
    setEditShortDescription(idea.shortDescription);
    setEditCategory(idea.category);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      title: editTitle,
      shortDescription: editShortDescription,
      category: editCategory,
    };
    const success = await updateIdea(selectedIdea.id, updatedData);
    if (success) {
      setEditModalOpen(false);
      setSelectedIdea(null);
    }
  };

  const handleOpenDelete = (idea) => {
    setSelectedIdea(idea);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const success = await deleteIdea(selectedIdea.id);
    if (success) {
      setDeleteModalOpen(false);
      setSelectedIdea(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-fade-in text-left">
      <div className="mb-10 border-b border-gray-250 dark:border-gray-700 pb-5">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Ideas Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium">
          Manage the startup concepts you have shared with the community.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Idea
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Date Posted
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {myIdeas.map((idea) => (
                <tr
                  key={idea.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 shrink-0 bg-gray-200 rounded overflow-hidden border border-gray-200/50">
                        <img
                          src={idea.imageUrl}
                          alt=""
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                      <div className="ml-4 text-left">
                        <Link
                          href={`/ideas/${idea.id}`}
                          className="text-sm font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          {idea.title}
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 font-bold">
                      {idea.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-semibold">
                    {new Date(idea.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold">
                    <button
                      onClick={() => handleOpenEdit(idea)}
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4 font-bold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleOpenDelete(idea)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 font-bold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {myIdeas.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400 font-semibold text-sm">
              You haven't posted any ideas yet.
            </div>
          )}
        </div>
      </div>

      {deleteModalOpen && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-gray-700 text-center space-y-4 animate-scale-in">
            <div className="text-4xl text-rose-500">⚠️</div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-semibold">
              Are you sure you want to delete the idea "
              <span className="font-extrabold text-rose-500">
                {selectedIdea?.title}
              </span>
              "? This action is irreversible and cannot be undone.
            </p>
            <div className="flex gap-3 pt-3">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-755 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex-1 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex-1 font-bold text-xs shadow-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {editModalOpen && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-gray-700 relative animate-scale-in">
            <button
              onClick={() => setEditModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 font-bold"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              Update Idea
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
              Edit the basic details of your shared concept.
            </p>

            <form onSubmit={handleEditSubmit} className="space-y-4 mt-6">
              <div className="form-control text-left">
                <label className="block text-xs font-bold text-gray-505 uppercase tracking-wider mb-1">
                  Title
                </label>
                <input
                  required
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-indigo-500 font-medium text-sm"
                />
              </div>

              <div className="form-control text-left">
                <label className="block text-xs font-bold text-gray-550 uppercase tracking-wider mb-1">
                  Short Description
                </label>
                <input
                  required
                  type="text"
                  value={editShortDescription}
                  onChange={(e) => setEditShortDescription(e.target.value)}
                  className="w-full p-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-indigo-500 font-medium text-sm"
                />
              </div>

              <div className="form-control text-left">
                <label className="block text-xs font-bold text-gray-560 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full p-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-indigo-500 font-bold text-sm cursor-pointer"
                >
                  {[
                    "Tech",
                    "Health",
                    "AI",
                    "Education",
                    "Finance",
                    "E-commerce",
                    "Other",
                  ].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-150 dark:border-gray-700 mt-6">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-750 dark:text-gray-300 hover:bg-gray-50 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-bold text-xs shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
