import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import styles from '../../Css/AdminPortal.module.css';

function AdminPortal() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    isAdmin: false
  });

  useEffect(() => {
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

    const token = localStorage.getItem('token');
    await axios.post("http://localhost:5162/api/Users", newUser, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const response = await axios.get("http://localhost:5162/api/Users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setUsers(response.data);
  };

  return (
    <>
      <AdminHeader />
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <AdminSidebar />
        </div>
        <div className={styles.content}>
          <h1>Admin Portal</h1>
          <h2>Users and their results</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.username}: {user.isAdmin ? "Admin" : "User"}
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
            <label>
              Is Admin:
              <input type="checkbox" name="isAdmin" checked={newUser.isAdmin} onChange={e => setNewUser({...newUser, isAdmin: e.target.checked})} />
            </label>
            <button type="submit">Create User</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminPortal;
