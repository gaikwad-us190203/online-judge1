import React, { useState } from "react";
// import { setSignupData } from "../slices/authSlice";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { firstName, lastName, email, password, confirmPassword, accountType } =
    formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    const signupData = formData;

    // console.log(signupData);

    // Setting signup data to state
    // To be used after otp verification
    dispatch(signUp(signupData, navigate));
    // Send OTP to user for verification
    // console.log("Submitted successfully");

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      accountType: "",
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl text-white text-center mb-8">
          Create an Account
        </h2>
        <form onSubmit={handleOnSubmit}>
          <div className="flex gap-x-4 mb-4">
            <label className="block mb-2 text-sm text-gray-400">
              Account Type
            </label>
            <input
              onChange={handleOnChange}
              type="text"
              name="accountType"
              value={accountType}
              placeholder="Only Student and Admin"
              className="bg-gray-700 rounded-lg text-white w-full p-2 mb-4"
            />
            <label className="w-full">
              <p className="text-sm text-gray-400 mb-1">
                First Name<sup className="text-red-500">*</sup>
              </p>
              <input
                onChange={handleOnChange}
                value={firstName}
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                className="bg-gray-700 rounded-lg text-white w-full p-2"
              />
            </label>
            <label className="w-full">
              <p className="text-sm text-gray-400 mb-1">
                Last Name<sup className="text-red-500">*</sup>
              </p>
              <input
                onChange={handleOnChange}
                value={lastName}
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                className="bg-gray-700 rounded-lg text-white w-full p-2"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="w-full">
              <p className="text-sm text-gray-400 mb-1">
                Email Address<sup className="text-red-500">*</sup>
              </p>
              <input
                onChange={handleOnChange}
                value={email}
                type="email"
                name="email"
                placeholder="Enter Email Address"
                className="bg-gray-700 rounded-lg text-white w-full p-2"
              />
            </label>
          </div>
          <div className="flex gap-x-4 mb-4">
            <label className="w-full">
              <p className="text-sm text-gray-400 mb-1">
                Create Password<sup className="text-red-500">*</sup>
              </p>
              <input
                onChange={handleOnChange}
                value={password}
                type="text"
                name="password"
                placeholder="Enter Password"
                className="bg-gray-700 rounded-lg text-white w-full p-2"
              />
            </label>
            <label className="w-full">
              <p className="text-sm text-gray-400 mb-1">
                Confirm Password<sup className="text-red-500">*</sup>
              </p>
              <input
                onChange={handleOnChange}
                value={confirmPassword}
                type="text"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="bg-gray-700 rounded-lg text-white w-full p-2"
              />
            </label>
          </div>
          <button className="w-full bg-yellow-500 text-gray-900 rounded-lg p-2 mt-4 hover:bg-yellow-600 transition duration-200">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
