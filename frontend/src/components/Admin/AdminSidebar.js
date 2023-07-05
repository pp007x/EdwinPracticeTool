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
          <Link
            to="/admin/companies"
            className={`${styles["nav-button"]} ${location.pathname === '/admin/companies' ? styles.active : ''}`}
          >
            Info per company
          </Link>
          <Link
            to="/admin/users"
            className={`${styles["nav-button"]} ${location.pathname === '/admin/users' ? styles.active : ''}`}
          >
            Info per user
          </Link>
          <Link
            to="/admin/newquestion"
            className={`${styles["nav-button"]} ${location.pathname === '/admin/newquestion' ? styles.active : ''}`}
          >
            Upload Questions
          </Link>
          <Link
            to="/admin/newquestions"
            className={`${styles["nav-button"]} ${location.pathname === '/admin/newquestions' ? styles.active : ''}`}
          >
            Edit questions
          </Link>
          <Link
            to="/admin/addquestions"
            className={`${styles["nav-button"]} ${location.pathname === '/admin/addquestions' ? styles.active : ''}`}
          >
            Add Question
          </Link>
          <Link
            to="/admin/removeuser"
            className={`${styles["nav-button"]} ${location.pathname === '/admin/removeuser' ? styles.active : ''}`}
          >
            Remove User
          </Link>

          <Link
            to="/admin/removecompany"
            className={`${styles["nav-button"]} ${location.pathname === '/admin/removecompany' ? styles.active : ''}`}
          >
            Remove Company
          </Link>
          <Link
            to="/admin/editonderwerp"
            className={`${styles["nav-button"]} ${location.pathname === '/admin/editonderwerp' ? styles.active : ''}`}
          >
            Aanpassen profielen
          </Link>
          <Link
            to="/admin/resetpassword"
            className={`${styles["nav-button"]} ${location.pathname === '/admin/resetpassword' ? styles.active : ''}`}
          >
            Reset Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
