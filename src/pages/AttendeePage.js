import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttendees, createAttendee, deleteAttendee } from '../redux/attendeeSlice';
import { fetchEvents } from '../redux/eventSlice'; // Fetch events for assignment

const AttendeePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { attendees } = useSelector((state) => state.attendees);
  const { events } = useSelector((state) => state.events);

  const [newAttendee, setNewAttendee] = useState('');
  const [selectedEventName, setSelectedEventName] = useState(''); // Track selected event name

  // Fetch attendees and events on mount
  useEffect(() => {
    dispatch(fetchAttendees());
    dispatch(fetchEvents());
  }, [dispatch]);

  // Add attendee with event assignment
  const handleAddAttendee = () => {
    if (newAttendee.trim() && selectedEventName) {
      // Find the selected event by its name and get the eventId
      const selectedEvent = events.find(event => event.name === selectedEventName);
      if (selectedEvent) {
        dispatch(createAttendee({ name: newAttendee, eventId: selectedEvent._id }));
        setNewAttendee('');
        setSelectedEventName('');
      } else {
        alert('Selected event not found.');
      }
    } else {
      alert('Please provide both attendee name and select an event.');
    }
  };

  // Delete attendee
  const handleDeleteAttendee = (id) => {
    dispatch(deleteAttendee(id));
  };

  // Navigate to event details
  const handleNavigateToEvent = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Attendee Management</h1>

      {/* Add New Attendee with Event Selection */}
      <div className="mb-4">
        <input
          type="text"
          value={newAttendee}
          onChange={(e) => setNewAttendee(e.target.value)}
          placeholder="Add New Attendee"
          className="border p-2 rounded mb-2 w-full md:w-1/2"
        />
        <select
          value={selectedEventName}
          onChange={(e) => setSelectedEventName(e.target.value)}
          className="border p-2 rounded mb-2 w-full md:w-1/2"
        >
          <option value="">Select Event</option>
          {events.map((event) => (
            <option key={event._id} value={event.name}>
              {event.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddAttendee}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Attendee
        </button>
      </div>

      {/* Attendee List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Attendee List</h2>
        <ul>
          {attendees.map((attendee) => {
            const event = events.find((event) => event._id === attendee.eventId); // Find matching event by eventId
            return (
              <li
                key={attendee._id}
                className="flex items-center justify-between mb-2 p-2 border rounded-md shadow-md"
              >
                <div>
                  <strong>{attendee.name}</strong> - Event:{' '}
                  {event ? event.name : 'Event Not Found'}
                </div>
                <div>
                  <button
                    onClick={() => handleDeleteAttendee(attendee._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleNavigateToEvent(attendee.eventId)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Go to Event
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AttendeePage;
