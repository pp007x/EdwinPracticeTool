import React, { useState, useEffect } from 'react';
import config from '../../config';
import DashboardSidebar from './AdminSidebar';
import styles from '../../Css/CompanyDashboard.module.css'; 

const Header = ({ title }) => (
  <div className={styles.header}>
    <hr />
    <div className={styles["page-title"]}>{title}</div>
  </div>
);

function AdminEditQuestions() {
  const [questions, setQuestions] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [editedQuestions, setEditedQuestions] = useState([]);

  useEffect(() => {
    fetch(`${config.API_BASE_URL}/api/companies`)
      .then(response => response.json())
      .then(data => setCompanies(data));
  }, []);

  const handleCompanyChange = (event) => {
    const companyId = event.target.value;
    setSelectedCompany(companyId);

    if (companyId) {
      fetch(`${config.API_BASE_URL}/api/Questions/${companyId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setQuestions(data);
          setEditedQuestions(data);
        })
        .catch(error => console.error(error));
    }
  };

  const handleQuestionChange = (index, event) => {
    const { name, value } = event.target;
    setEditedQuestions(prevState => {
      const updatedQuestions = [...prevState];
      updatedQuestions[index][name] = value;
      return updatedQuestions;
    });
  };

  const handleAnswerChange = (questionIndex, answerIndex, event) => {
    const { name, value } = event.target;
    setEditedQuestions(prevState => {
      const updatedQuestions = [...prevState];
      updatedQuestions[questionIndex].answers[answerIndex][name] = value;
      return updatedQuestions;
    });
  };

  const handleSubmit = () => {
    fetch(`${config.API_BASE_URL}/api/Questions`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(editedQuestions)
    })
      .then(response => {
        if (response.ok) {
          console.log('Questions updated successfully');
        } else {
          console.error('Failed to update questions');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className={styles.dashboard}>
      <DashboardSidebar />
      <div className={styles.main}>
        <Header title="Admin Edit Questions" />
        <div className={styles.sidebarRight}>
        <h1>Edit Questions</h1>
        <select className={styles.dropdownMenu} value={selectedCompany} onChange={handleCompanyChange}>
          <option value="">Select a company...</option>
          {companies.map(company => (
            <option key={company.id} value={company.id}>{company.name}</option>
          ))}
        </select>

        {questions.length > 0 ? (
          <div >
            <h2>Existing Questions for Company: {selectedCompany}</h2>
            <ul>
              {editedQuestions.map((question, questionIndex) => (
                <li key={question.id}>
                  <h3>
                    <input
                      type="text"
                      className={styles.inputField}
                      name="questionText"
                      value={question.questionText}
                      onChange={event => handleQuestionChange(questionIndex, event)}
                    />
                  </h3>
                  <ul>
                    {question.answers.map((answer, answerIndex) => (
                      <li key={answer.id}>
                        <p>
                          Answer Text:
                          <input
                          className={styles.inputField}
                            type="text"
                            name="answerText"
                            value={answer.answerText}
                            onChange={event => handleAnswerChange(questionIndex, answerIndex, event)}
                          />
                        </p>
                        <p>
                          Score Value D:
                          <input
                          className={styles.inputField}
                            type="number"
                            name="scoreValueD"
                            value={answer.scoreValueD}
                            onChange={event => handleAnswerChange(questionIndex, answerIndex, event)}
                          />
                        </p>
                        <p>
                          Score Value I:
                          <input
                            type="number"
                            className={styles.inputField}
                            name="scoreValueI"
                            value={answer.scoreValueI}
                            onChange={event => handleAnswerChange(questionIndex, answerIndex, event)}
                          />
                        </p>
                        <p>
                          Score Value S:
                          <input
                            type="number"
                            className={styles.inputField}
                            name="scoreValueS"
                            value={answer.scoreValueS}
                            onChange={event => handleAnswerChange(questionIndex, answerIndex, event)}
                          />
                        </p>
                        <p>
                          Score Value C:
                          <input
                            type="number"
                            className={styles.inputField}
                            name="scoreValueC"
                            value={answer.scoreValueC}
                            onChange={event => handleAnswerChange(questionIndex, answerIndex, event)}
                          />
                        </p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <button onClick={handleSubmit}>Submit All Changes</button>
          </div>
        ) : (
          <p>No questions found for the selected company.</p>
        )}
        </div>
      </div>
    </div>
  );
}

export default AdminEditQuestions;
