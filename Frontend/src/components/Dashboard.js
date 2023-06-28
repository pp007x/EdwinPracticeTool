import React, { useEffect, useState } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import DashboardSidebar from './DashboardSidebar';
import '../Css/Dashboard.css';

const Header = () => (
  <div className="header">
    <hr />
    <div className="page-title">Dashboard</div>
  </div>
);

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // assuming token is stored in local storage

    fetch(`http://localhost:5162/api/TotalScores/user`, {
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
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  }, []);

  return (
    <div className="dashboard">
      <DashboardSidebar />
      <div className="main">
        <Header />
        <div className="content">
          <div className="chart-container">
            <div className="radar-chart">
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
                  className="radar-polygon"
                />
              </RadarChart>
            </div>
            {resultData && (
              <div className="results">
                <h2>Resultaat: {resultData.scoreValueD + resultData.scoreValueI + resultData.scoreValueS + resultData.scoreValueC}</h2>
                <div>D: {resultData.scoreValueD}</div>
                <div>I: {resultData.scoreValueI}</div>
                <div>S: {resultData.scoreValueS}</div>
                <div>C: {resultData.scoreValueC}</div>
              </div>
            )}
          </div>
          <div className="text-content">
            <h2>Header</h2>
            <p>Some text goes here</p>
          </div>
          <button className="download-button">Download Uitslag</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
