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


  const getCompanyName = () => {
    const company = companies.find(c => c.id === parseInt(selectedCompany,10));
    return company ? company.name : '';
  }


  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${config.API_BASE_URL}/api/companies`
    , {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
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
        <Header title="Edit questions" />
        <div className={styles.content}>
          <div className={styles.sidebarRight}>
            <h1>Edit Questions</h1>
            <div className={styles.inputFieldWrapper}>
              <label>
                Select a company to edit questions for:
                <select className={styles.dropdownMenu} value={selectedCompany} onChange={handleCompanyChange}>
                  <option value="">Select a company...</option>
                  {companies.map(company => (
                    <option key={company.id} value={company.id}>{company.name}</option>
                  ))}
                </select>
              </label>
            </div>

            {questions.length > 0 ? (
              <div>
                  <h2>Existing Questions for Company: {getCompanyName()}</h2>

                <ul>
                  {editedQuestions.map((question, questionIndex) => (
                    <li key={question.id}>
                      <div className={styles.inputFieldWrapper}>
                        <label>
                          Question Text:
                          <input
                            type="text"
                            className={styles.inputEditQuestion}
                            name="questionText"
                            value={question.questionText}
                            onChange={event => handleQuestionChange(questionIndex, event)}
                          />
                        </label>
                      </div>
                      <ul>
                        {question.answers.map((answer, answerIndex) => (
                          <li key={answer.id}>
                            <div className={styles.inputFieldWrapper}>
                              <label>
                                Answer Text:
                                <input
                                  className={styles.inputEditQuestion}
                                  type="text"
                                  name="answerText"
                                  value={answer.answerText}
                                  onChange={event => handleAnswerChange(questionIndex, answerIndex, event)}
                                />
                              </label>
                            </div>
                            <div className={styles.inputFieldWrapper}>
                              <label>
                                Score Value D:
                                <input
                                  className={styles.inputFieldNumber}
                                  type="number"
                                  name="scoreValueD"
                                  value={answer.scoreValueD}
                                  onChange={event => handleAnswerChange(questionIndex, answerIndex, event)}
                                />
                              </label>
                            </div>
                            <div className={styles.inputFieldWrapper}>
                              <label>
                                Score Value I:
                                <input
                                  type="number"
                                  className={styles.inputFieldNumber}
                                  name="scoreValueI"
                                  value={answer.scoreValueI}
                                  onChange={event => handleAnswerChange(questionIndex, answerIndex, event)}
                                />
                              </label>
                            </div>
                            <div className={styles.inputFieldWrapper}>
                              <label>
                                Score Value S:
                                <input
                                  type="number"
                                  className={styles.inputFieldNumber}
                                  name="scoreValueS"
                                  value={answer.scoreValueS}
                                  onChange={event => handleAnswerChange(questionIndex, answerIndex, event)}
                                />
                              </label>
                            </div>
                            <div className={styles.inputFieldWrapper}>
                              <label>
                                Score Value C:
                                <input
                                  type="number"
                                  className={styles.inputFieldNumber}
                                  name="scoreValueC"
                                  value={answer.scoreValueC}
                                  onChange={event => handleAnswerChange(questionIndex, answerIndex, event)}
                                />
                              </label>
                            </div>
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
    </div>
  );

  
  
}

export default AdminEditQuestions;
