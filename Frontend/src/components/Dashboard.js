import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import DashboardSidebar from './DashboardSidebar';
import '../Css/Dashboard.css';

const data = [
  {
    subject: 'Dominant', A: 20,
  },
  {
    subject: 'Invloedrijk', A: 35,
  },
  {
    subject: 'Stabiel', A: 4,
  },
  {
    subject: 'Censcientieus', A: 25,
  },
];

const Header = () => (
  <div className="header">
    <hr />
    <div className="page-title">Dashboard</div>
  </div>
);

const Dashboard = () => (
  <div className="dashboard">
    <DashboardSidebar />
    <div className="main">
      <Header />
      <div className="content">
        <div className="chart-container">
          <div className="radar-chart">
            <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
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
          <div className="results">
            <h2>Resultaat: 75</h2>
            <div>D: 20</div>
            <div>I: 15</div>
            <div>S: 20</div>
            <div>C: 20</div>
          </div>
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

export default Dashboard;
