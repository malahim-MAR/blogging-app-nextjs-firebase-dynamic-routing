import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-white shadow-sm text-gray-800">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-10 w-52 rounded-md border border-gray-200 bg-white p-2 shadow-lg"
          >
            <li>
              <a className="hover:bg-gray-100">Item 1</a>
            </li>
            <li>
              <a className="hover:bg-gray-100">Parent</a>
              <ul className="p-2 bg-white border border-gray-200 shadow rounded-md">
                <li>
                  <a className="hover:bg-gray-100">Submenu 1</a>
                </li>
                <li>
                  <a className="hover:bg-gray-100">Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a className="hover:bg-gray-100">Item 3</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl text-gray-900">daisyUI</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-gray-800">
          <li>
            <a className="hover:bg-gray-100">Item 1</a>
          </li>
          <li>
            <details>
              <summary className="hover:bg-gray-100">Parent</summary>
              <ul className="p-2 bg-white border border-gray-200 shadow rounded-md">
                <li>
                  <a className="hover:bg-gray-100">Submenu 1</a>
                </li>
                <li>
                  <a className="hover:bg-gray-100">Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a className="hover:bg-gray-100">Item 3</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <Link href="/NewBlog" className="btn bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200">
            Button
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
