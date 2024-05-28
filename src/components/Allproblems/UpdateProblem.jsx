import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProblemById, getProblembyid } from '../../services/operations/authAPI';
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";


const UpdateProblem = () => {
  //const { id } = useParams();
  const location = useLocation();
  const id = String(location.pathname.split("/").at(-1)); //String(location.pathname..........) because to read id as a string

  console.log("printing id using uselocation:->",id);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: '',
    inputformat: '',
    outputformat: '',
    sampleinput1: '',
    sampleoutput1: ''
  });
  const dispatch = useDispatch(); // Get the dispatch function

  useEffect(() => {
    const fetchProblem = async () => {
      const response = await getProblembyid(id);
      if (response.data && response.data.problem) {
        setFormData(response.data.problem);
      }
    };
    fetchProblem();
  }, [id]);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
    try {
      // Dispatch the action using dispatch
      dispatch(updateProblemById(id, formData, navigate));
  
      // Optionally, you can navigate after successful update
      // navigate("/problemset");
    } catch (error) {
      console.error('Update problem error:', error);
      // Handle error, show error message, etc.
    }
  };
  

  

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg w-full">
      <h2 className="text-3xl font-bold mb-6 text-center">Update Problem</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-300 rounded mt-2"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            rows="4"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg">Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-300 rounded mt-2"
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
            value={formData.inputformat}
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            rows="2"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg">Output Format</label>
          <textarea
            name="outputformat"
            value={formData.outputformat}
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            rows="2"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg">Sample Input 1</label>
          <textarea
            name="sampleinput1"
            value={formData.sampleinput1}
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            rows="2"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg">Sample Output 1</label>
          <textarea
            name="sampleoutput1"
            value={formData.sampleoutput1}
            onChange={handleOnChange}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            rows="2"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProblem;
