import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    return (user ? (
        <div>
            <p>You are logged in to the Dashboard!</p>
        </div>
        ):(
        <div>
            <p>You are not logged in, redirecting...</p>
        </div>
        )
    )
}

export default Dashboard