import React, { useEffect, useState } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import DashboardSidebar from './DashboardSidebar';
import styles from '../Css/Dashboard.module.css';
import axios from 'axios';
import config from '../config';
import Draggable from 'react-draggable';
import { AppContext } from '../context';
import { Button } from '@material-ui/core';

const backgroundColor = '#087a80';

const Header = ({ title }) => (
  <div className={styles.header}>
    <hr />
    <div className={styles["page-title"]}>{title}</div>
  </div>
);

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [resultData, setResultData] = useState(null);
  const [DateData, setDateData] = useState(null);
  const [Username, setUsernameData] = useState(null);
  const [onderwerpData, setOnderwerpData] = useState(null);
  const [boxOnePos, setBoxOnePos] = useState({x: 0, y: 0});
  const [boxTwoPos, setBoxTwoPos] = useState({x: 0, y: 0});
  const [boxThreePos, setBoxThreePos] = useState({x: 0, y: 0});
  const [boxFourPos, setBoxFourPos] = useState({x: 0, y: 0});

  const resetPositions = () => {
    setBoxOnePos({x: 0, y: 0});
    setBoxTwoPos({x: 0, y: 0});
    setBoxThreePos({x: 0, y: 0});
    setBoxFourPos({x: 0, y: 0});
    localStorage.removeItem('boxOnePos');
    localStorage.removeItem('boxTwoPos');
    localStorage.removeItem('boxThreePos');
    localStorage.removeItem('boxFourPos');
  };

  useEffect(() => {
    const boxOnePos = JSON.parse(localStorage.getItem('boxOnePos'));
    const boxTwoPos = JSON.parse(localStorage.getItem('boxTwoPos'));
    const boxThreePos = JSON.parse(localStorage.getItem('boxThreePos'));
    const boxFourPos = JSON.parse(localStorage.getItem('boxFourPos'));

    if (boxOnePos) setBoxOnePos(boxOnePos);
    if (boxTwoPos) setBoxTwoPos(boxTwoPos);
    if (boxThreePos) setBoxThreePos(boxThreePos);
    if (boxFourPos) setBoxFourPos(boxFourPos);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`${config.API_BASE_URL}/api/TotalScores/user/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => {
      const serverData = response.data;
      setDateData(serverData.date);
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

    axios.get(`${config.API_BASE_URL}/api/Onderwerp/user/me`, {
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

    axios.get(`${config.API_BASE_URL}/api/Users/Profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => {
      setUsernameData(response.data.username);
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  }, []);

  
  return (
    <AppContext.Provider value={{ resetPositions }}>
    <div className={styles.dashboard}>
      <DashboardSidebar />
      <div className={styles.main}>
        <Header title={onderwerpData ? onderwerpData.name : 'Loading...'} style={{ zIndex: 1000 }} />
        
        <div className={styles.content} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <Button variant="contained" color="primary" onClick={resetPositions}>
            Reset Positions
          </Button>
        <Draggable
        
  position={boxOnePos}
  onStop={(e, data) => {
    const newPos = {x: data.x, y: data.y};
    setBoxOnePos(newPos);
    localStorage.setItem('boxOnePos', JSON.stringify(newPos));
  }}
>
            <div className={styles["chart-container"]}>
              <div
                className={styles["radar-chart"]}
                style={{
                  backgroundColor: backgroundColor,
                  padding: '10px',
                  borderRadius: '40px',
                  boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.8)',
                }}
              >
                <RadarChart 
                  cx={300} 
                  cy={250} 
                  outerRadius={180} 
                  width={600} 
                  height={500} 
                  data={chartData}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'white' }} axisLine={{ stroke: 'white' }} />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 40]}
                    axisLine={{ stroke: 'white' }}
                    tick={props => {
                      const {x, y, payload} = props;
                      return (
                        <g transform={`translate(${x},${y})`}>
                          <text
                            x={0}
                            y={0}
                            dy={16}
                            textAnchor="end"
                            fill="#fff"
                            transform="rotate(-45)"
                          >
                            {payload.value}
                          </text>
                        </g>
                      );
                    }}
                  />
                  <Radar
                    name="Mike"
                    dataKey="A"
                    stroke="#000000"
                    fill="#ffffff"
                    fillOpacity={0.6}
                    className={styles["radar-polygon"]}
                  />
                </RadarChart>
              </div>
            </div>
          </Draggable>
          
          {resultData && (
            <Draggable
            position={boxTwoPos}
            onStop={(e, data) => {
              const newPos = {x: data.x, y: data.y};
              setBoxTwoPos(newPos);
              localStorage.setItem('boxTwoPos', JSON.stringify(newPos));
            }}
          >
            <div 
              className={styles.results}
              style={{
                backgroundColor: backgroundColor,
                padding: '10px',
                borderRadius: '20px',
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                height: 'fit-content', 
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.8)',
              }}
            >
              <h3>Username: {Username}</h3>
              <h3>Datum van afname: {DateData && new Date(DateData).toLocaleDateString('en-GB')}</h3>

              <h3>Resultaten</h3>
              <div style={{ fontFamily: 'monospace', marginBottom: '5px', fontSize: '14px' }}>
                <b>Score Value D:</b> {resultData.scoreValueD}
              </div>
              <div style={{ fontFamily: 'monospace', marginBottom: '5px', fontSize: '14px' }}>
                <b>Score Value I:</b> {resultData.scoreValueI}
              </div>
              <div style={{ fontFamily: 'monospace', marginBottom: '5px', fontSize: '14px' }}>
                <b>Score Value S:</b> {resultData.scoreValueS}
              </div>
              <div style={{ fontFamily: 'monospace', marginBottom: '5px', fontSize: '14px' }}>
                <b>Score Value C:</b> {resultData.scoreValueC}
              </div>
            </div>
            </Draggable>
          )}
<Draggable
  position={boxThreePos}
  onStop={(e, data) => {
    const newPos = {x: data.x, y: data.y};
    setBoxThreePos(newPos);
    localStorage.setItem('boxThreePos', JSON.stringify(newPos));
  }}
>
          <div 
          
            className={styles["text-content"]} 
            style={{
              backgroundColor: backgroundColor,
              padding: '20px 10px 10px 30px',
              marginLeft: '20px',
              borderRadius: '20px',
              color: 'white',
              minWidth: '300px',
              maxWidth: '600px',
              boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.8)',
              display: 'flex',
  flexDirection: 'column',
  height: 'fit-content', 
            }}
            >
            <h2>{onderwerpData ? onderwerpData.name : 'Loading...'}</h2>
            <p dangerouslySetInnerHTML={{ __html: onderwerpData ? onderwerpData.description : 'Loading...' }}></p>
          </div>
          </Draggable>
          </div>
        </div>
      </div>
      </AppContext.Provider>
  );
  
  
};

export default Dashboard;
