import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LogoutButton from './Logout';
function HomePage() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get the JWT token from local storage
                const token = localStorage.getItem('token');
                if (!token) {
                    // Handle case where token is missing or expired
                    console.error("Token not found");
                    return;
                }

                // Make a request to the server with the token to get user-specific data
                const response = await axios.get("http://localhost:5162/api/Users/Profile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data: ", error);
            }
        };

        fetchData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <LogoutButton />
            <h1>Welcome, {userData.username}!</h1>
            {/* Display user-specific data here */}
            <div>
                <h2>Your Data:</h2>
                {/* This will depend on the structure of your user data */}
                <p>{JSON.stringify(userData)}</p>
            </div>
        </div>
    );
}

export default HomePage;
