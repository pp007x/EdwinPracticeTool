import React, { useState } from "react";
import axios from "axios";

function AddCompany() {
  const [company, setCompany] = useState({
    name: "",
    description: "",
    logo: null,
    code: Math.random().toString(36).substr(2, 10)
  });

  const handleInputChange = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setCompany({
      ...company,
      logo: e.target.files[0]
    });
  };

  const handleNewCompanySubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', company.name);
    formData.append('description', company.description);
    formData.append('code', company.code);

    if (company.logo) {
      formData.append('logo', company.logo, company.logo.name);
    }

    const token = localStorage.getItem('token');
    await axios.post("http://localhost:5162/api/Companies", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  return (
    <div>
      <h1>Add New Company</h1>
      <form onSubmit={handleNewCompanySubmit}>
        <label>
          Name:
          <input type="text" name="name" value={company.name} onChange={handleInputChange} required />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={company.description} onChange={handleInputChange} />
        </label>
        <label>
          Logo:
          <input type="file" name="logo" onChange={handleFileChange} />
        </label>
        <button type="submit">Add Company</button>
      </form>
    </div>
  );
}

export default AddCompany;
