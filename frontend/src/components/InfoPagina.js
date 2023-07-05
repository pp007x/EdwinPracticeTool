import React from 'react';
import styles from '../Css/Dashboard.module.css';
import DashboardSidebar from './DashboardSidebar';
import infopaginaImage from '../images/infopagina.PNG'; // Import the image

const Header = ({ title }) => (
  <div className={styles.header}>
    <hr />
    <div className={styles["page-title"]}>{title}</div>
  </div>
);

function InfoPagina() {
  return (
    <div className={styles.dashboard}>
      <DashboardSidebar />
      <div className={styles.main}>
        <Header title="Your Page Title" />
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <img src={infopaginaImage} alt="Image" className={styles.image} /> {/* Use the imported image */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPagina;
