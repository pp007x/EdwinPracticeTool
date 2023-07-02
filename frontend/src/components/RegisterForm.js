import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
// import styles from '../Css/LoginForm.module.css';  // Ensure that your CSS module file name matches this import

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();


  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const registrationResponse = await axios.post("https://edwindemo.azurewebsites.net/api/Authentication/Register", {
        username,
        password,
        companyId: parseInt(companyCode)  // Ensure this value is integer
      });
  
      localStorage.setItem('token', registrationResponse.data);
  
      await handleLogin(); // Wait for the registration process to complete before proceeding with login
  
    } catch (error) {
      setRegisterError("Registration failed.");
    }
  };
  
  const handleLogin = async () => {
    const data = {
      username: username,
      password: password
    };

    try {
      const loginResponse = await axios.post("https://edwindemo.azurewebsites.net/api/Authentication/Login", data);

      localStorage.setItem('token', loginResponse.data);

      const decodedToken = jwtDecode(loginResponse.data);
      const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      if (userRole === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/reactionform');
      }

    } catch (error) {
      setRegisterError("Automatic login failed.");
    }
  };

  const handleReturnClick = () => {
    navigate('/login');
  };

  return (
    <div className="loginFormWrapper">
    <div className="inputBox">
      <button className="returnButton" onClick={handleReturnClick}>BackOff</button>
      <form onSubmit={handleRegisterSubmit} className="form">
        <label className="label">Username:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="input" />
        <label className="label">Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="input" />
        <label className="label">Company Code:</label>
        <input type="text" value={companyCode} onChange={e => setCompanyCode(e.target.value)} placeholder="Company Code" className="input" />
        {registerError && <div className="error">{registerError}</div>}
        <button type="submit" className="loginButton">Register</button>
      </form>
    </div>
    </div>
  );
}

export default RegisterForm;
