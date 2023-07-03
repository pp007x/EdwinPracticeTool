import React, { useEffect, useState } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import DashboardSidebar from './DashboardSidebar';
import styles from '../Css/Dashboard.module.css';
import axios from 'axios';
import config from '../config';

const Header = ({ title }) => (
  <div className={styles.header}>
    <hr />
    <div className={styles["page-title"]}>{title}</div>
  </div>
);

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [resultData, setResultData] = useState(null);
  const [onderwerpData, setOnderwerpData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`${config.API_BASE_URL}/api/TotalScores/user/me`, {  // <-- changed this line
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then(serverData => {
      setResultData(serverData);

      const transformedData = [
        {
          subject: 'Dominant', A: serverData.scoreValueD,
        },
        {
          subject: 'Invloedrijk', A: serverData.scoreValueI,
        },
        {
          subject: 'Stabiel', A: serverData.scoreValueS,
        },
        {
          subject: 'Consciëntieus', A: serverData.scoreValueC,
        },
      ];
      setChartData(transformedData);

      axios.get(`${config.API_BASE_URL}/api/Onderwerp/user/${serverData.userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => {
        setOnderwerpData(response.data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  }, []);

  return (
    <div className={styles.dashboard}>
      <DashboardSidebar />
      <div className={styles.main}>
        <Header title={onderwerpData ? onderwerpData.name : 'Loading...'} />
        <div className={styles.content}>
          <div className={styles["chart-container"]}>
            <div className={styles["radar-chart"]}>
              <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={chartData}>
                <PolarGrid />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fontWeight: 'bold' }}
                />
                <PolarRadiusAxis angle={90} domain={[0, 40]} />
                <Radar
                  name="Mike"
                  dataKey="A"
                  stroke="#3487C7"
                  fill="#3487C7"
                  fillOpacity={0.6}
                  className={styles["radar-polygon"]}
                />
              </RadarChart>
            </div>
            {resultData && (
              <div className={styles.results}>
                <h2>Resultaat: {resultData.scoreValueD + resultData.scoreValueI + resultData.scoreValueS + resultData.scoreValueC}</h2>
                <div>D: {resultData.scoreValueD}</div>
                <div>I: {resultData.scoreValueI}</div>
                <div>S: {resultData.scoreValueS}</div>
                <div>C: {resultData.scoreValueC}</div>
              </div>
            )}
          </div>
          <div className={styles["text-content"]}>
            <h2>{onderwerpData ? onderwerpData.name : 'Loading...'}</h2>
            <p>{onderwerpData ? onderwerpData.description : 'Loading...'}</p>
          </div>
          <button className={styles["download-button"]}>Download Uitslag</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
