import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/HigtechLogo.png';
import '../Css/DashboardSidebar.module.css';

const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <hr />
        <div className="navigation">
          <Link
            to="/dashboard"
            className={`nav-button ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link
            to="/companydashboard"
            className={`nav-button ${location.pathname === '/companydashboard' ? 'active' : ''}`}
          >
            Company
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
