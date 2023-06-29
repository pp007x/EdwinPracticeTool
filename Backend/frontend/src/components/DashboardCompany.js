import React, { useEffect, useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import Header from './DashboardHeader';
import '../Css/CompanyDashboard.css';
import axios from 'axios';

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
        const response = await axios.get('http://localhost:5162/api/Companies/1/users'); 
        const data = response.data;
        setUserBoxes(data);
      } catch (error) {
        console.error('Error fetching user boxes:', error);
      }
    };

    const fetchUserScores = async () => {
      try {
        const response = await axios.get('http://localhost:5162/api/TotalScores/all'); 
        const data = response.data;
        setUserScores(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching user scores:', error);
      }
    };

    fetchUserBoxes();
    fetchUserScores();
  }, []);

  return (
    <div className="dashboard">
      <DashboardSidebar />
      <div className="main">
        <Header />
        <div className="content">
          <div className="dashboard-title">
            <h1>Company Dashboard</h1>
            <p>Welcome to the Company Dashboard page!</p>
          </div>

          <div className="dashboard-content">
            <div className="box-and-table-container">
              <div className="big-square-container">
                {['C', 'D', 'S', 'I'].map((letter, bigSquareIndex) => (
                  <div className={`big-square big-square-${bigSquareIndex + 1}`} key={bigSquareIndex}>
                    <p className="corner-letter">{letter}</p>
                    <div className="small-squares">
                      {[0, 1, 2, 3].map((smallSquareIndex) => {
                        const descriptionIndex = bigSquareIndex * 4 + smallSquareIndex;
                        const colorClass = `small-square-${descriptionIndex + 1}`;
                        return (
                          <div className={`small-square ${colorClass}`} key={smallSquareIndex}>
                            <div className="box-content">
                              <p className="description-name">{descriptions[descriptionIndex]}</p>
                              <div className="score-container">
                                {userBoxes
                                  .filter(user => 
                                    typeof user.box === 'string' && 
                                    user.box.length === 2 &&
                                    boxCodeToIndex[user.box[0].toUpperCase()] === bigSquareIndex &&
                                    boxCodeToIndex[user.box[1].toLowerCase()] === smallSquareIndex)
                                  .map((user, index) => (
                                    <p className="score-name" key={index}>{user.username}</p>
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
                <div className="center-words">
                  <p className="top-word">Taak</p>
                  <p className="right-word">Direct</p>
                  <p className="bottom-word">Mens</p>
                  <p className="left-word">Indirect</p>
                </div>
              </div>
            </div>

            <div className="participant-table-container">
              <table className="participant-table">
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
                        <td>{userScore.scoreValueD }</td>
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
  );
};

export default CompanyDashboard;
