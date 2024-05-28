import React, { useEffect, useState } from 'react';
import { getProblems, deleteProblem} from '../../services/operations/authAPI';
import { Link, useNavigate } from 'react-router-dom';

const ProblempageAdmin = () => {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  const getAllProblems = async () => {
    try {
      const response = await getProblems();
      setProblems(response);
    } catch (error) {
      console.error('Unable to fetch all problems:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProblem(id,navigate);
      setProblems(problems.filter(problem => problem._id !== id));
    } catch (error) {
      console.error('Unable to delete the problem:', error);
    }
    console.log("deleted")
  };

  useEffect(() => {
    getAllProblems();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-white mb-8">EXPLORE PROBLEMS</h1>
      <nav className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {problems.map((problem) => (
          <div
            key={problem._id}
            className="bg-gray-700 rounded-lg shadow hover:bg-gray-600 transition duration-200 p-4 text-center"
          >
            <h2 className="text-xl font-medium text-white mb-2">{problem.title}</h2>
            <button
              className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded-lg m-1"
              onClick={() => navigate(`/singleprob/${problem._id}`)}
            >
              View
            </button>
            <Link
              to={`/updateprob/${problem._id}`}
              className="text-white bg-yellow-500 hover:bg-yellow-700 px-3 py-1 rounded-lg m-1"
            >
              Update
            </Link>
            <button
              className="text-white bg-red-500 hover:bg-red-700 px-3 py-1 rounded-lg m-1"
              onClick={() => handleDelete(problem._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default ProblempageAdmin;
