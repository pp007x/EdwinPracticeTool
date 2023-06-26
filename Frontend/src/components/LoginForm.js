import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import '../Css/LoginForm.css';  // import your CSS file
import logo from '../images/HigtechLogo.png';

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password
    };

    try {
      const response = await axios.post("http://localhost:5162/api/Authentication/Login", data);
      
      // Save the JWT token to local storage
      localStorage.setItem('token', response.data);

      // Get the role from the token
      const decodedToken = jwtDecode(response.data);
      const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      // Navigate to the correct page based on the role
      if (userRole === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }

    } catch (error) {
      setLoginError("Invalid username or password.");
    }
  };

  return (
    <div className="inputBox">
      <img src={logo} alt="Logo" className="logo" /> {/* Add the logo */}
      <form onSubmit={handleSubmit}>
        <label className="label">Username:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
        <label className="label">Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        {loginError && <div className="error">{loginError}</div>}
        <button type="submit" className="loginButton">Login</button>
      </form>
      <button className="loginButton" onClick={() => navigate('/register')}>Register</button>

    </div>
  );
}

export default LoginForm;
