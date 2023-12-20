import React from 'react';

const TasksOfTheDay = ({ selectedDayTasks }) => {
  return (
    <div>
      <h3>Tasks for the Day</h3>
      {selectedDayTasks.map((task) => (
        <div key={task.id}>
          <p>ID: {task.id}</p>
          <p>Name: {task.name}</p>
          <p>Description: {task.description}</p>
          {/* Add other properties you want to display */}
        </div>
      ))}
    </div>
  );
};

export default TasksOfTheDay;