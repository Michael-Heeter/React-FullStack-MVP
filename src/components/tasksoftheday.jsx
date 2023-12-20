const TasksOfTheDay = (props) => {
    const singleUserTasks = props.singleUserTasks;
  
    return (
      <div>
        {singleUserTasks.map((task) => {
          // Assuming that task.due_date is a string timestamp in the format '2023-12-25T04:59:00.000Z'
          const dueDate = new Date(task.due_date);
          const formattedDate = dueDate.toISOString().split('T')[0];
  
          return (
            <div key={task.id}>
              <p>Name: {task.name}</p>
              <p>Due Date: {formattedDate}</p>
            </div>
          );
        })}
      </div>
    );
  };
  
  export default TasksOfTheDay;