import React, { useEffect, useState } from 'react';
import DashboardSidebar from './OpenDashboardSidebar';
import styles from '../../Css/Dashboard.module.css';
import axios from 'axios';
import config from '../../config';
import html2pdf from 'html2pdf.js';

const Header = ({ title }) => (
  <div className={styles.header}>
    <hr />
    <div className={styles["page-title"]}>{title}</div>
  </div>
);

const OpenDashboard = () => {
  const [openQuestions, setOpenQuestions] = useState([]);
  const [openAnswers, setOpenAnswers] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`${config.API_BASE_URL}/api/OpenReactionForm/open`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => {
      setOpenQuestions(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });

    axios.get(`${config.API_BASE_URL}/api/OpenReactionForm/user/me/answers`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => {
        setOpenAnswers(response.data);
        const uniqueSessions = [...new Set(response.data.map(answer => answer.session))];
        setSessions(uniqueSessions);
        setSelectedSession(uniqueSessions[0]);  // This is the update
        console.log(response.data);
      })
      
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  }, []);

  const handleSessionChange = (event) => {
    setSelectedSession(parseInt(event.target.value));
  };

  const downloadPdf = () => {
    let element = document.getElementById('session-data');
    const sessionIndex = sessions.indexOf(selectedSession);
    let opt = {
      margin: 1,
      filename: `Session-${sessionIndex + 1}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };
  

  return (
    <div className={styles.dashboard}>
      <DashboardSidebar />
      <div className={styles.main}>
        <Header title='Open Questions and Answers' />
        <div className={styles.content}>
          <div className={styles["text-content"]}>
            <h2>Open Questions and Answers</h2>
            <select value={selectedSession} onChange={handleSessionChange} style={{width: '150px', height: '30px', fontSize: '18px'}}>
  {sessions.map((session, index) => (
    <option key={index} value={session}>{`Session ${index + 1}`}</option>
  ))}
</select>
            <div id="session-data">
                <h1 style={{fontWeight: 'bold'}}>Vragenlijst</h1>
                {openQuestions.map((question, questionIndex) => {
                    const correspondingAnswers = openAnswers.filter(answer => answer.questionOpenId === question.id && answer.session === selectedSession);
                    return (
                        <React.Fragment key={questionIndex}>
                        <h2>{question.questionText}</h2>
                        {correspondingAnswers.map((answer, answerIndex) => (
                            <p key={answerIndex}>{answer.answerText}</p>
                        ))}
                        {correspondingAnswers.length === 0 && <p>No answers for this question in this session.</p>}
                        </React.Fragment>
                    );
                })}
            </div>
            <div>
            <button style={{marginBottom: '30px'}} onClick={downloadPdf}>Download PDF</button >
            </div>
            <button onClick={() => window.open('https://www.google.com', '_blank')}>
  Go to Google
</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenDashboard;
