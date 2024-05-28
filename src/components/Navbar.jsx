import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto">
      <nav>
        <ul className="text-richblack-100 flex gap-x-6">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
            </li>
        </ul>
      </nav>
      <div className="flex items-center gap-x-4">
        <Link to="/login">
          <button
            className="bg-richblack-800 text-richblack-100 py-2 px-3 rounded border border-richblack-700"
          >
            Log in
          </button>
        </Link>
        <Link to="/signup">
          <button
            className="bg-richblack-800 text-richblack-100 py-2 px-3 rounded border border-richblack-700"
          >
            Sign up
          </button>
        </Link>
        
        <button
          className="bg-richblack-800 text-richblack-100 py-2 px-3 rounded border border-richblack-700"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
