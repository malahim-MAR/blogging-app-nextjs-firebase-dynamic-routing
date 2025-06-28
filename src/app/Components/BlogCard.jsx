// "use client";
// import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import { db } from "../lib/firebase";

// const BlogCard = () => {
//   // const [blogTitle, setBlogTitle] = useState("");
//   // const [blogContent, setBlogContent] = useState("");
//   // const [blogImage, setBlogImage] = useState("");
//   // const [blogCategory, setBlogCategory] = useState("");
//   // const [loading, setLoading] = useState(false);
//   // const [error, setError] = useState(null);

//   useEffect(() => {
//     // 1. Create query reference
//     const notesQuery = query(
//       collection(db, "MyBlogs"),
//       orderBy("BlogPublishTime", "desc"),
//       // where("userEmail", "==", userEmail.email)
//     );

//     // 2. Set up real-time listener
//     const unsubscribe = onSnapshot(
//       notesQuery,
//       (snapshot) => {
//         // Handle successful data fetch
//         const notes = [];

//         if (snapshot.empty) {
//           console.log("No notes found");
//           setMyNoteData([]);
//         } else {
//           snapshot.forEach((doc) => {
//             notes.push({ id: doc.id, ...doc.data() });
//           });
//           setMyNoteData(notes);
//         }

//         setLoading(false);
//       },
//       (error) => {
//         // Handle errors
//         console.error("Firestore error:", error);
//         setError("Failed to load notes");
//         setLoading(false);
//       }
//     );

//     // 3. Clean up listener when component unmounts
//     return () => {
//       console.log("Unsubscribing from Firestore");
//       unsubscribe();
//     };
//   }, []);
//   return (
//     <>
//       <div className="card lg:card-side bg-gray-100 h-auto shadow-sm ">
//         <figure className="">
//           <img
//             src="https://i.tribune.com.pk/media/images/copy-of-news-stories-640-x-480-px-21747308646-0/copy-of-news-stories-640-x-480-px-21747308646-0.webp"
//             alt="Album"
//           />
//         </figure>
//         <div className="card-body w-full">
//           {<h2 className="card-title">blogTitle</h2>}
//           <p className="">
//             <span className="font-bold text-lg">
//               KARACHI:
//               <br />
//             </span>{" "}
//             Pakistan’s military response to Indian missile and drone strikes was
//             swift and calculated. The Pakistan Air Force launched "Operation
//             Bunyan Marsoos," demonstrating its advanced warfare capabilities.
//             Pakistani forces reportedly downed multiple Indian aircraft,
//             including at least one Rafale fighter jet, using a coordinated
//             strategy enabled by Chinese-supplied J-10C jets, PL-15E
//             beyond-visual-range missiles, and HQ-9P air defence systems. These
//             systems, tested in real-time combat, proved effective and triggered
//             a surge in Chinese defence stocks globally. The operational
//             highlight was Pakistan's use of an integrated ABC model: targets
//             were locked by ground radars (A), missiles were launched by fighter
//             jets (B), and guided by airborne warning and control systems (C).
//             This advanced, networked combat approach outperformed India’s
//             fragmented response and signalled a shift from traditional air
//             combat to intelligent warfare.
//           </p>
//           <div className="card-actions justify-end">
//             <button className="btn btn-primary">Read More ...</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BlogCard;
"use client";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { Inter } from 'next/font/google';
import Link from "next/link";

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const BlogCard = () => {
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

  if (loading) return (
    <div className={`h-screen flex items-center justify-center ${inter.className}`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading blogs...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className={`h-screen flex items-center justify-center text-red-500 text-xl ${inter.className}`}>
      <div className="bg-red-50 p-6 rounded-lg border border-red-200 max-w-md text-center">
        <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        {error}
      </div>
    </div>
  );

  // Helper function to process tags
  const processTags = (tags) => {
    if (Array.isArray(tags)) return tags;
    if (typeof tags === 'string') {
      return tags.split(',').map(tag => tag.trim());
    }
    return [];
  };

  return (
    <div className={`snap-container h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide pt-10 ${inter.className}`}>
      {blogData.length === 0 ? (
        <div className="h-screen flex flex-col items-center justify-center snap-start bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="text-center max-w-md p-6">
            <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
            <h2 className="text-2xl font-bold text-gray-500 mb-2">No Blog Posts Yet</h2>
            <p className="text-gray-500 mb-6">Be the first to create an amazing blog post!</p>
            <button
              onClick={() => window.location.href = '/create-blog'}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Create Your First Post
            </button>
          </div>
        </div>
      ) : (
        blogData.map((blog) => {
          const tags = processTags(blog.BlogTags);

          return (
            <section
              key={blog.id}
              className="h-screen w-full snap-start snap-always flex flex-col md:flex-row bg-white"
            >
              {/* Image Section */}
              <div className="w-full md:w-2/5 h-1/3 md:h-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r from-black/50 to-transparent z-10"></div>
                <img
                  src={blog.BlogImageLink || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"}
                  alt={blog.BlogTitle}
                  className="w-full h-full my-10 py-10 object-cover object-center"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop";
                  }}
                />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-3/5 h-2/3 md:h-full flex items-center justify-center p-6 md:p-12 bg-white overflow-y-auto">
                <div className="max-w-2xl w-full">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full flex items-center"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <time className="text-gray-500 text-sm block mb-4">
                    {blog.BlogPublishTime?.toDate().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </time>

                  <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                    {blog.BlogTitle}
                  </h1>

                  <div className="prose max-w-none mb-8 text-gray-600">
                    {

                      blog.BlogContent.slice(0, 1200)

                    }
                    ...
                    {/* {blog.BlogContent.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-4">
                        {paragraph}
                      </p>
                    ))} */}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {/* <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                      Read Full Article
                    </button> */}

                    <Link href={`/Blog/${blog.BlogId}`} className="flex-1">
                      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                        Read Full Article
                      </button>
                    </Link>
                    <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Save for Later
                    </button>
                  </div>
                </div>
              </div>
            </section>
          );
        })
      )}
    </div>
  );
};

export default BlogCard;