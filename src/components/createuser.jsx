import React, { useState } from 'react';

const CreateUser = ({ onSubmit, setCreateUserVisible, recievingUsers, setRecievingUsers}) => {
  const [userName, setUserName] = useState('');

  const handleInputChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = async () => {
    try{
        const newUser = document.querySelector(`#username`).value
        const response = await fetch('http://localhost:5000/api/users', {
            method: 'POST',
            body: JSON.stringify({
                name: newUser
            }), headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
          });
          if(response.ok) {
            let resData = await response.json();
            //when the line below was added functionality did not change
            setRecievingUsers([...recievingUsers, resData]);
            console.log('todo was added', resData); 
          } else {
            console.log('failed to add todo')
          }
        }catch(error) {
          console.log(error.stack)
        }
    // Clear the input field after submitting
    setUserName('');
    setCreateUserVisible(false)
  };

  return (
    <div>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={userName}
        onChange={handleInputChange}
        placeholder="Enter username"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateUser;
