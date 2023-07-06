import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../Css/ReactionForm.module.css';
import config from '../../config';

const ReactionFormOpen = () => {
  const [questions, setQuestions] = useState([]);
  const [openAnswers, setOpenAnswers] = useState({});
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileAndQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        const localConfig = {
          headers: { Authorization: `Bearer ${token}` }
        };
        
        const profileResponse = await axios.get(`${config.API_BASE_URL}/api/Users/Profile`, localConfig);
        const questionsResponse = await axios.get(`${config.API_BASE_URL}/api/OpenReactionForm/open`, localConfig, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        setUserId(profileResponse.data.id);
        setQuestions(questionsResponse.data);
      } catch (error) {
        console.error('Failed to fetch profile or questions:', error);
      }
    };
    fetchProfileAndQuestions();
  }, []);


  const handleOpenAnswerChange = (questionId, answerText) => {
    setOpenAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answerText
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
      const localConfig = {
        headers: { Authorization: `Bearer ${token}` }
      };
  
      const formattedOpenAnswers = Object.entries(openAnswers).map(([questionId, answerText]) => ({
        questionId: parseInt(questionId),
        answerText
      }));
  
      const responseOpenAnswers = await axios.post(
        `${config.API_BASE_URL}/api/OpenReactionForm/openanswers`,
        formattedOpenAnswers,
        localConfig
      );
  
      navigate('/opendashboard');
    } catch (error) {
      console.error("Failed to submit open answers:", error);
    }
  };
  

  return (
    <div className={styles["form-control"]}>
      {questions.length > 0 ? (
        <form className={styles["reactionform"]} onSubmit={handleSubmit}>
          <h1>Vragenlijst</h1>
          {questions.map((question) => (
            <div className={styles["questionform"]} key={question.id}>
              <label htmlFor={`question-${question.id}`}>
                {question.questionText}
              </label>
              <div>
              <textarea
                id={`question-${question.id}`}
                onChange={(e) => handleOpenAnswerChange(question.id, e.target.value)}
              />
              </div>
            </div>
          ))}
          <div className={styles["button"]}>
            <button type="submit">Submit</button>
          </div>
        </form>
      ) : (
        <p>There are no questions</p>
      )}
    </div>
  );
};

export default ReactionFormOpen;
