// "use client";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import React from "react";
// import { useState } from "react";
// import { db } from "../lib/firebase";

// const Page = () => {
//   const [title, setTitle] = useState("");
//   const [imageLink, setImageLink] = useState("");
//   const [tags, setTags] = useState("");
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handlePublish = async (e) => {
//     setLoading(true);
//     e.preventDefault();
//     if (title === "" || tags === "" || content === "") {
//       return (
//         <>
//           <p className="text-red-600">Please Fill ALl Important Fields</p>
//         </>
//       );
//     }
//     try {
//       await addDoc(collection(db, "MyBlogs"), {
//         BlogTitle: title,
//         BlogImageLink: imageLink,
//         BlogTags: tags,
//         BlogContent: content,
//         BlogPublishTime: serverTimestamp(),
//       });
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     } finally {
//       setTitle("");
//       setImageLink("");
//       setTags("");
//       setContent("");
//       setLoading(false);
//     }
//     console.log("title:", title);
//     console.log("imageLink:", imageLink);
//     console.log("tags:", tags);
//     console.log("content:", content);
//   };
//   return (
//     <>
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
//         <input
//           type="text"
//           className="w-100 border m-3 px-10 py-3"
//           placeholder="Blog Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <input
//           type="text"
//           className="w-100 border m-3 px-10 py-3"
//           placeholder="Blog Image Link"
//           value={imageLink}
//           onChange={(e) => setImageLink(e.target.value)}
//         />
//         <input
//           type="text"
//           className="w-100 border m-3 px-10 py-3"
//           placeholder="Blog Tag eg. News , Sport , Entertainment"
//           value={tags}
//           onChange={(e) => setTags(e.target.value)}
//         />
//         <textarea
//           type="text"
//           className="w-100 border m-3 px-10 py-3"
//           placeholder="Blog Content..."
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//         <button
//           className="border px-5 py-3 cursor-pointer"
//           onClick={handlePublish}
//         >
//           Publish Post
//         </button>
//       </div>
//     </>
//   );
// };

// export default Page;
"use client";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../lib/firebase";

const Page = () => {
  const [title, setTitle] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [tags, setTags] = useState(['']);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePublish = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !tags.trim() || !content.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "MyBlogs"), {
        BlogTitle: title,
        BlogImageLink: imageLink,
        BlogTags: tags,
        BlogContent: content,
        BlogPublishTime: serverTimestamp(),
      });
      // Reset form on success
      setTitle("");
      setImageLink("");
      setTags("");
      setContent("");
    } catch (err) {
      console.error("Error adding document: ", err);
      setError("Failed to publish blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Create New Blog Post
          </h1>

          {error && (
            <div className="alert alert-error mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
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
                className="input input-bordered w-full text-lg py-4"
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
                className="input input-bordered w-full py-4"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Tags <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Technology, Web Development, Next.js"
                className="input input-bordered w-full py-4"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <p className="text-sm text-gray-500">Separate tags with commas</p>
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Blog Content <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Write your blog content here..."
                className="textarea textarea-bordered w-full h-64 text-base py-4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className={`btn btn-primary w-full text-lg ${
                  loading ? "btn-disabled" : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Publishing...
                  </>
                ) : (
                  "Publish Post"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
