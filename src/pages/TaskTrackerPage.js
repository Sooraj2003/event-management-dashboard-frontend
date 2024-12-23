import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, createTask, updateTaskStatus } from "../redux/taskSlice";
import { fetchEvents } from "../redux/eventSlice";

const TaskTrackerPage = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const { events } = useSelector((state) => state.events);

  const [selectedEvent, setSelectedEvent] = useState("");
  const [newTask, setNewTask] = useState({
    name: "",
    status: "Pending",
  });

  // Fetch events on mount
  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchTasks());
  }, [dispatch]);

  // Fetch tasks when an event is selected
  useEffect(() => {
    const selectedEventId = events.find((event) => event.name === selectedEvent)?.id;
    if (selectedEventId) {
      dispatch(fetchTasks(selectedEventId));
    }
  }, [dispatch, selectedEvent, events]);

  // Toggle task status
  const handleStatusChange = (taskId, status) => {
    const newStatus = status === "Pending" ? "Completed" : "Pending";
    dispatch(updateTaskStatus(taskId, newStatus)); // Update status in the backend
  };

  // Add a new task
  const handleAddTask = () => {
    if (selectedEvent && newTask.name) {
      const newTaskObject = { ...newTask, eventName: selectedEvent };
      dispatch(createTask(newTaskObject)); // Add task to the backend (store)
      setNewTask({ name: "", status: "Pending" });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Task Tracker</h1>

      {/* Event Selector */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Select Event:</label>
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select an Event</option>
          {events.map((event) => (
            <option key={event._id} value={event.name}>
              {event.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add New Task Form */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Add New Task</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            placeholder="Task Name"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={handleAddTask}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      {tasks.length > 0 ? (
        <ul className="space-y-2">
          {tasks.map((task) => {
            const eventName = events.find((event) => event.name === task.eventName)?.name || 'Unknown Event';
            return (
              <li
                key={task._id}
                className="flex items-center justify-between p-2 border rounded-md shadow-md"
              >
                <div>
                  <p className="text-lg font-medium">{task.name}</p>
                  <p className="text-sm text-gray-500">Event: {eventName}</p>
                </div>
                <button
                  onClick={() => handleStatusChange(task._id, task.status)}
                  className={`px-4 py-2 rounded-md text-white ${
                    task.status === "Completed"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
                >
                  {task.status}
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="text-gray-500">No tasks available for this event.</div>
      )}
    </div>
  );
};

export default TaskTrackerPage;
