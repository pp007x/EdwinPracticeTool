import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import styles from '../../Css/CreateUser.module.css';

function CreateUser() {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    isAdmin: false,
    companyId: ""
  });

  const [companies, setCompanies] = useState([]);
  const [isUserAdded, setIsUserAdded] = useState(false); // New state variable

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:5162/api/Companies", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCompanies(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("error: " + error);
      }
    };

    fetchCompanies();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setNewUser({
      ...newUser,
      [e.target.name]: value
    });
  };

  const handleNewUserSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.post("http://localhost:5162/api/Users", newUser, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsUserAdded(true); // Set the user added state to true
      setNewUser({ // Clear the form inputs
        username: "",
        password: "",
        isAdmin: false,
        companyId: ""
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <AdminSidebar />
        </div>
        <div className={styles.content}>
          <h1>Create New User</h1>
          {isUserAdded && <p>User added successfully!</p>} {/* Display message when user is added */}
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
              <input type="checkbox" name="isAdmin" checked={newUser.isAdmin} onChange={handleInputChange} />
            </label>
            <label>
              Company:
              <select name="companyId" value={newUser.companyId} onChange={handleInputChange}>
                <option value="">Select company</option>
                {companies && Array.isArray(companies) && companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Create User</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateUser;
