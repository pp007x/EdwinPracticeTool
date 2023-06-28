import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import Header from './DashboardHeader';
import '../Css/CompanyDashboard.css';

const usernames = ["User1", "User2", "User3"];
const descriptions = [
  "Analyticus (C)", "Strateeg (Cd)", "Perfectionist (Cs)", "Raadgever (Ci)",
  "Pionier (Dc)", "Beslisser (D)", "Doorzetter (Ds)", "Avonturier (Di)",
  "Specialist (Sc)", "Doener (Sd)", "Dienstverlener (S)", "Helper (Si)",
  "Diplomaat (Ic)", "Inspirator (Id)", "Bemiddelaar (Is)", "Entertainer (I)"
];

const CompanyDashboard = () => (
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
                              {usernames.map((username, index) => (
                                <p className="score-name" key={index}>{username}</p>
                              ))}
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
                {usernames.map((username, index) => (
                  <tr key={index}>
                    <td>{username}</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CompanyDashboard;
