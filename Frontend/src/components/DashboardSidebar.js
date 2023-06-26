import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/HigtechLogo.png';
import '../Css/DashboardSidebar.css';

const DashboardSidebar = () => {
  const location = useLocation();

  return (
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
          <button>
            Dashboard
          </button>
        </Link>
        <Link
          to="/companydashboard"
          className={`nav-button ${location.pathname === '/companydashboard' ? 'active' : ''}`}
        >
          <button>
            Company
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSidebar;
