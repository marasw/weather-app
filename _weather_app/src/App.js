// App.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './Login';
import Welcome from './Welcome';

const App = () => {
    const user = useSelector(state => state.auth.user);
    const status = useSelector(state => state.auth.status);
    return (
        <div>
            {status === 'pending' && <p>Logging in…</p>}
            {!user && <Login />}
            {user && <Welcome />}
        </div>
    );
};

export default App;