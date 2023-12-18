// Inside TopMain.jsx
import React from 'react';
import Users from './users.jsx';

const TopMain = ({ isUserVisible, setIsUserVisible }) => {
    const handleItemClick = () => {
        setIsUserVisible(false); // Hide Users when an item in the list is clicked
    };

    const toMainPage = () => {
        setIsUserVisible(true);
    };

    return (
        <div id="topmain">
            <ul><li onClick={toMainPage}>TaskEZ</li></ul>
            {isUserVisible && <Users handleItemClick={handleItemClick} />}
        </div>
    );
};

export default TopMain;
