// src/redux/taskSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { apiFetch } from "../utils/apiFetch"; // Utility function for API calls

// Initial state
const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

// Create slice for tasks
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateStatus: (state, action) => {
      const updatedTasks = state.tasks.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
      state.tasks = updatedTasks;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Thunks for API calls

// Fetch all tasks for an event
export const fetchTasks = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const data = await apiFetch("tasks");
    dispatch(setTasks(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Update task status
export const updateTaskStatus = (taskId, status) => async (dispatch) => {
  try {
    const updatedTask = await apiFetch(`tasks/${taskId}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
    dispatch(updateStatus(updatedTask));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Create a new task and assign it to an event
export const createTask = (taskData) => async (dispatch) => {
  
  try {
    const newTask = await apiFetch("tasks", {
      method: "POST",
      body: JSON.stringify(taskData),
    });
    dispatch(addTask(newTask));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Export actions and reducer
export const { setLoading, setTasks, addTask, updateStatus, setError } = taskSlice.actions;
export default taskSlice.reducer;
