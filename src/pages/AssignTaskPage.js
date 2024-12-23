// src/pages/AssignTaskPage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiFetch } from "../utils/apiFetch"; // API utility function

const AssignTaskPage = ({ match }) => {
  const { attendeeId } = match.params;
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await apiFetch(`tasks?attendeeId=${attendeeId}`);
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [attendeeId]);

  const handleAssignTask = () => {
    if (selectedTask) {
      // Logic to assign attendee to the task
      console.log(`Assigned attendee ${attendeeId} to task ${selectedTask}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Assign Task to Attendee</h1>

      <div className="my-4">
        <h2 className="text-xl">Select a Task</h2>
        <select
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="">Select Task</option>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAssignTask}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Assign Task
        </button>
      </div>
    </div>
  );
};

export default AssignTaskPage;
