import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/HigtechLogo.png';
import styles from '../../Css/DashboardSidebar.module.css';

const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <div className={styles["sidebar-container"]}>
      <div className={styles.sidebar}>
        <div className={styles["logo-container"]}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        <hr />
        <div className={styles.navigation}>
          <Link
            to="/opendashboard"
            className={`${styles["nav-button"]} ${location.pathname === '/dashboard' ? styles.active : ''}`}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
