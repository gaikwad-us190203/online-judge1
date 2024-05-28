import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Mainpage from "./pages/Mainpage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./components/adminSets/Users";
import Submissions from "./components/adminSets/Submissions";
import Contests from "./components/adminSets/Contests";
import ProblemsPage from "./components/Allproblems/ProblemsPage";
import CreateProblem from "./components/Allproblems/CreateProblem";
import UpdateProblem from "./components/Allproblems/UpdateProblem";
import DeleteProblem from "./components/Allproblems/DeleteProblem";
import Singleproblem from "./components/Problemcompiler/Singleproblem";
import ProblempageAdmin from "./components/adminSets/ProblempageAdmin";
import ResetForm from "./pages/ResetForm";
import About from "./pages/About";

const App = () => {
  return (
    <div className="w-screen h-screen bg-richblack-900 flex flex-col">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Mainpage></Mainpage>}></Route>
  
        <Route path="/signup" element={<Signup></Signup>} ></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>} ></Route>
        <Route path="/students" element={<Users />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/contests" element={<Contests />} />
        <Route path="/problemset" element={<ProblemsPage></ProblemsPage>}></Route>
        <Route path="/create" element={<CreateProblem></CreateProblem>}></Route>
        <Route path="/updateprob/:id" element={<UpdateProblem></UpdateProblem>}></Route>
        <Route path="/delete" element={<DeleteProblem></DeleteProblem>}></Route>
        <Route path="/editproblem" element={<ProblempageAdmin></ProblempageAdmin>}></Route>
        <Route path="/singleprob/:id" element={<Singleproblem></Singleproblem>}></Route>
        <Route path="/reset-password" element={<ResetForm></ResetForm>}></Route>
        <Route path="/about"  element={<About></About>}></Route>
      </Routes>
    </div>
  );
};

export default App;
