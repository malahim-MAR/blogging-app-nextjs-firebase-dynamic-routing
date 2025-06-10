import Image from "next/image";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Components/Home";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* <div style={{ minHeight: "100vh" }} > */}
        <HomePage />
      {/* </div> */}
      <Footer />
    </>
  );
}
