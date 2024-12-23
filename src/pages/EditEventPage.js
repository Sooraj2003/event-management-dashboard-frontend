import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEvents, editEvent } from '../redux/eventSlice';

const EditEventPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventId } = useParams();

  const { events, status } = useSelector((state) => state.events);
  const event = events?.find((e) => e._id === eventId);

  const [updatedEvent, setUpdatedEvent] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEvents());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (event) {
      setUpdatedEvent({
        name: event.name || '',
        description: event.description || '',
        location: event.location || '',
        date: event.date || '',
      });
    }
  }, [event]);

  // Redirect if event is not found after events are fetched
  useEffect(() => {
    if (status === 'succeeded' && !event) {
      navigate('/events');
    }
  }, [event, status, navigate]);

  if (status === 'loading') {
    return <div className="text-center py-10 text-xl font-semibold">Loading...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editEvent(eventId, updatedEvent));
    navigate('/events');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Event</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Event Name</label>
            <input
              type="text"
              name="name"
              value={updatedEvent.name}
              onChange={handleInputChange}
              placeholder="Event Name"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={updatedEvent.description}
              onChange={handleInputChange}
              placeholder="Description"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={updatedEvent.location}
              onChange={handleInputChange}
              placeholder="Location"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={updatedEvent.date}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate('/events')}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Update Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventPage;
