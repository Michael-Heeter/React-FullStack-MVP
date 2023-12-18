import React from 'react';

const Users = ({ handleItemClick }) => {
    return (
        <ul id="topright">
            <li id="viewusers" onClick={handleItemClick}>Users</li>
            <li id="createuser" onClick={handleItemClick}>Get Started</li>
        </ul>
    );
};

export default Users;