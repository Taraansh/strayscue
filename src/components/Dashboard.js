import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
    const { user, logoutUser } = useContext(AuthContext);

    return (user ? (
        <div>
            <p>You are logged in to the Dashboard!</p>
            <button onClick={logoutUser}>Logout</button>
        </div>
        ):(
        <div>
            <p>You are not logged in, redirecting...</p>
        </div>
        )
    )
}

export default Dashboard