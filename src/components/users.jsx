import React from 'react';


const Users = (props) => {

    const handleUserClick = (user) => {
        props.setSingleUser(user);
        props.setSingleUserTasks(user); // Adjust this line based on your requirements
        props.setAllUserClicked(true);
        props.getSingleUserTasks(user.id)
        props.setShowCalendar(true)
        console.log(props.getSingleUserTasks)
      };

  return (
    <div id="userlist">
      {props.recievingUsers.map((user) => (
        <div key={user.id} onClick={() => handleUserClick(user)}>
          {/* Render user data */}
          <p>User {user.id}: {user.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Users;
