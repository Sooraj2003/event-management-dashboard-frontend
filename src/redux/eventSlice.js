// src/redux/eventSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { apiFetch } from "../utils/apiFetch";  // Utility function for API calls

// Initial state
const initialState = {
  events: [],
  loading: false,
  error: null,
};

// Create slice for events
const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
      state.loading = false;
    },
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action) => {
      const updatedEvents = state.events.map((event) =>
        event.id === action.payload.id ? action.payload : event
      );
      state.events = updatedEvents;
    },
    deleteEventFromState: (state, action) => {
      state.events = state.events.filter((event) => event._id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Thunks for API calls
export const fetchEvents = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const data = await apiFetch("events");
    dispatch(setEvents(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const createEvent = (event) => async (dispatch) => {
  try {
    const newEvent = await apiFetch("events", {
      method: "POST",
      body: JSON.stringify(event),
    });
    dispatch(addEvent(newEvent));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const editEvent = (eventId, eventData) => async (dispatch) => {
  try {
    const updatedEvent = await apiFetch(`events/${eventId}`, {
      method: "PUT",
      body: JSON.stringify(eventData),
    });
    dispatch(updateEvent(updatedEvent));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const deleteEvent = (eventId) => async (dispatch) => {
  try {
    // Make the API call to delete the event from the database
    await apiFetch(`events/${eventId}`, { method: 'DELETE' });
    
    // Once it's deleted, remove the event from the Redux state
    dispatch(deleteEventFromState(eventId));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Export actions and reducer
export const { setLoading, setEvents, addEvent, updateEvent,deleteEventFromState, setError } = eventSlice.actions;
export default eventSlice.reducer;
