import Image from "next/image";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Components/Home";
import BlogCard from "./Components/BlogCard";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* <div style={{ height: "80vh" , margin:'10px 0px 10px 10px'}} > */}
      <BlogCard />
      {/* </div> */}
      <Footer />
    </>
  );
}
