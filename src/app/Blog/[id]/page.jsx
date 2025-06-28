// // src/app/Blog/[blogId]/Page.jsx
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../../lib/firebase";

// async function getBlogPost(blogId) {
//   // Convert URL parameter to number (if your BlogID is numeric)
//   const idNumber = Number(blogId);
//   console.log("Fetching blog post with ID:", blogId);
//   // Query Firestore for matching BlogID
//   const q = query(
//     collection(db, "MyBlogs"),
//     where("BlogId", "==", 535418)
//   );

//   const querySnapshot = await getDocs(q);

//   if (querySnapshot.empty) {
//     return null;
//   }

//   // Get first matching document
//   const doc = querySnapshot.docs[0];
//   return doc.data();
// }

// export default async function Page({ params }) {
//   const { blogId } = params;
//   const blogPost = await getBlogPost(blogId);

//   return (
//     <div>
//       <h1>{blogPost?.BlogTitle || "No title"}</h1>
//       <img
//         src={blogPost?.BlogImageLink}
//         alt={blogPost?.BlogTitle}
//         style={{ maxWidth: '100%' }}
//       />
//       <div>
//         {blogPost?.BlogContent?.split('\n').map((p, i) => (
//           <p key={i}>{p}</p>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { Inter } from 'next/font/google';
import { useParams, useRouter } from "next/navigation";

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const Page = () => {
  const params = useParams(); // Get all URL parameters
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Safely get blogId from parameters
  // const blogId = params?.id;
  const id = params?.id;
  const blogId = parseInt(id); // ✅ convert to number

  console.log("params from useParams:", useParams());

  useEffect(() => {
    // Ensure blogId is present before querying
    if (!blogId) {
      setError("Missing blog ID in URL");
      setLoading(false);
      return;
    }

    console.log("Fetching blog with ID:", blogId);
    const q = query(
      collection(db, "MyBlogs"),
      where("BlogId", "==", blogId)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          setBlog({ id: doc.id, ...doc.data() });
        } else {
          setError("No blog found with this ID.");
        }
        setLoading(false);
      },
      (err) => {
        console.error("Firestore error:", err);
        setError("Failed to fetch blog. Please try again later.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [blogId, router]);

  const processTags = (tags) => {
    if (Array.isArray(tags)) return tags;
    if (typeof tags === 'string') {
      return tags.split(',').map(tag => tag.trim());
    }
    return [];
  };

  if (loading) return (
    <div className={`h-screen flex items-center justify-center ${inter.className}`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading blog...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className={`h-screen flex items-center justify-center ${inter.className}`}>
      <div className="bg-red-50 p-6 rounded-lg border border-red-200 max-w-md text-center">
        <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  const tags = processTags(blog?.BlogTags || []);

  return (
    <div className={`min-h-screen bg-white py-10 px-4 md:px-20 ${inter.className}`}>
      <div className="max-w-4xl mx-auto">
        <img
          src={blog?.BlogImageLink || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070"}
          alt={blog?.BlogTitle || "Blog image"}
          className="w-full h-96 object-cover rounded-lg mb-8"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070";
          }}
        />

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <time className="text-gray-500 text-sm block mb-4">
          {blog?.BlogPublishTime?.toDate().toLocaleString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
          }) || "Unknown date"}
        </time>

        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {blog?.BlogTitle || "Untitled Blog"}
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line">
          {blog?.BlogContent || "No content available"}
        </div>
      </div>
    </div>
  );
};

export default Page;