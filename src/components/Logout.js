import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await fetch("http://event-management-dashboard-backend.onrender.com/api/auth/logout", {
      method: "POST",
      credentials: "include", // Include cookies when making the request
    });

    if (response.ok) {
      alert("Logged out successfully");
   

    
      // Redirect or perform other actions after logout
      navigate("/login")
    }
  };

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-all"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
