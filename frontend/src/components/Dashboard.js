import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
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
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { renderToString } from "react-dom/server";

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
  const [tempRadarChart, setTempRadarChart] = useState(null);

  const pdfRef = useRef(); 
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

  const handleDownload = () => {
    const pdf = new jsPDF();
    const scoreValues = [
      { title: 'Score Value D:', value: resultData.scoreValueD },
      { title: 'Score Value I:', value: resultData.scoreValueI },
      { title: 'Score Value S:', value: resultData.scoreValueS },
      { title: 'Score Value C:', value: resultData.scoreValueC },
    ];
    const onderwerp = onderwerpData ? onderwerpData.name : 'Loading...';
    const onderwerpDescription = onderwerpData 
    ? onderwerpData.description.replace(/<br>/g, '\n')  // replace <br> with new lines
    : 'Loading...';

    let textOffset = 10;
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Username: ${Username}`, 10, textOffset);
    textOffset += 10;
    pdf.text(`Datum van afname: ${DateData && new Date(DateData).toLocaleDateString()}`, 10, textOffset);
    textOffset += 10;
    pdf.text(`Onderwerp: ${onderwerp}`, 10, textOffset);
    textOffset += 10;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    const splitTitle = pdf.splitTextToSize(`${onderwerpDescription}`, 180);
    pdf.text(splitTitle, 10, textOffset);
    textOffset += 10 * splitTitle.length;  // adjust offset

    pdf.addPage();
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Behaalde scores:`, 10, 20); // Updated textOffset to 20
    textOffset = 30; // Initialize textOffset with 30 or appropriate starting point for scores
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
  
    scoreValues.forEach(scoreValue => {
      pdf.text(`${scoreValue.title} ${scoreValue.value}`, 10, textOffset);
      textOffset += 10;
    });

    const tempRadarChart = (
      <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" tick={{ fill: 'black' }} />
        <PolarRadiusAxis PolarRadiusAxis angle={90} domain={[0, 40]} axisLine={{ stroke: 'white' }}tick={props => { const {x, y, payload} = props;
                      return (
                        <g transform={`translate(${x},${y})`}>
                          <text
                            x={0}
                            y={0}
                            dy={16}
                            textAnchor="end"
                            fill="#000"
                            transform="rotate(-45)"
                          >
                            {payload.value}
                          </text>
                        </g>
                      );
                    }}/>
        <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    );
    setTempRadarChart(tempRadarChart);
    const tempChartDiv = document.createElement('div');
    tempChartDiv.style.width = '600px';
    tempChartDiv.style.height = '500px';
    tempChartDiv.style.position = 'absolute';
    tempChartDiv.style.left = '-10000px';
    document.body.appendChild(tempChartDiv);
    ReactDOM.render(tempRadarChart, tempChartDiv);
    setTimeout(() => {
      html2canvas(tempChartDiv)
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        
        const imgWidthMM = canvas.width / 3.78;  // convert width from px to mm
        const imgHeightMM = canvas.height / 3.78;  // convert height from px to mm
    
        const pageWidthMM = 200;  // width of A4 paper in mm
        const pageHeightMM = 297;  // height of A4 paper in mm
    
        const x = (pageWidthMM - imgWidthMM) / 2;
        const y = (pageHeightMM - imgHeightMM) / 2;
    
        pdf.addImage(imgData, 'PNG', x, y, imgWidthMM, imgHeightMM);
        pdf.save("download.pdf");
        setTempRadarChart(null);
      })
      .then(() => {
        ReactDOM.unmountComponentAtNode(tempChartDiv);
        document.body.removeChild(tempChartDiv);
      });}, 1000);
  };
  
  
  
  return (
    <AppContext.Provider value={{ resetPositions }}>
    <div className={styles.dashboard}>
      <DashboardSidebar />
      <div className={styles.main}>
        <Header title={onderwerpData ? onderwerpData.name : 'Loading...'} style={{ zIndex: 1000 }} />
        
        <div className={styles.content} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <div ref={pdfRef}>
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
                <button onClick={handleDownload}>Download PDF</button>
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
          <div>
      {tempRadarChart}
    </div>
    
        </div>
      </div>
      </AppContext.Provider>
  );
  
  
};

export default Dashboard;
