// src/utils/apiFetch.js
export const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`https://event-management-dashboard-backend.onrender.com/api/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
    credentials: 'include', // Ensure cookies are sent
  });
  
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    return response.json();
  };
  