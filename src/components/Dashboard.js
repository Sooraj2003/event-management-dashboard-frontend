import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>
      
      {/* Dashboard Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        

        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all">
          <h2 className="text-xl font-semibold mb-2">Events</h2>
          <p className="text-gray-600 mb-4">View and manage events in your app.</p>
          <Link
            to="/events"
            className="inline-block bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-all"
          >
            Go to Events
          </Link>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all">
          <h2 className="text-xl font-semibold mb-2">Attendees</h2>
          <p className="text-gray-600 mb-4">Manage Attendees.</p>
          <Link
            to="/attendees"
            className="inline-block bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition-all"
          >
            Go to Attendees
          </Link>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all">
          <h2 className="text-xl font-semibold mb-2">Task Tracker</h2>
          <p className="text-gray-600 mb-4">Manage your tasks and track progress for each event.</p>
          <Link
            to="/tasks"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all"
          >
            Go to Task Tracker
          </Link>
        </div>
        

        {/* Add more links as needed */}
      </div>
    </div>
  );
};

export default Dashboard;
