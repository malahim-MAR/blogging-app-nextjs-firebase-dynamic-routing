import React from "react";

// Enhanced BlogCard component
const BlogCard = () => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-lg h-full flex flex-col lg:flex-row">
      <figure className="lg:w-2/5 h-48 lg:h-full overflow-hidden">
        <img
          src="https://i.tribune.com.pk/media/images/copy-of-news-stories-640-x-480-px-21747308646-0/copy-of-news-stories-640-x-480-px-21747308646-0.webp"
          alt="News cover"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </figure>
      <div className="card-body lg:w-3/5 p-4 md:p-6">
        <h2 className="card-title text-lg md:text-xl font-bold mb-2 line-clamp-2">
          Kashmir, Rafale, & Modi: How Pakistan turned a crisis into diplomatic gain
        </h2>
        <p className="text-gray-700 mb-4 line-clamp-4">
          <span className="font-bold text-base">KARACHI:</span> Pakistan's military response to Indian missile and drone strikes was swift and calculated. The Pakistan Air Force launched "Operation Bunyan Marsoos," demonstrating its advanced warfare capabilities. Pakistani forces reportedly downed multiple Indian aircraft, including at least one Rafale fighter jet, using a coordinated strategy enabled by Chinese-supplied J-10C jets, PL-15E beyond-visual-range missiles, and HQ-9P air defence systems. These systems, tested in real-time combat, proved effective and triggered a surge in Chinese defence stocks globally.
        </p>
        <div className="card-actions justify-end mt-auto">
          <button className="btn btn-primary btn-sm md:btn-md">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="carousel carousel-vertical rounded-box space-y-4 h-[600px]">
            {[...Array(7)].map((_, i) => (
              <div 
                key={i} 
                className="carousel-item h-80 lg:h-72 w-full transition-all duration-300 hover:shadow-xl"
                id={`item${i+1}`}
              >
                <BlogCard />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {[...Array(7)].map((_, i) => (
              <a 
                key={i}
                href={`#item${i+1}`}
                className="btn btn-xs btn-square"
              >
                {i+1}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;