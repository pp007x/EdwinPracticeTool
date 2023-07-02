import React, { useState } from "react";
import axios from "axios";
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import styles from '../../Css/AddCompany.module.css';

function AddCompany() {
  const [company, setCompany] = useState({
    name: "",
    description: "",
    code: Math.random().toString(36).substr(2, 10)
  });

  const [isCompanyAdded, setIsCompanyAdded] = useState(false); // New state variable

  const handleInputChange = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value
    });
  };


  const handleNewCompanySubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', company.name);
    formData.append('description', company.description);
    formData.append('code', company.code);
  
    try {
      const token = localStorage.getItem('token');
      await axios.post("http://localhost:5162/api/Companies", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setIsCompanyAdded(true); // Set the company added state to true
      setCompany({ // Clear the form inputs
        name: "",
        description: "",
        code: Math.random().toString(36).substr(2, 10)
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
          <h1>Add New Company</h1>
          {isCompanyAdded && <p>Company added successfully!</p>} {/* Display message when company is added */}
          <form onSubmit={handleNewCompanySubmit}>
            <label>
              Name:
              <input type="text" name="name" value={company.name} onChange={handleInputChange} required />
            </label>
            <label>
              Description:
              <input type="text" name="description" value={company.description} onChange={handleInputChange} />
            </label>
            <button type="submit">Add Company</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCompany;
