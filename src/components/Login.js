import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true); // Show loading state

    try {
      // Send login request to the backend
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode:'cors',
        body: JSON.stringify({ username, password }),
        credentials: "include", // Include cookies in the request
      });

      if (response.ok) {
        // Login successful
        alert("Login successful!");
        // Redirect to the dashboard after login
        navigate("/dashboard");
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.error || "Invalid username or password.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  // Handle navigation to the Register page
  const handleRegisterRedirect = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
      <form onSubmit={handleLogin} className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
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
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-4">
          Not yet registered?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={handleRegisterRedirect}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
