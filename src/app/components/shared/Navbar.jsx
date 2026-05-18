"use client";

import React, { useState } from "react";
import Link from "next/link";
import NavLink from "@/app/components/NavLink";
import { useIdeaVault } from "@/context/IdeaVaultContext";
import { 
  Lightbulb, Sun, Moon, LogOut, ChevronDown, User, Settings 
} from "lucide-react";

const Navbar = () => {
    const { activeUser, logout, theme, toggleTheme, updateProfile } = useIdeaVault();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [profileName, setProfileName] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");

    const openProfileModal = () => {
        if (activeUser) {
            setProfileName(activeUser.name);
            setProfilePhoto(activeUser.photoUrl);
            setIsProfileModalOpen(true);
            setIsProfileOpen(false);
        }
    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        updateProfile(profileName, profilePhoto);
        setIsProfileModalOpen(false);
    };

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
    };

    const links = (
        <>
            <li>
                <NavLink href={"/"} name="Home" />
            </li>
            <li>
                <NavLink href={"/ideas"} name="Ideas" />
            </li>
            {activeUser && (
                <>
                    <li>
                        <NavLink href={"/add-idea"} name="Add Idea" />
                    </li>
                    <li>
                        <NavLink href={"/my-ideas"} name="My Ideas" />
                    </li>
                    <li>
                        <NavLink href={"/my-interactions"} name="My Interactions" />
                    </li>
                </>
            )}
        </>
    );

    return (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-[99] transition-colors shadow-sm backdrop-blur-md bg-opacity-95 dark:bg-opacity-95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center cursor-pointer">
                            <Lightbulb className="h-8 w-8 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                            <span className="ml-2 text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 tracking-tight">
                                IdeaVault
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <ul className="flex items-center space-x-2 font-medium menu menu-horizontal p-0">
                            {links}
                        </ul>

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === "dark" ? <Sun size={20} className="text-indigo-400" /> : <Moon size={20} className="text-gray-500" />}
                        </button>

                        {activeUser ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center space-x-2 focus:outline-none hover:opacity-90 py-1"
                                >
                                    <img
                                        src={activeUser.photoUrl || `https://ui-avatars.com/api/?name=${activeUser.name}`}
                                        alt={activeUser.name}
                                        className="h-8 w-8 rounded-full border-2 border-indigo-500 object-cover"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop";
                                        }}
                                    />
                                    <ChevronDown size={14} className="text-gray-500 dark:text-gray-400" />
                                </button>

                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2.5 w-60 bg-white dark:bg-gray-800 rounded-xl shadow-2xl py-2 ring-1 ring-black/5 dark:ring-white/5 border border-gray-100 dark:border-gray-700 animate-slide-in">
                                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{activeUser.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{activeUser.email}</p>
                                        </div>
                                        <button
                                            onClick={openProfileModal}
                                            className="w-full text-left flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold"
                                        >
                                            <Settings size={16} className="mr-2.5 text-gray-400" /> Update Profile
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold"
                                        >
                                            <LogOut size={16} className="mr-2.5" /> Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex space-x-2">
                                <Link
                                    href="/login"
                                    className="px-4.5 py-2 text-sm font-bold text-indigo-600 bg-white border border-indigo-600 rounded-lg hover:bg-indigo-50 dark:bg-gray-900 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-gray-800 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4.5 py-2 text-sm font-bold text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="flex md:hidden items-center space-x-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400"
                        >
                            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                                <ChevronDown size={20} className="text-gray-500" />
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-md dropdown-content bg-white dark:bg-gray-800 rounded-2xl z-[100] mt-3 w-56 p-3 shadow-2xl border border-gray-100 dark:border-gray-700 gap-1"
                            >
                                {links}
                                <div className="border-t border-gray-100 dark:border-gray-700 my-2" />
                                {activeUser ? (
                                    <>
                                        <li>
                                            <button onClick={openProfileModal} className="font-bold text-gray-700 dark:text-gray-300">
                                                Update Profile
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={handleLogout} className="font-bold text-red-500">
                                                Sign out
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <div className="flex flex-col gap-2 p-1">
                                        <Link href="/login" className="btn btn-outline border-indigo-500 text-indigo-600 rounded-xl py-2 text-center text-xs font-bold">Login</Link>
                                        <Link href="/register" className="btn btn-primary bg-indigo-600 border-0 text-white rounded-xl py-2 text-center text-xs font-bold">Register</Link>
                                    </div>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {isProfileModalOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
                    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-gray-700 relative animate-scale-in">
                        <button
                            onClick={() => setIsProfileModalOpen(false)}
                            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg font-bold"
                        >
                            ✕
                        </button>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Edit Profile Settings</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Update your account name and display credentials.</p>

                        <form onSubmit={handleProfileUpdate} className="space-y-4 mt-6">
                            <div className="form-control">
                                <label className="label text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Display Name</label>
                                <input
                                    type="text"
                                    required
                                    value={profileName}
                                    onChange={(e) => setProfileName(e.target.value)}
                                    className="input input-bordered w-full rounded-2xl focus:border-indigo-500 focus:outline-0 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
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
                                    className="input input-bordered w-full rounded-2xl focus:border-indigo-500 focus:outline-0 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
                                    placeholder="Photo URL link"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-3">
                                <button
                                    type="button"
                                    onClick={() => setIsProfileModalOpen(false)}
                                    className="btn btn-outline border-gray-300 dark:border-gray-600 rounded-full px-6 text-xs font-bold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-xs font-bold shadow-md"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
