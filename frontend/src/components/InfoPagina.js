import React from 'react';
import styles from '../Css/Dashboard.module.css';
import DashboardSidebar from './DashboardSidebar';
import infopaginaImage from '../images/infopagina.PNG'; // Import the image
import infopaginaImage2 from '../images/infopagina2.PNG'; // Import the image
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
        <Header title="Info over de profielen" />
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <h3>Verklaring van de kenmerken</h3>
            <img src={infopaginaImage} alt="Image" className={styles.image} /> {/* Use the imported image */}
            <h3>Communicatiemethodes</h3>
            <img src={infopaginaImage2} alt="Image" className={styles.image} /> {/* Use the imported image */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPagina;
