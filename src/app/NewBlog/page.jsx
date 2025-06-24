// // "use client";
// // import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// // import React from "react";
// // import { useState } from "react";
// // import { db } from "../lib/firebase";

// // const Page = () => {
// //   const [title, setTitle] = useState("");
// //   const [imageLink, setImageLink] = useState("");
// //   const [tags, setTags] = useState("");
// //   const [content, setContent] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handlePublish = async (e) => {
// //     setLoading(true);
// //     e.preventDefault();
// //     if (title === "" || tags === "" || content === "") {
// //       return (
// //         <>
// //           <p className="text-red-600">Please Fill ALl Important Fields</p>
// //         </>
// //       );
// //     }
// //     try {
// //       await addDoc(collection(db, "MyBlogs"), {
// //         BlogTitle: title,
// //         BlogImageLink: imageLink,
// //         BlogTags: tags,
// //         BlogContent: content,
// //         BlogPublishTime: serverTimestamp(),
// //       });
// //     } catch (error) {
// //       console.error("Error adding document: ", error);
// //     } finally {
// //       setTitle("");
// //       setImageLink("");
// //       setTags("");
// //       setContent("");
// //       setLoading(false);
// //     }
// //     console.log("title:", title);
// //     console.log("imageLink:", imageLink);
// //     console.log("tags:", tags);
// //     console.log("content:", content);
// //   };
// //   return (
// //     <>
// //       <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
// //         <input
// //           type="text"
// //           className="w-100 border m-3 px-10 py-3"
// //           placeholder="Blog Title"
// //           value={title}
// //           onChange={(e) => setTitle(e.target.value)}
// //         />
// //         <input
// //           type="text"
// //           className="w-100 border m-3 px-10 py-3"
// //           placeholder="Blog Image Link"
// //           value={imageLink}
// //           onChange={(e) => setImageLink(e.target.value)}
// //         />
// //         <input
// //           type="text"
// //           className="w-100 border m-3 px-10 py-3"
// //           placeholder="Blog Tag eg. News , Sport , Entertainment"
// //           value={tags}
// //           onChange={(e) => setTags(e.target.value)}
// //         />
// //         <textarea
// //           type="text"
// //           className="w-100 border m-3 px-10 py-3"
// //           placeholder="Blog Content..."
// //           value={content}
// //           onChange={(e) => setContent(e.target.value)}
// //         />
// //         <button
// //           className="border px-5 py-3 cursor-pointer"
// //           onClick={handlePublish}
// //         >
// //           Publish Post
// //         </button>
// //       </div>
// //     </>
// //   );
// // };

// // export default Page;
// "use client";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import React, { useState } from "react";
// import { db } from "../lib/firebase";

// const Page = () => {
//   const [title, setTitle] = useState("");
//   const [imageLink, setImageLink] = useState("");
//   const [tags, setTags] = useState(['']);
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handlePublish = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!title.trim() || !tags.trim() || !content.trim()) {
//       setError("Please fill in all required fields");
//       return;
//     }

//     setLoading(true);
//     try {
//       await addDoc(collection(db, "MyBlogs"), {
//         BlogTitle: title,
//         BlogImageLink: imageLink,
//         BlogTags: tags,
//         BlogContent: content,
//         BlogPublishTime: serverTimestamp(),
//       });
//       // Reset form on success
//       setTitle("");
//       setImageLink("");
//       setTags("");
//       setContent("");
//     } catch (err) {
//       console.error("Error adding document: ", err);
//       setError("Failed to publish blog. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6">
//       <div className="max-w-3xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
//           <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
//             Create New Blog Post
//           </h1>

//           {error && (
//             <div className="alert alert-error mb-6">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="stroke-current shrink-0 h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               <span>{error}</span>
//             </div>
//           )}

//           <form onSubmit={handlePublish} className="space-y-6">
//             <div className="space-y-2">
//               <label className="block text-lg font-medium text-gray-700">
//                 Blog Title <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter blog title"
//                 className="input input-bordered w-full text-lg py-4"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-lg font-medium text-gray-700">
//                 Featured Image URL
//               </label>
//               <input
//                 type="text"
//                 placeholder="https://example.com/image.jpg"
//                 className="input input-bordered w-full py-4"
//                 value={imageLink}
//                 onChange={(e) => setImageLink(e.target.value)}
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-lg font-medium text-gray-700">
//                 Tags <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g. Technology, Web Development, Next.js"
//                 className="input input-bordered w-full py-4"
//                 value={tags}
//                 onChange={(e) => setTags(e.target.value)}
//               />
//               <p className="text-sm text-gray-500">Separate tags with commas</p>
//             </div>

//             <div className="space-y-2">
//               <label className="block text-lg font-medium text-gray-700">
//                 Blog Content <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 placeholder="Write your blog content here..."
//                 className="textarea textarea-bordered w-full h-64 text-base py-4"
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//               />
//             </div>

//             <div className="pt-4">
//               <button
//                 type="submit"
//                 className={`btn btn-primary w-full text-lg ${loading ? "btn-disabled" : ""
//                   }`}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <span className="loading loading-spinner"></span>
//                     Publishing...
//                   </>
//                 ) : (
//                   "Publish Post"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;
"use client";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../lib/firebase";
import { Inter } from 'next/font/google';
import Link from "next/link";

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const Page = () => {
  const [title, setTitle] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const availableTags = ["Politics", "Sports", "Social"];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < 3) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || selectedTags.length === 0 || !content.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "MyBlogs"), {
        BlogTitle: title,
        BlogImageLink: imageLink,
        BlogTags: selectedTags,
        BlogContent: content,
        BlogPublishTime: serverTimestamp(),
      });
      setTitle("");
      setImageLink("");
      setSelectedTags([]);
      setContent("");
    } catch (err) {
      console.error("Error adding document: ", err);
      setError("Failed to publish blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 ${inter.className}`}>
        <Link href={'/'} style={{ width: '320px' }} className=" px-5 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-white rounded-lg flex items-center gap-2 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Website
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">

            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Create New Blog Post
            </h1>

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handlePublish} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-lg font-medium text-gray-700">
                  Blog Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter blog title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-lg font-medium text-gray-700">
                  Featured Image URL
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-lg font-medium text-gray-700">
                  Tags <span className="text-red-500">*</span>
                  <span className="text-sm text-gray-500 ml-2">(Select up to 3)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedTags.includes(tag)
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedTags.map(tag => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-2 text-blue-600 hover:text-blue-800"
                        onClick={() => toggleTag(tag)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-lg font-medium text-gray-700">
                  Blog Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Write your blog content here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-64"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-6 rounded-lg text-white font-medium text-lg transition-all ${loading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                    }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Publishing...
                    </div>
                  ) : (
                    "Publish Post"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;