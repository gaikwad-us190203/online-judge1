import React, { useState } from "react";
import { login } from "../services/operations/authAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

const Login = () => {
  const [formdata, setformdata] = useState({
    email : "",
    password : ""
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const{email, password} = formdata;

  const handleOnChange = (e) => {
    setformdata((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleonsubmit = (e) => {
    e.preventDefault();

    console.log(formdata);
    dispatch(login(formdata, navigate));
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <form className="flex flex-col w-full gap-y-4 mt-6" 
        onSubmit={handleonsubmit}>
          <label className="w-full">
            <p className="text-sm text-white mb-1">
              Email Address<sup className="text-red-500">*</sup>
            </p>
            <input
              required
              onChange={handleOnChange}
              type="email"
              placeholder="Enter email address"
              name="email"
              value={email}
              className="bg-gray-800 rounded-md text-gray-200 w-full p-3"
            />
          </label>

          <label className="w-full">
            <p className="text-sm text-white mb-1">
              Password<sup className="text-red-500">*</sup>
            </p>
            <input
              required
              onChange={handleOnChange}
              type="password"
              placeholder="Enter Password"
              name="password"
              value={password}
              className="bg-gray-800 rounded-md text-gray-200 w-full p-3"
            />
          </label>
          <Link to ="/reset-password"><button className="bg-blue-400 rounded-md font-medium w-full text-black px-4 py-2 mt-6">
            forget Password
          </button></Link>
          
          

          <button className="bg-yellow-400 rounded-md font-medium text-black px-4 py-2 mt-6"
          type="submit">
            Login
          </button>
          <button className='w-full flex justify-center items-center bg-yellow-50 rounded-[8px] font-medium text-bg-gray-900
            border border-bg-white px-[12px] py-[8px] gap-x-2 mt-6 '>
                <p>Sign Up with Google</p>
            </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
