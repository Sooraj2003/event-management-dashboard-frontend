// src/redux/attendeeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { apiFetch } from "../utils/apiFetch";  // Utility function for API calls

// Initial state
const initialState = {
  attendees: [],
  loading: false,
  error: null,
};

// Create slice for attendees
const attendeeSlice = createSlice({
  name: "attendees",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setAttendees: (state, action) => {
      state.attendees = action.payload;
      state.loading = false;
    },
    addAttendee: (state, action) => {
      state.attendees.push(action.payload);
    },
    removeAttendee: (state, action) => {
      state.attendees = state.attendees.filter(
        (attendee) => attendee._id !== action.payload
      );
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Thunks for API calls
export const fetchAttendees = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const data = await apiFetch("attendees");
    dispatch(setAttendees(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const createAttendee = (attendeeData) => async (dispatch) => {
  try {
    const data = await apiFetch("attendees", {
      method: "POST",
      body: JSON.stringify(attendeeData),
    });
    dispatch(addAttendee(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const deleteAttendee = (attendeeId) => async (dispatch) => {
  try {
    await apiFetch(`attendees/${attendeeId}`, { method: "DELETE" });
    dispatch(removeAttendee(attendeeId));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Export the actions and reducer
export const { setLoading, setAttendees, addAttendee, removeAttendee, setError } = attendeeSlice.actions;
export default attendeeSlice.reducer;
