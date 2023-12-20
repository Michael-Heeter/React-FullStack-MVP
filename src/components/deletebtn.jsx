import React from 'react';

const DeleteButton = ({ taskId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/task/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Task with ID ${taskId} deleted successfully`);
      } else {
        console.error(`Failed to delete task with ID ${taskId}`);
      }
    } catch (err) {
      console.error(err);
    }

    onDelete(taskId);
  };

  return (
    <button onClick={handleDelete} style={{ color: 'red' }}>
      Delete
    </button>
  );
};

export default DeleteButton;
