import React from "react";
import logo from "../assets/1675193385885.jpeg"
import { Link } from "react-router-dom";

const Mainpage = () => {
  return (
    <div>
      <Link to="/">
        <div className="flex justify-center items-center h-screen w-full space-x-20">
          <div className="text-4xl text-red-600"> Online Judge</div>
          <div>
            <img src={logo} className="w-[50%] h-[50%] "></img>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Mainpage;
