import React, { useState } from "react";
import axios from "axios";
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'; // import useNavigate
import styles from '../Css/LoginForm.module.css';
import config from '../config';

function ResetPasswordForm() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

    try {
      await axios.post(`${config.API_BASE_URL}/api/Users/ResetPassword`, {
        userId,
        resetToken: token,
        newPassword: password
      });

      setError("Password reset successfully!");
    } catch (error) {
      setError("An error occurred");
    }
  };

  return (
    <div className={styles.loginFormWrapper}>
      <div className={styles.inputBox}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Token:</label>
          <input type="text" value={token} onChange={e => setToken(e.target.value)} className={styles.input} />

          <label className={styles.label}>New Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className={styles.input} />

          <label className={styles.label}>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className={styles.input} />

          <button type="submit" className={styles.loginButton}>Reset Password</button>
        </form>
        <button className={styles.loginButton} onClick={() => navigate('/login')}>Back to Login</button> {/* Add the back to login button */}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
}

export default ResetPasswordForm;
