"use client";
import { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";
import BlogCard from "../Components/BlogCard"; // Adjust import path as needed

const Page = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const notesQuery = query(
      collection(db, "MyBlogs"),
      orderBy("BlogPublishTime", "desc")
    );

    const unsubscribe = onSnapshot(
      notesQuery,
      (snapshot) => {
        const notes = [];
        if (!snapshot.empty) {
          snapshot.forEach((doc) => {
            notes.push({ id: doc.id, ...doc.data() });
          });
        }
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

  // Filter blogs with "Political" tag
  const filterPoliticalBlogs = () => {
    return blogData.filter(blog => {
      const tags = blog.BlogTags || [];
      const processedTags = Array.isArray(tags)
        ? tags
        : typeof tags === 'string'
          ? tags.split(',').map(tag => tag.trim().toLowerCase())
          : [];

      return processedTags.includes("Travel");
    });
  };

  const politicalBlogs = filterPoliticalBlogs();

  return (
    <div>
      <BlogCard
        blogs={politicalBlogs}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Page;