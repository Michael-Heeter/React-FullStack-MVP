// Inside TopMain.jsx
import React from 'react';
import TopUsers from './topusers.jsx';

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
            {isUserVisible && <TopUsers handleItemClick={handleItemClick} />}
        </div>
    );
};

export default TopMain;
