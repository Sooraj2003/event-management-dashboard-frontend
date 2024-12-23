import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true); // Show loading state

    try {
      // Send register request to the Node.js backend
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Registration successful!");
        setUsername("");
        setPassword("");
        setError("");
        navigate('/dashboard');
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.error || "Registration failed.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
      <form onSubmit={handleRegister} className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <div className="mb-4">
          <label htmlFor="username" className="block text-lg font-semibold mb-2">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-lg font-semibold mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {/* Login Prompt */}
      <p className="text-center mt-4 text-gray-600">
        Already a user?{" "}
        <span
          className="text-blue-500 hover:underline cursor-pointer"
          onClick={() => navigate('/login')}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;
