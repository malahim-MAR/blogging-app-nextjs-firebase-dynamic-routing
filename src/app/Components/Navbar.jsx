'use client'
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiEdit, FiSearch, FiUser } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setSearchOpen(false);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchTerm}`);
    setSearchTerm("");
    setSearchOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Politics ", path: "/PoliticalBlogs" },
    { name: "Travel & Tour ", path: "/TravelBlogs" },
    { name: "Sports", path: "/SportsBlogs" },
    { name: "Technology & AI", path: "/TechBlogs" },
    { name: "Business & Corporates", path: "/BuisnessBlogs" },
    { name: "Lifestyle & Daily", path: "/LifestyleBlogs" },
    { name: "Health & Care", path: "/HealthBlogs" },
  ];

  return (
    <nav
      className={` w-full h-auto z-50 transition-all duration-300 ${scrolled
        ? "bg-white shadow-md py-2"
        : "bg-white/90 backdrop-blur-sm py-4"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-xl p-2 rounded-lg">
              BlogHub
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900 hidden sm:block">
              Insights
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors rounded-lg hover:bg-gray-50"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
              aria-label="Search"
            >
              <FiSearch size={20} />
            </button>

            {/* Create Blog Button */}
            {/* <Link
              href="/NewBlog"
              className="hidden md:flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
            >
              <FiEdit className="mr-2" />
              <span>Create Post</span>
            </Link> */}

            {/* Profile */}
            <Link
              href="/profile"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
              aria-label="Profile"
            >
              <FiUser size={20} />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="mt-4 lg:hidden">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FiSearch
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Go
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 bg-white rounded-xl border border-gray-200 shadow-lg">
            <div className="flex flex-col py-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="px-6 py-3 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/NewBlog"
                className="flex items-center px-6 py-3 text-blue-600 hover:bg-blue-50 font-medium mt-2"
              >
                <FiEdit className="mr-2" />
                <span>Create Post</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Search Bar */}
      {searchOpen && (
        <div className="hidden lg:block absolute top-full left-0 w-full bg-white shadow-md py-4 px-4">
          <div className="container mx-auto">
            <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles, topics, or authors..."
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              <FiSearch
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;