import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setEvents } from '../redux/eventSlice';
import { apiFetch } from '../utils/apiFetch';

const EventForm = ({ editingEvent, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (editingEvent) {
      setName(editingEvent.name);
      setDescription(editingEvent.description);
      setLocation(editingEvent.location);
      setDate(editingEvent.date);
    } else {
      // Reset form when adding a new event
      setName('');
      setDescription('');
      setLocation('');
      setDate('');
    }
  }, [editingEvent]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      name,
      description,
      location,
      date,
    };

    try {
      let data;
      if (editingEvent) {
        // Update existing event
        data = await apiFetch(`/api/events/${editingEvent.id}`, {
          method: 'PUT',
          body: JSON.stringify(eventData),
        });
      } else {
        // Add new event
        data = await apiFetch('/api/events', {
          method: 'POST',
          body: JSON.stringify(eventData),
        });
      }

      // Update the event list in the Redux store
      const events = await apiFetch('/api/events');
      dispatch(setEvents(events));

      // Reset the form and close the editor
      onCancel();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <form className="event-form space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event Name"
        className="input-field"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Event Description"
        className="input-field"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Event Location"
        className="input-field"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <input
        type="date"
        className="input-field"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <div className="flex space-x-4">
        <button type="submit" className="btn btn-primary">
          {editingEvent ? 'Update Event' : 'Add Event'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EventForm;
