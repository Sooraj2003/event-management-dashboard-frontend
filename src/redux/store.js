import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './eventSlice';
import attendeeReducer from './attendeeSlice';
import taskReducer from './taskSlice';

const store = configureStore({
  reducer: {
    events: eventReducer,
    attendees: attendeeReducer,
    tasks: taskReducer,
  },
});

export default store;
