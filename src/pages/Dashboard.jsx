import { jwtDecode } from "jwt-decode";
import React from "react";
import { useSelector } from "react-redux";
import StudentDash from "../components/StudentDash";
import AdminDash from "../components/AdminDash";

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);
  console.log("dashboard wala token:-->",token);
  const payload = jwtDecode(token);
  console.log("payload:-->",payload);
  const accountType = payload.accountType;
  return (
    <div>
      <div>
        {accountType === "Student" ? (
          <StudentDash></StudentDash>
        ) : (
          <AdminDash></AdminDash>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
