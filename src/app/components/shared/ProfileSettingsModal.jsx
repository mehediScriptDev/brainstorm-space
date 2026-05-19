"use client";

import React from "react";
import { X } from "lucide-react";

export default function ProfileSettingsModal({
  open,
  activeUser,
  profileName,
  setProfileName,
  profilePhoto,
  setProfilePhoto,
  onClose,
  onSubmit
}) {
  if (!open || !activeUser) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-2xl h-[calc(100vh-2rem)] max-h-none p-0 overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-2xl">
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-gray-200 dark:border-gray-700 px-6 py-5">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Edit Profile Settings</h3>
              <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">Update your account name and display credentials.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost btn-sm rounded-full"
              aria-label="Close profile modal"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              <div className="form-control">
                <label className="label text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Display Name</label>
                <input
                  type="text"
                  required
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="input input-bordered w-full rounded-2xl focus:border-custom focus:outline-0 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-control">
                <label className="label text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Photo URL</label>
                <input
                  type="url"
                  required
                  value={profilePhoto}
                  onChange={(e) => setProfilePhoto(e.target.value)}
                  className="input input-bordered w-full rounded-2xl focus:border-custom focus:outline-0 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
                  placeholder="Photo URL link"
                />
              </div>
            </div>

            <div className="modal-action border-t border-gray-200 dark:border-gray-700 px-6 py-4 m-0 bg-gray-50/70 dark:bg-gray-900/40">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline border-gray-300 dark:border-gray-600 rounded-full px-6 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn rounded-full px-6 text-xs font-bold text-white bg-custom hover:opacity-90 border-0"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      <button type="button" className="modal-backdrop" onClick={onClose} aria-label="Close profile modal backdrop">
        close
      </button>
    </div>
  );
}
