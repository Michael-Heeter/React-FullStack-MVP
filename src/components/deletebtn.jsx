import React from 'react';

const DeleteButton = ({ taskId, onDelete, setTaskListVisible }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/task/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, name: editedName, due_date: editedDueDate, /* ...other fields */ } : task
        )
      );
      } else {
        console.error(`Failed to delete task with ID ${taskId}`);
      }
    } catch (err) {
      console.error(err);
    }

    onDelete(taskId);
    setTaskListVisible(false)
    setTaskListVisible(true)
  };

  return (
    <button className='taskbtn' onClick={handleDelete} style={{ color: 'white', backgroundColor: 'red', borderRadius: '8px', marginLeft: '0.5rem' }}>
      Delete
    </button>
  );
};

export default DeleteButton;
