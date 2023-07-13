import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import styles from '../Css/CompanyDashboard.module.css';
import Draggable from 'react-draggable';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import { AppContext } from '../context';
const backgroundColor = '#087a80';
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




const singleLetter = {
  "C": 0, "D": 5, "S": 10, "I": 15,
}


const CompanyDashboard = () => {
  const [userBoxes, setUserBoxes] = useState([]);
  const [userScores, setUserScores] = useState([]);
  const [companyId, setCompanyId] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [boxOnePos, setBoxOnePos] = useState({x: 0, y: 0});
  const [boxTwoPos, setBoxTwoPos] = useState({x: 0, y: 0});
  const resetPositions = () => {
    setBoxOnePos({x: 0, y: 0});
    setBoxTwoPos({x: 0, y: 0});
    localStorage.removeItem('boxOnePos');
    localStorage.removeItem('boxTwoPos');
  };

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${config.API_BASE_URL}/api/Companies/current`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = response.data;
        setCompanyId(data.id);
        setCompanyName(data.name); // Assuming 'Name' is the correct property for the company's name
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };

    fetchCompanyDetails();
  }, []);


  useEffect(() => {
    const fetchUserBoxes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${config.API_BASE_URL}/api/Companies/users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        const data = response.data;
        setUserBoxes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching user boxes:', error);
      }
    };

    const fetchUserScores = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${config.API_BASE_URL}/api/TotalScores/all`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = response.data;
        setUserScores(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching user scores:', error);
      }
    };

    if (companyId) {
      fetchUserBoxes();
      fetchUserScores();
    }
  }, [companyId]);

  const Header = ({ title }) => (
    <div className={styles.header}>
      <hr />
      <div className={styles["page-title"]}>{title}</div>
    </div>
  );
  
  return (
    <AppContext.Provider value={{ resetPositions }}>
    <div className={styles.dashboard}>
      <DashboardSidebar />
      <div className={styles.main}>
        <Header title={companyName ? companyName : "Company"} />
        <div className={styles.content}>
          <div className={styles.sidebarRight}>
          
            <div className={styles["dashboard-title"]}>
              <h1>Company Dashboard</h1>

            </div>
            <div className={styles["dashboard-content"]}>
            <Draggable
        
        position={boxOnePos}
        onStop={(e, data) => {
          const newPos = {x: data.x, y: data.y};
          setBoxOnePos(newPos);
          localStorage.setItem('boxOnePos', JSON.stringify(newPos));
        }}
      >
<div style={{
  backgroundColor: backgroundColor,
  padding: '40px',
  borderRadius: '40px',
  boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.8)',
  width: '930px',
  color: 'white',
}}
>
              <div className={styles["big-square-wrapper"]}>
                <div className={styles["big-square-container"]}>
                  {['C', 'D', 'S', 'I'].map((letter, bigSquareIndex) => (
                    <div className={`${styles["big-square"]} ${styles["big-square-" + (bigSquareIndex + 1)]}`} key={bigSquareIndex}>
                      <p className={styles["corner-letter"]}><b>{letter}</b></p>
                      <div className={styles["small-squares"]} >
                        {[0, 1, 2, 3].map((smallSquareIndex) => {
                          const descriptionIndex = bigSquareIndex * 4 + smallSquareIndex;
                          const colorClass = `small-square-${descriptionIndex + 1}`;
                          return (
                            <div className={`${styles["small-square"]} ${styles[colorClass]}`}  key={smallSquareIndex}>
                              <div className={styles["box-content"]}>
                                <p className={styles["description-name"]} style={{color: 'black'}}><b>{descriptions[descriptionIndex]}</b></p>
                                <p></p>
                                {smallSquareIndex === 3 && bigSquareIndex === 0 && <p className={styles["indirect-label"]}><b>Indirect</b></p>}
                                {smallSquareIndex === 0 && bigSquareIndex === 2 && <p className={styles["mens-label"]}><b>Mens</b></p>}
                                {smallSquareIndex === 0 && bigSquareIndex === 1 && <p className={styles["taak-label"]}><b>Taak</b></p>}
                                {smallSquareIndex === 0 && bigSquareIndex === 3 && <p className={styles["direct-label"]}><b>Direct</b></p>}
                                <div className={styles["score-container"]} style={{color: 'black'}} >
                                {userBoxes 
                                .filter(user =>
                                  typeof user.box === 'string' &&
                                  (user.box.length === 1 || user.box.length === 2) &&
                                  boxCodeToIndex[user.box[0].toUpperCase()] === bigSquareIndex &&
                                  boxCodeToIndex[user.box.length === 1 ? user.box[0].toUpperCase() : user.box[1].toLowerCase()] === smallSquareIndex)
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
                
              </div>
              </Draggable>
              <Draggable
        
        position={boxTwoPos}
        onStop={(e, data) => {
          const newPos = {x: data.x, y: data.y};
          setBoxTwoPos(newPos);
          localStorage.setItem('boxTwoPos', JSON.stringify(newPos));
        }}
      >
              <div className={styles["participant-table-container"]} style={{
  backgroundColor: backgroundColor,
  padding: '40px',
  borderRadius: '40px',
  boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.8)',
  width: '930px',
  color: 'white',
}}
>
                <table className={styles["participant-table"]}>
                  <thead>
                    <tr>
                      <th>Deelnemer</th>
                      <th>D</th>
                      <th>I</th>
                      <th>S</th>
                      <th>C</th>
                      <th>Profiel</th>
                    </tr>
                  </thead>
                  <tbody>
                  {userBoxes.map((user, index) => {
  const userScore = userScores.find(score => score.userId === user.id) || {};
  let userProfile = ""; // This will store the profile description
  
  if (user.box && user.box.length === 2) {
    const descriptionIndex = boxCodeToIndex[user.box[0].toUpperCase()] * 4 + boxCodeToIndex[user.box[1].toLowerCase()];
    userProfile = descriptions[descriptionIndex];
  } else if (user.box && user.box.length === 1) {
    const letter = user.box[0].toUpperCase();
    const value = singleLetter[letter];
    userProfile = descriptions[value];
    
  }
  
  return (
    <tr key={index}>
      <td>{user.username}</td>
      <td>{userScore.scoreValueD}</td>
      <td>{userScore.scoreValueI}</td>
      <td>{userScore.scoreValueS}</td>
      <td>{userScore.scoreValueC}</td>
      <td>{userProfile}</td> {/* Displaying the profile description */}
    </tr>
  );
})}


                  </tbody>
                </table>
                
              </div>
              </Draggable>
            </div>
          </div>
        </div>
      </div>
    </div>
    </AppContext.Provider>
  );
};

export default CompanyDashboard