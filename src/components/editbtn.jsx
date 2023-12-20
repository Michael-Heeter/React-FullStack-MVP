import React, { useState } from 'react';

const EditTaskButton = ({ taskId, onEdit, setTaskListVisible, setShowCalendar }) => {
    const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedDueDate, setEditedDueDate] = useState('');
  const [editedStartDate, setEditedStartDate] = useState('')
  const [editedDescription, setEditedDescription] = useState('')

  const handleEdit = () => {
    setEditMode(true);
  };

  
  const handleSave = async () => {
    try {
        const response = await fetch(`http://localhost:5000/api/task/${taskId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            name: editedName,
            due_date: editedDueDate,
            start_date: editedStartDate,
            description: editedDescription
        }), headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    });  
        if (response.ok) {
            setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === taskId ? { ...task, name: editedName, due_date: editedDueDate, start_date: editedStartDate, description: editedDescription } : task
            )
          );
        } else {
          console.error(`Failed to edit task with ID ${taskId}`);
        }
      } catch (err) {
        console.error(err);
      }

    onEdit(taskId, { name: editedName, due_date: editedDueDate, start_date: editedStartDate, description: editedDescription });
    setEditMode(false);
    setShowCalendar(true)
    setTaskListVisible(false)
  };

  return (
    <div>
      {editMode ? (
        <div>
          <input
            type="text"
            placeholder="Name"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Due Date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Start Date"
            value={editedStartDate}
            onChange={(e) => setEditedStartDate(e.target.value)}
        />
        <input
            type="text"
            placeholder="description"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <button className="taskbtns" onClick={handleEdit} style={{ color: 'white', marginLeft: '0.8rem', borderRadius: '8px', backgroundColor: 'blue'}}>
          Edit
        </button>
      )}
    </div>
  );
};

export default EditTaskButton;
