// src/pages/EventManagementPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, createEvent, deleteEvent } from '../redux/eventSlice';

const EventManagementPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events } = useSelector((state) => state.events);

  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
  });

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleAddEvent = () => {
    if (newEvent.name && newEvent.description && newEvent.location && newEvent.date) {
      dispatch(createEvent(newEvent));
      setNewEvent({ name: '', description: '', location: '', date: '' });
    }
  };

  const handleDeleteEvent = (id) => {
    dispatch(deleteEvent(id));
  };

  const handleNavigateToEvent = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Event Management</h1>
      
      {/* Add Event Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            placeholder="Event Name"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            placeholder="Description"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={newEvent.location}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            placeholder="Location"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={handleAddEvent}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Add Event
        </button>
      </div>

      {/* Event List */}
      <h2 className="text-2xl font-semibold mb-4">Event List</h2>
      <ul className="space-y-4">
        {events.map((event) => (
          <li
            key={event._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="space-y-1">
              <p className="text-lg font-medium text-gray-800">{event.name}</p>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-gray-600">
                📍 {event.location} | 📅 {event.date}
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button
                onClick={() => handleDeleteEvent(event._id)}
                className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition-all"
              >
                Delete
              </button>
              <button
                onClick={() => handleNavigateToEvent(event._id)}
                className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition-all"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventManagementPage;
