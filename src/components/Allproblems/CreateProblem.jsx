import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProblem } from "../../services/operations/authAPI";
//import jwtDecode from 'jsonwebtoken';
import {jwtDecode } from 'jwt-decode';



const CreateProblem = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "",
    inputformat: "",
    outputformat: "",
    sampleinput1: "",
    sampleoutput1: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const token=localStorage.getItem("token") ;
  // const parsetoken=JSON.parse(localStorage.getItem("token"));
  // console.log("tera token-->",token);
  // console.log("parsed token-->",parsetoken);

  
  
   

  

  const token = localStorage.getItem("token");
  console.log("tera token-->",token);
  const payload = jwtDecode(token);
  console.log("payloadaaa-->",payload);
  const role=payload.accountType;
  console.log("accoutType::-->",role);
  
  

    const { title,
    description,
    difficulty,
    inputformat,
    outputformat,
    sampleinput1,
    sampleoutput1,} =
    formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createProblem(formData, navigate));
    //reset
    setFormData({
      title: "",
      description: "",
      difficulty: "",
      inputFormat: "",
      outputFormat: "",
      sampleInput1: "",
      sampleOutput1: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg w-full">
      <h2 className="text-3xl font-bold mb-6 text-center">Create a Problem</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg">Description</label>
          <textarea
            name="description"
            type="text"
            value={description}
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            rows="4"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg">Difficulty</label>
          <select
            name="difficulty"
            value={difficulty}
            type="text"
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            required
          >
            <option value="">Select difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg">Input Format</label>
          <textarea
            name="inputformat"
            value={inputformat}
            type="text"
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            rows="2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg">Output Format</label>
          <textarea
            name="outputformat"
            value={outputformat}
            type="text"
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            rows="2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg">Sample Input 1</label>
          <textarea
            name="sampleinput1"
            value={sampleinput1}
            type="text"
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            rows="2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg">Sample Output 1</label>
          <textarea
            name="sampleoutput1"
            value={sampleoutput1}
            type="text"
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            rows="2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateProblem;
