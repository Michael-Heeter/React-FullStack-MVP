import React from 'react';
// import CreateTaskButton from './createtaskbutton'; // Import your CreateTaskButton component

const TaskList = ({ selectedDate, singleUserTasks, setShowCalendar, setTaskListVisible, setCreateTask }) => {
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
          </li>
        ))}
      </ul>
      <button onClick={() => [setShowCalendar(true), setTaskListVisible(false)]}>Go Back to Calendar</button>
    </div>
  );
};

export default TaskList;