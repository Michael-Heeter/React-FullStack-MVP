import React from 'react';
import DeleteButton from './deletebtn'; // Make sure to adjust the import path based on your project structure

const TaskList = ({ selectedDate, singleUserTasks, setShowCalendar, setTaskListVisible, setCreateTask }) => {
  const handleDelete = (taskId) => {
    // Add your logic to delete the task with taskId
    // For example, you can use an API call to delete the task
    console.log(`Deleting task with ID: ${taskId}`);
  };

  return (
    <div>
      <button onClick={() => [setTaskListVisible(false), setCreateTask(true)]}>Create Task</button>
      <h2>Tasks for {selectedDate}</h2>
      <ul>
        {singleUserTasks.map((task) => (
          <li key={task.id}>
            <p>Name: {task.name}</p>
            <p>Due Date: {task.due_date}</p>
            {/* Add other task properties as needed */}
            <DeleteButton taskId={task.id} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
      <button onClick={() => [setShowCalendar(true), setTaskListVisible(false)]}>Go Back to Calendar</button>
    </div>
  );
};

export default TaskList;