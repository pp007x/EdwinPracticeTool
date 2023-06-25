import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminPortal() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: ""
  });

  useEffect(() => {
    // Fetch all users and their results
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:5162/api/Users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  const handleNewUserSubmit = async (e) => {
    e.preventDefault();

    // Post new user data to server
    const token = localStorage.getItem('token');
    await axios.post("http://localhost:5162/api/Users", newUser, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Refresh the user list
    const response = await axios.get("http://localhost:5162/api/Users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setUsers(response.data);
  };

  return (
    <div>
      <h1>Admin Portal</h1>
      
      <h2>Users and their results</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username}: {user.result}
          </li>
        ))}
      </ul>
      
      <h2>Create New User</h2>
      <form onSubmit={handleNewUserSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={newUser.username} onChange={handleInputChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={newUser.password} onChange={handleInputChange} />
        </label>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default AdminPortal;
