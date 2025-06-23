"use client";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { FiSun, FiMoon, FiExternalLink, FiEdit, FiTrash2 } from "react-icons/fi";
import Link from "next/link";

const BlogPage = () => {
    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const notesQuery = query(
            collection(db, "MyBlogs"),
            orderBy("BlogPublishTime", "desc")
        );

        const unsubscribe = onSnapshot(
            notesQuery,
            (snapshot) => {
                const notes = [];
                snapshot.forEach((doc) => {
                    notes.push({ id: doc.id, ...doc.data() });
                });
                setBlogData(notes);
                setLoading(false);
            },
            (error) => {
                console.error("Firestore error:", error);
                setError("Failed to load blog posts");
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    // Apply theme class to body
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors">
            <div className="text-center">
                <span className="loading loading-ring loading-lg text-primary dark:text-primary-400"></span>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Loading blogs...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-red-500 text-xl">
            {error}
        </div>
    );

    return (
        <div className="min-h-screen bg-white dark:bg-white text-gray-900 dark:text-gray-100 transition-colors">
            <div className="mt-4">
                <Link href={'/'} className="text-black border cursor-pointer px-8 py-5 ">
                    Go Back to Website
                </Link>
            </div>
            {/* Header */}
            {/* <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-primary dark:text-primary-400">Your All Blogs</h1>

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
                    </button>
                </div>
            </header> */}

            {/* Blog Grid */}
            <div className="container mx-auto px-4 py-8">
                {blogData.length === 0 ? (
                    <div className="h-96 flex flex-col items-center justify-center">
                        <div className="bg-gray-200 dark:bg-gray-800 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
                        <h2 className="text-xl font-medium text-gray-500 dark:text-gray-400">
                            No blog posts found
                        </h2>
                        <p className="text-gray-400 dark:text-gray-500 mt-2">
                            Create your first blog to get started
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogData.map((blog) => (
                            <div
                                key={blog.id}
                                className="bg-white dark:bg-white text-gray-950 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700"
                            >
                                <div className="relative">
                                    <img
                                        src={blog.BlogImageLink || "https://via.placeholder.com/800x450?text=No+Image"}
                                        alt={blog.BlogTitle}
                                        className="w-full h-100 object-cover"
                                    />
                                    <div className="absolute top-3 right-3 flex gap-2">
                                        {blog.BlogTags?.split(",").slice(0, 2).map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-primary/90 dark:bg-primary-700 text-xs text-white rounded-full"
                                            >
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                                        <span>
                                            {blog.BlogPublishTime?.toDate().toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    <h2 className="text-xl font-bold mb-2 line-clamp-1">
                                        {blog.BlogTitle}
                                    </h2>

                                    <p className="text-gray-800 dark:text-gray-800 mb-4 line-clamp-3">
                                        {blog.BlogContent}
                                    </p>

                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2">
                                            <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-white transition-colors">
                                                <FiExternalLink size={16} />
                                                <span>View</span>
                                            </button>
                                            <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 text-white dark:hover:bg-gray-600 transition-colors">
                                                <FiEdit size={16} />
                                                <span>Edit</span>
                                            </button>
                                        </div>
                                        <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 border-red-800 rounded-full transition-colors">
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPage;