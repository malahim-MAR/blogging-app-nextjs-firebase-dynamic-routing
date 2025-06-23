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
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <span className="loading loading-ring loading-lg"></span>
        <p className="mt-4 text-lg">Loading blogs...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="h-screen flex items-center justify-center text-red-500 text-xl">
      {error}
    </div>
  );

  return (
    <div className="snap-container  h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide">
      {blogData.length === 0 ? (
        <div className="h-screen flex items-center justify-center snap-start">
          <p className="text-2xl text-gray-500">No blog posts found</p>
        </div>
      ) : (
        blogData.map((blog) => (
          <section
            key={blog.id}
            className="h-screen w-full snap-start snap-always flex flex-col md:flex-row"
          >
            {/* Image Section (40%) */}
            <div className="w-full md:w-2/5 h-2/5 md:h-full overflow-hidden">
              <img
                src={blog.BlogImageLink || "https://via.placeholder.com/800x1000?text=No+Image"}
                alt={blog.BlogTitle}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Content Section (60%) */}
            <div className="w-full md:w-3/5 h-3/5 md:h-full flex items-center justify-center p-6 md:p-12 bg-base-100">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {blog.BlogTitle}
                </h1>

                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.BlogTags}
                  {/* {blog.BlogTags?.map((tag, index) => (
                    <span 
                      key={index} 
                      className="badge badge-primary badge-outline"
                    >
                      {tag}
                    </span>
                  ))} */}
                </div>

                <time className="text-gray-500 block mb-6">
                  {blog.BlogPublishTime?.toDate().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <p className="text-lg mb-8 line-clamp-3">
                  {blog.BlogContent.slice(0, 250)}...
                </p>


                <button className="btn btn-primary px-8 py-3 text-lg">
                  Read More
                </button>
              </div>
            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default BlogCard;