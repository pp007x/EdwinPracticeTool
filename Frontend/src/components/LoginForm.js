import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        {loginError && <div>{loginError}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
