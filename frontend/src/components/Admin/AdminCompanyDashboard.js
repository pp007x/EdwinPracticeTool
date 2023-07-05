import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import styles from '../../Css/CompanyDashboard.module.css'; 
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const descriptions = [
  "Analyticus (C)", "Strateeg (Cd)", "Perfectionist (Cs)", "Raadgever (Ci)",
  "Pionier (Dc)", "Beslisser (D)", "Doorzetter (Ds)", "Avonturier (Di)",
  "Specialist (Sc)", "Doener (Sd)", "Dienstverlener (S)", "Helper (Si)",
  "Diplomaat (Ic)", "Inspirator (Id)", "Bemiddelaar (Is)", "Entertainer (I)"
];

const boxCodeToIndex = {
  "C": 0, "D": 1, "S": 2, "I": 3,
  "c": 0, "d": 1, "s": 2, "i": 3,
};

const AdminCompanyDashboard = () => {
  const [userBoxes, setUserBoxes] = useState([]);
  const [userScores, setUserScores] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/Companies`);
        const data = response.data;
        setCompanies(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const fetchUserBoxes = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/Companies/${selectedCompany}/users`);
        const data = response.data;
        setUserBoxes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching user boxes:', error);
      }
    };

    const fetchUserScores = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/TotalScores/all`);
        const data = response.data;
        setUserScores(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching user scores:', error);
      }
    };

    if (selectedCompany) {
      fetchUserBoxes();
      fetchUserScores();
    }
  }, [selectedCompany]);

  return (
    <div className={styles.dashboard}>
        <AdminSidebar />
        <div className={styles.main}>
            <AdminHeader />
            <div className={styles.content}>
            <div className={styles.sidebarRight}>
                <div className={styles["dashboard-title"]}>
                    <h1>Company Dashboard</h1>
                    <p>Welcome to the Company Dashboard page!</p>
                </div>

                <div className={styles["company-selection-container"] }>
                    <div>
                        <label>Select a Company:</label>
                        </div>
                        <div>
                        <select className={styles.dropdownMenu} onChange={(e) => setSelectedCompany(e.target.value)}>
                            <option value="">Select a company</option>
                            {companies.map((company, index) =>
                                <option key={index} value={company.id}>{company.name}</option>
                            )}
                        </select>
                    </div>

                    <div className={styles["dashboard-content"]}>
          <div className={styles["big-square-wrapper"]}>
              <div className={styles["big-square-container"]}>
                {['C', 'D', 'S', 'I'].map((letter, bigSquareIndex) => (
                  <div className={`${styles["big-square"]} ${styles["big-square-" + (bigSquareIndex + 1)]}`} key={bigSquareIndex}>
                    <p className={styles["corner-letter"]}>{letter}</p>
                    <div className={styles["small-squares"]}>
                    {[0, 1, 2, 3].map((smallSquareIndex) => {
                      const descriptionIndex = bigSquareIndex * 4 + smallSquareIndex;
                      const colorClass = `small-square-${descriptionIndex + 1}`;
                      return (
                        <div className={`${styles["small-square"]} ${styles[colorClass]}`} key={smallSquareIndex}>
                          <div className={styles["box-content"]}>
                            <p className={styles["description-name"]}>{descriptions[descriptionIndex]}</p>
                            {smallSquareIndex === 2 && bigSquareIndex === 0 && <p className={styles["indirect-label"]}>Indirect</p>}
                            {smallSquareIndex === 1 && bigSquareIndex === 2 && <p className={styles["mens-label"]}>Mens</p>}
                            {smallSquareIndex === 0 && bigSquareIndex === 1 && <p className={styles["taak-label"]}>Taak</p>}
                            {smallSquareIndex === 0 && bigSquareIndex === 3 && <p className={styles["direct-label"]}>Direct</p>}
                            <div className={styles["score-container"]}>
                              {userBoxes
                                .filter(user =>
                                  console.log(bigSquareIndex) ||
                                  typeof user.box === 'string' &&
                                  user.box.length === 2 &&
                                  boxCodeToIndex[user.box[0].toUpperCase()] === bigSquareIndex &&
                                  boxCodeToIndex[user.box[1].toLowerCase()] === smallSquareIndex)
                                .map((user, index) => (
                                  <p className={styles["score-name"]} key={index}>{user.username}</p>
                                ))
                              }
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles["participant-table-container"]}>
              <table className={styles["participant-table"]}>
                <thead>
                  <tr>
                    <th>Deelnemer</th>
                    <th>D</th>
                    <th>I</th>
                    <th>S</th>
                    <th>C</th>
                  </tr>
                </thead>
                <tbody>
                  {userBoxes.map((user, index) => {
                    const userScore = userScores.find(score => score.userId === user.id) || {};
                    return (
                      <tr key={index}>
                        <td>{user.username}</td>
                        <td>{userScore.scoreValueD}</td>
                        <td>{userScore.scoreValueI}</td>
                        <td>{userScore.scoreValueS}</td>
                        <td>{userScore.scoreValueC}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          </div>
        </div>
        </div>
        </div>
    </div>
  );
};

export default AdminCompanyDashboard;
