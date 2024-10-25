// Welcome.js
import React from 'react';
import { useSelector } from 'react-redux';

const Welcome = () => {
    const user = useSelector(state => state.auth.user);
    return <h1>Welcome, {user.username}!</h1>;
};

export default Welcome;