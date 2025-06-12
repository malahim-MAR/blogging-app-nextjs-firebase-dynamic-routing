"use client";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { db } from "../lib/firebase";

const Page = () => {
  const [title, setTitle] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  const handlePublish = async (e) => {
    e.preventDefault();
    if (title === "" || tags === "" || content === "") {
      return (
        <>
          <p className="text-red-600">Please Fill ALl Important Fields</p>
        </>
      );
    }
    try {
      await addDoc(collection(db, "MyBlogs"), {
        BlogTitle: title,
        BlogImageLink: imageLink,
        BlogTags: tags,
        BlogContent: content,
        BlogPublishTime: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setTitle("");
      setImageLink("");
      setTags("");
      setContent("");
    }
    console.log("title:", title);
    console.log("imageLink:", imageLink);
    console.log("tags:", tags);
    console.log("content:", content);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
        <input
          type="text"
          className="w-100 border m-3 px-10 py-3"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="w-100 border m-3 px-10 py-3"
          placeholder="Blog Image Link"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
        />
        <input
          type="text"
          className="w-100 border m-3 px-10 py-3"
          placeholder="Blog Tag eg. News , Sport , Entertainment"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <textarea
          type="text"
          className="w-100 border m-3 px-10 py-3"
          placeholder="Blog Content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="border px-5 py-3 cursor-pointer"
          onClick={handlePublish}
        >
          Publish Post
        </button>
      </div>
    </>
  );
};

export default Page;
