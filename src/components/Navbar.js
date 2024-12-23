// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/events" className="hover:text-blue-300">Events</Link>
        </li>
        <li>
          <Link to="/attendees" className="hover:text-blue-300">Attendees</Link>
        </li>
        <li>
          <Link to="/tasks" className="hover:text-blue-300">Tasks</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
