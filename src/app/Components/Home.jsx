import React from "react";
import BlogCard from "./BlogCard";

const HomePage = () => {
  return (
    <>
      <div className="carousel carousel-vertical rounded-box h-160  w-full">
        <div className="carousel-item h-full my-5">
          <BlogCard />
          {/* <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" /> */}
        </div>
        <div className="carousel-item h-full my-5">
          {/* <img src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp" /> */}
          <BlogCard />
        </div>
        <div className="carousel-item h-full  my-5">
          <BlogCard />

          {/* <img src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp" /> */}
        </div>
        <div className="carousel-item h-full  my-5">
          <BlogCard />

          {/* <img src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp" /> */}
        </div>
        <div className="carousel-item h-full  my-5">
          <BlogCard />

          {/* <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp" /> */}
        </div>
        <div className="carousel-item h-full  my-5">
          <BlogCard />

          {/* <img src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp" /> */}
        </div>
        <div className="carousel-item h-full  my-5">
          <BlogCard />

          {/* <img src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp" /> */}
        </div>
      </div>
      {/* <div className="flex flex-row p-4 gap-4 ">
        <BlogCard />
      </div> */}
    </>
  );
};

export default HomePage;
