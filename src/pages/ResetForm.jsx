import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {resetPassword} from  "../services/operations/authAPI";
import { useDispatch } from "react-redux";

const ResetForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   

    console.log(formData);
    dispatch(resetPassword(formData, navigate));
    // Add your form submission logic here, e.g., making an API call
    // navigate('/somewhere'); // Optionally navigate to another route
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder='enter your email'
              value={formData.email}
              onChange={handleOnChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="password">
              New Password
            </label>
            <input
              type="password"
              name="password"
              placeholder='enter password'
              id="password"
              value={formData.password}
              onChange={handleOnChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder='confirm password'
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleOnChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetForm;
