import React, { useState } from 'react';
import TopUsers from './topusers.jsx';
import CreateUser from './createuser.jsx';

const TopMain = ({ isUserVisible, setIsUserVisible, setAllUserClicked, setShowCalendar, setTaskListVisible}) => {
  const [isCreateUserVisible, setCreateUserVisible] = useState(false);

  const handleItemClick = (e) => {
    console.log(e.currentTarget.id);
    setIsUserVisible(false); // Hide Users when an item in the list is clicked

    if (e.currentTarget.id === "viewusers") {
      setAllUserClicked(true);
    }

    if (e.currentTarget.id === "createuser") {
      // Show the create user form
      setCreateUserVisible(true);
    }
  };

  const toMainPage = () => {
    setIsUserVisible(true);
    setAllUserClicked(false);
    setShowCalendar(false)
    setTaskListVisible(false)
    setCreateUserVisible(false);
  };

  return (
    <div id="topmain">
      <ul>
        <li id="tomainmenu" onClick={toMainPage}>
          TaskEZ
        </li>

      </ul>

      {isUserVisible && <TopUsers handleItemClick={handleItemClick} />}

      {/* Render the CreateUser component based on visibility state */}
      {isCreateUserVisible && (
        <CreateUser
          setCreateUserVisible={setCreateUserVisible}
          // Add any other props you need to pass to CreateUser
        />
      )}
    </div>
  );
};

export default TopMain;
