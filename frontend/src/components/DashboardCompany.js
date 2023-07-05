import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import styles from '../Css/CompanyDashboard.module.css'; // Add this line
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';

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

const CompanyDashboard = () => {
  const [userBoxes, setUserBoxes] = useState([]);
  const [userScores, setUserScores] = useState([]);

  useEffect(() => {
    const fetchUserBoxes = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/Companies/1/users`);
        const data = response.data;
        // Ensure data is an array before setting it
        setUserBoxes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching user boxes:', error);
      }
    };

    const fetchUserScores = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/TotalScores/all`);
        const data = response.data;
        // Ensure data is an array before setting it
        setUserScores(Array.isArray(data) ? data : []);
        console.log(data);
      } catch (error) {
        console.error('Error fetching user scores:', error);
      }
    };

    fetchUserBoxes();
    fetchUserScores();
  }, []);
  const Header = ({ title }) => (
    <div className={styles.header}>
      <hr />
      <div className={styles['page-title']}>{title}</div>
    </div>
  );
  
  return (
    <div className={styles.dashboard}>
    <DashboardSidebar />
    <div className={styles.main}>
    <Header title="Company" />

        <div className={styles.content}>
        <div className={styles.sidebarRight}>
          <div className={styles["dashboard-title"]}>
            <h1>Company Dashboard</h1>
            <p>Here is all the info of your company</p>
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
                            {smallSquareIndex === 3 && bigSquareIndex === 0 && <p className={styles["indirect-label"]}>Indirect</p>}
                            {smallSquareIndex === 0 && bigSquareIndex === 2 && <p className={styles["mens-label"]}>Mens</p>}
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
  );
};

export default CompanyDashboard;