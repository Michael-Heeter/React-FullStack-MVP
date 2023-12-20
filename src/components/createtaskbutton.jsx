import React from 'react';

const CreateTaskButton = ({ setCreateTask, singleUser, setTaskListVisible, singleUserTasks, setSingleUserTasks }) => {
  const handleCreateTask = async () => {
    const nameTask = document.getElementById('name').value;
    const descript = document.getElementById('description').value;
    const dueDate = document.getElementById('due_date').value;
    const startDate = document.getElementById('start_date').value;
    const useID = singleUser.id;

    try {
      const response = await fetch('http://localhost:5000/api/task', {
        method: 'POST',
        body: JSON.stringify({
          name: nameTask,
          description: descript,
          due_date: dueDate,
          start_date: startDate,
          user_id: useID,
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });

      if (response.ok) {
        let resData = await response.json();
        setSingleUserTasks([...singleUserTasks, resData]);
        console.log('Task was added:', resData);
      } else {
        console.log('Failed to add task');
      }
    } catch (error) {
      console.log(error.stack);
    }

    setCreateTask(false);
    setTaskListVisible(true);
  };

  return (
    <div>
      <input type="text" id="name" placeholder="name" />
      <input type="text" id="description" placeholder="description" />
      <input type="text" id="due_date" placeholder="Due Date" />
      <input type="text" id="start_date" placeholder="Start Date" />
      <button onClick={handleCreateTask}>Create Task</button>
    </div>
  );
};

export default CreateTaskButton;
