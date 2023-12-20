import React from 'react';
import EditTaskButton from './editbtn'; // Make sure to adjust the import path based on your project structure
import DeleteButton from './deletebtn'; // Make sure to adjust the import path based on your project structure

const TaskList = ({ selectedDate, singleUserTasks, setShowCalendar, setTaskListVisible, setCreateTask, singleUser, setLoading }) => {
    const handleDelete = (taskId) => {
      // Add your logic to delete the task with taskId
      console.log(`Deleting task with ID: ${taskId}`);
    };
  
    const handleEdit = (taskId, updatedTask) => {
      // Add your logic to update the task with taskId
      console.log(`Editing task with ID: ${taskId}`, updatedTask);
    };
  
    return (
      <div>
        <button style={{marginTop: '2rem', marginLeft: '2rem', borderRadius: '10px', fontSize: '24px'}} onClick={() => [setTaskListVisible(false), setCreateTask(true)] }>Create Task</button>
        <h2 style={{margin: '1.5rem'}}>Tasks for {singleUser.name}</h2>
        <ul className='taskgroup'>
          {singleUserTasks.map((task) => (
            <li className='atask' key={task.id}>
              <p>Name: {task.name}</p>
              <p>Due Date: {task.due_date}</p>
              <p>Start Date: {task.start_date}</p>
              <p>Description: {task.description}</p>
              <div className='buttongroup'>
                <EditTaskButton taskId={task.id} onEdit={handleEdit} />
                <DeleteButton taskId={task.id} onDelete={handleDelete} />
            </div> 
            </li>
          ))}
        </ul>
        <button className='backbutton' onClick={() => [setShowCalendar(true), setTaskListVisible(false)]} style={{marginLeft: '2rem', borderRadius: '8px', fontSize: '24px'}}>Go Back to Calendar</button>
      </div>
    );
  };
  
  export default TaskList;