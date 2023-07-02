import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import styles from '../Css/ReactionForm.module.css';

const QuestionForm = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const result = await axios.get("http://localhost:5162/api/Questions");
        setQuestions(result.data);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };
    fetchQuestions();
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
      scoreValueC: totalScoreC
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const totalScore = calculateTotalScore();

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.post(
        "http://localhost:5162/api/TotalScores",
        totalScore,
        config
      );
      console.log(response.data);

      navigate('/dashboard');
    } catch (error) {
      console.error("Failed to submit total score:", error);
    }
  };

  return (
    <div className={"form-control"}>
      {questions.length > 0 ? (
        <form onSubmit={handleSubmit}>
          {questions.map((question) => (
            <div key={question.id}>
              <label>
                {question.questionText}
                <div className="answer-options">
                  {question.answers.map((answer) => (
                    <label htmlFor={answer.id.toString()} key={answer.id}>
                      <input
                        type="radio"
                        id={answer.id.toString()}
                        name={question.id.toString()}
                        value={answer.id}
                        checked={answers[question.id] === answer.id}
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
        <div>No questions loaded</div>
      )}
    </div>
  );
};

export default QuestionForm;
