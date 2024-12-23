// src/routes.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import EventManagementPage from "./pages/EventManagementPage";
import AttendeeManagementPage from "./pages/AttendeePage";
import TaskTrackerPage from "./pages/TaskTrackerPage";
import EditEventPage from "./pages/EditEventPage";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from './components/Login';
import Logout from "./components/Logout"; // Import the Logout component
import { isAuthenticated } from "./utils/auth"; // Import the authentication check

const RoutesComponent = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

const MainLayout = () => {
  const location = useLocation();
  
  // Determine if the current route is either Login or Register
  const hideLogout = ["/login", "/"].includes(location.pathname);

  return (
    <>
      {/* Conditionally render the Logout component */}
      {!hideLogout && <Logout />}

      <Routes>
        {/* Unprotected Routes */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route 
          path="/events" 
          element={isAuthenticated() ? <EventManagementPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/events/:eventId" 
          element={isAuthenticated() ? <EditEventPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/attendees" 
          element={isAuthenticated() ? <AttendeeManagementPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/tasks" 
          element={isAuthenticated() ? <TaskTrackerPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/dashboard" 
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} 
        />
      </Routes>
    </>
  );
};

export default RoutesComponent;
