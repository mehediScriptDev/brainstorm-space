import React from "react";
import Link from "next/link";
import { Lightbulb } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-12 pb-8 mt-auto transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <div className="flex items-center">
                            <Lightbulb className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                                IdeaVault
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
                            Empowering innovators to share, validate, and collaborate on the next big startup ideas. Your journey from concept to reality starts here.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Platform Links
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                            <li>
                                <Link href="/ideas" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    Explore Ideas
                                </Link>
                            </li>
                            <li>
                                <Link href="/ideas?category=Tech" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link href="/#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    How it Works
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Contact & Social
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                            <li>support@ideavault.com</li>
                            <li>+1 (555) 123-4567</li>
                        </ul>
                        <div className="flex space-x-4 mt-4">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                aria-label="GitHub"
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                aria-label="X (Twitter)"
                            >
                                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.961h-1.91z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-semibold text-gray-500 dark:text-gray-400 gap-4">
                    <p>&copy; {new Date().getFullYear()} IdeaVault. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
