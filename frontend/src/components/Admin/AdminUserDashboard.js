import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import DashboardSidebar from './AdminSidebar';
import styles from '../../Css/Dashboard.module.css';
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
        const response = await axios.get(`${config.API_BASE_URL}/api/Companies`);
        setCompanies(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      axios.get(`${config.API_BASE_URL}/api/Companies/${selectedCompany}/users`)
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

  return (
    <div className={styles.dashboard}>
      <DashboardSidebar />
      <div className={styles.main}>
        <Header title={onderwerpData ? onderwerpData.name : 'Loading...'} />

        <label>Select a Company:</label>
        <select onChange={(e) => setSelectedCompany(e.target.value)}>
          <option value="">Select a company</option>
          {companies.map((company, index) =>
            <option key={index} value={company.id}>{company.name}</option>
          )}
        </select>

        <label>Select a User:</label>
        <select onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">Select a user</option>
          {users.map((user, index) =>
            <option key={index} value={user.id}>{user.username}</option>
          )}
        </select>

        {resultData && (
          <div>
            <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Score" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>

            <label><b>Score Value:</b></label>
            <div>{`Score Value D: ${resultData.scoreValueD}`}</div>
            <div>{`Score Value I: ${resultData.scoreValueI}`}</div>
            <div>{`Score Value S: ${resultData.scoreValueS}`}</div>
            <div>{`Score Value C: ${resultData.scoreValueC}`}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
