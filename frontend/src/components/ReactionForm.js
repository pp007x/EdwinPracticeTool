import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../Css/ReactionForm.module.css';
import config from '../config';

const ReactionForm = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileAndQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        const localConfig = {
          headers: { Authorization: `Bearer ${token}` }
        };
        
        // Fetch the profile data
        const profileResponse = await axios.get(`${config.API_BASE_URL}/api/Users/Profile`, localConfig);
        
        // Use the CompanyId from the profile data to fetch the questions
        const questionsResponse = await axios.get(`${config.API_BASE_URL}/api/ReactionForm?companyId=${profileResponse.data.companyId}`, localConfig);
        
        // Store the UserId
        setUserId(profileResponse.data.id);

        setQuestions(questionsResponse.data);
      } catch (error) {
        console.error('Failed to fetch profile or questions:', error);
      }
    };
    fetchProfileAndQuestions();
  }, []);

  const handleAnswerChange = (questionId, answerId) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answerId
    }));
  };

  const calculateTotalScore = () => {
    let totalScoreD = 0;
    let totalScoreI = 0;
    let totalScoreS = 0;
    let totalScoreC = 0;

    for (let question of questions) {
      const answerId = answers[question.id];
      if (answerId) {
        const selectedAnswer = question.answers.find(answer => answer.id === answerId);
        if (selectedAnswer) {
          totalScoreD += selectedAnswer.scoreValueD;
          totalScoreI += selectedAnswer.scoreValueI;
          totalScoreS += selectedAnswer.scoreValueS;
          totalScoreC += selectedAnswer.scoreValueC;
        }
      }
    }

    return {
      scoreValueD: totalScoreD,
      scoreValueI: totalScoreI,
      scoreValueS: totalScoreS,
      scoreValueC: totalScoreC,
      userId: userId
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const totalScore = calculateTotalScore();

    try {
      const token = localStorage.getItem('token');
      const localConfig = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.post(
        `${config.API_BASE_URL}/api/TotalScores`,
        totalScore,
        localConfig
      );
      console.log(response.data);

      navigate('/dashboard');
    } catch (error) {
      console.error("Failed to submit total score:", error);
    }
  };

  return (
    <div className={styles["form-control"]}>
      {questions.length > 0 ? (
        <form onSubmit={handleSubmit}>
          {questions.map((question) => (
            <div key={question.id}>
              <label>
                {question.questionText}
                <div className={styles["answer-options"]}>
                  {question.answers.map((answer) => (
                    <label htmlFor={answer.id.toString()} key={answer.id}>
                      <input
                        type="radio"
                        id={answer.id.toString()}
                        name={question.id.toString()}
                        value={answer.id}
                        onChange={() => handleAnswerChange(question.id, answer.id)}
                      />
                      {answer.answerText}
                    </label>
                  ))}
                </div>
              </label>
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ReactionForm;
