import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
// import styles from '../Css/LoginForm.module.css';  // import your CSS file as a module
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
  
      // Check user's scores
      try {
        const totalScoreResponse = await axios.get("http://localhost:5162/api/TotalScores/user", {
          headers: {
            'Authorization': `Bearer ${response.data}`
          }
        });
  
        const totalScore = totalScoreResponse.data;
  
        // If user's scores are null, navigate to /reactionform
        if (!totalScore || totalScore === null) {
          navigate('/reactionform');
        } else {
          // Navigate to the correct page based on the role
          if (userRole === 'Admin') {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        }
  
      } catch (error) {
        console.error("Failed to get user's scores.", error);
      }
  
    } catch (error) {
      setLoginError("Invalid username or password.");
    }
  };
  

  return (
    <div className="loginFormWrapper">
    <div className="inputBox">
      <img src={logo} alt="Logo" className={logo} /> {/* Add the logo */}
      <form onSubmit={handleSubmit} className="form">
        <label className="label">Username:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="input" />
        <label className="label">Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="input" />
        {loginError && <div className="error">{loginError}</div>}
        <button type="submit" className="loginButton">Login</button>
      </form>
      <button className="registerButton" onClick={() => navigate('/register')}>Register</button>
    </div>
    </div>
  );
}

export default LoginForm;
