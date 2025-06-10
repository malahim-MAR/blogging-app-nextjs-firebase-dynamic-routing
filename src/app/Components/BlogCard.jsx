import React from "react";

const BlogCard = () => {
  return (
    <>
      <div className="card lg:card-side bg-gray-100 h-auto shadow-sm ">
        <figure className="">
          <img
            src="https://i.tribune.com.pk/media/images/copy-of-news-stories-640-x-480-px-21747308646-0/copy-of-news-stories-640-x-480-px-21747308646-0.webp"
            alt="Album"
          />
        </figure>
        <div className="card-body w-full">
          <h2 className="card-title">
            Kashmir, Rafale, & Modi: How Pakistan turned a crisis into
            diplomatic gain
          </h2>
          <p className="">
            <span className="font-bold text-lg">
              KARACHI:
              <br />
            </span>{" "}
            Pakistan’s military response to Indian missile and drone strikes was
            swift and calculated. The Pakistan Air Force launched "Operation
            Bunyan Marsoos," demonstrating its advanced warfare capabilities.
            Pakistani forces reportedly downed multiple Indian aircraft,
            including at least one Rafale fighter jet, using a coordinated
            strategy enabled by Chinese-supplied J-10C jets, PL-15E
            beyond-visual-range missiles, and HQ-9P air defence systems. These
            systems, tested in real-time combat, proved effective and triggered
            a surge in Chinese defence stocks globally. The operational
            highlight was Pakistan's use of an integrated ABC model: targets
            were locked by ground radars (A), missiles were launched by fighter
            jets (B), and guided by airborne warning and control systems (C).
            This advanced, networked combat approach outperformed India’s
            fragmented response and signalled a shift from traditional air
            combat to intelligent warfare.
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Read More ...</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
