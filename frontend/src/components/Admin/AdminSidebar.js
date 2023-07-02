import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/HigtechLogo.png';
import styles from '../../Css/DashboardSidebar.module.css';

const AdminSidebar = () => {
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
            to="/admin"
            className={`${styles["nav-button"]} ${location.pathname === '/admin' ? styles.active : ''}`}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/addcompany"
            className={`${styles["nav-button"]} ${location.pathname === '/admin/addcompany' ? styles.active : ''}`}
          >
            Add Company
          </Link>
          <Link
            to="/admin/adduser"
            className={`${styles["nav-button"]} ${location.pathname === '/admin/adduser' ? styles.active : ''}`}
          >
            Add User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
