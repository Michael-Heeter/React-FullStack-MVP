// taskslist.jsx
import React from 'react';

const TaskList = ({ selectedDate, singleUserTasks, setShowCalendar }) => {
  return (
    <div>
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
    </div>
  );
};

export default TaskList;
