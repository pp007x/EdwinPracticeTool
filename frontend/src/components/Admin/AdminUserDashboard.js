import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import DashboardSidebar from './AdminSidebar';
import styles from '../../Css/CompanyDashboard.module.css'; 
import axios from 'axios';
import config from '../../config';

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
  const [companies, setCompanies] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${config.API_BASE_URL}/api/Companies`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
);
        setCompanies(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      const token = localStorage.getItem('token');
      axios.get(`${config.API_BASE_URL}/api/Companies/${selectedCompany}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          setUsers(Array.isArray(response.data) ? response.data : []);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    }
  }, [selectedCompany]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (selectedUser) {
        fetch(`${config.API_BASE_URL}/api/TotalScores/user/${selectedUser}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
          
        .then(response => response.ok ? response.json() : Promise.reject())
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

          axios.get(`${config.API_BASE_URL}/api/Onderwerp/user/${selectedUser}`, {
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
        .catch(error => console.error('There has been a problem with your fetch operation:', error));
    }
  }, [selectedUser]);
  const CustomizedAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
  };

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
        <Header title="Info per user" />
        <div className={styles.content}>
          <div className={styles.sidebarRight}>
            <h1>See user info</h1>
            <label>Select a Company:</label>
            <div>
              <select className={styles.dropdownMenu} onChange={(e) => setSelectedCompany(e.target.value)}>
                <option value="">Select a company</option>
                {companies.map((company, index) =>
                  <option key={index} value={company.id}>{company.name}</option>
                )}
              </select>
            </div>
            <div>
              <label>Select a User:</label>
              <div>
                <select className={styles.dropdownMenu} onChange={(e) => setSelectedUser(e.target.value)}>
                  <option value="">Select a user</option>
                  {users.map((user, index) =>
                    <option key={index} value={user.id}>{user.username}</option>
                  )}
                </select>
              </div>
              {resultData && (
                <div>
                  <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={chartData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 40]} tick={<CustomizedAxisTick />} />
                    <Radar name="Score" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </RadarChart>
  
                  <label><b>Score Value:</b></label>
                  <div style={{ fontFamily: 'monospace', marginBottom: '5px', fontSize: '14px' }}><b>Score Value D:</b> {resultData.scoreValueD}</div>
                  <div style={{ fontFamily: 'monospace', marginBottom: '5px', fontSize: '14px' }}><b>Score Value I:</b> {resultData.scoreValueI}</div>
                  <div style={{ fontFamily: 'monospace', marginBottom: '5px', fontSize: '14px' }}><b>Score Value S:</b> {resultData.scoreValueS}</div>
                  <div style={{ fontFamily: 'monospace', marginBottom: '5px', fontSize: '14px' }}><b>Score Value C:</b> {resultData.scoreValueC}</div>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Dashboard;
