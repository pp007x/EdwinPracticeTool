import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import styles from '../Css/LoginForm.module.css';  // import your CSS file as a module
import logo from '../images/HigtechLogo.png';
import config from '../config';

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
      const response = await axios.post(`${config.API_BASE_URL}/api/Authentication/Login`, data);
    
      // Save the JWT token to local storage
      localStorage.setItem('token', response.data);
    
      // Decode the token
      const decodedToken = jwtDecode(response.data);
      
      // Get the role and the user ID from the token
      const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']; 
    
      // Fetch the user's company
      const companyResponse = await axios.get(`${config.API_BASE_URL}/api/Companies/current`, {
        headers: {
          'Authorization': `Bearer ${response.data}`
        }
      });
      
      const companyType = companyResponse.data.companyType;
      console.log(companyType)
      // Check user's scores
      try {
        const totalScoreResponse = await axios.get(`${config.API_BASE_URL}/api/TotalScores/user/me`, {
          headers: {
            'Authorization': `Bearer ${response.data}`
          }
        });
        
        const totalScore = totalScoreResponse.data;
    
        // If user's scores are null, navigate to /reactionform or /openreactionform based on CompanyType
        if (!totalScore || totalScore === null) {
          navigate(companyType === 1 ? '/reactionform' : '/openreactionform');
        } else {
          // Navigate to the correct page based on the role and CompanyType
          if (userRole === 'Admin') {
            navigate('/admin');
          } else {
            navigate(companyType === 1 ? '/dashboard' : '/opendashboard');
          }
        }
    
      } catch (error) {
        navigate(companyType === 1 ? '/infoReactionForm' : '/reactionformOpen');
      }
    
    } catch (error) {
      setLoginError("Invalid username or password.");
    }
  }    

  return (
    <div className={styles.loginFormWrapper}>
      <div className={styles.inputBox}>
        <img src={logo} alt="Logo" className={styles.logo} /> 
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Username:</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className={styles.input} />
          <label className={styles.label}>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className={styles.input} />
          {loginError && <div className={styles.error}>{loginError}</div>}
          <button type="submit" className={styles.loginButton}>Login</button>
        </form>
        <button className={styles.registerButton} onClick={() => navigate('/register')}>Register</button>
        <button className={styles.resetPasswordButton} onClick={() => navigate('/resetpassword')}>Forgot Password?</button>
      </div>
    </div>
  );
}

export default LoginForm;
