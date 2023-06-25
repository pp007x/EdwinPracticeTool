import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function QuestionForm({ loggedInUserId }) {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:5162/api/Users/Questions")
            .then(response => {
                setQuestions(response.data);
            });
    }, []);

    const handleAnswerChange = (questionId, scoreValue) => {
        setAnswers({
            ...answers,
            [questionId]: scoreValue
        });
    };

    const handleSubmit = () => {
        const totalScoreValue = Object.values(answers).reduce((a, b) => a + b, 0);
        const totalScore = {
            TotalScoreValue: totalScoreValue
        };
    
        // Get the JWT token from local storage
        const token = localStorage.getItem('token');
    
        axios.post("http://localhost:5162/api/Users/TotalScores", totalScore, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        navigate('/home');
    };
    

    return (
        <div>
            <h1>Questions</h1>
            {questions.map(question => (
                <div key={question.id}>
                    <h2>{question.questionText}</h2>
                    {question.answers.map(answer => (
                        <div key={answer.id}>
                            <input 
                                type="radio" 
                                id={answer.id} 
                                name={question.id} 
                                value={answer.scoreValue} 
                                onChange={() => handleAnswerChange(question.id, answer.scoreValue)}
                            />
                            <label htmlFor={answer.id}>{answer.answerText}</label>
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default QuestionForm;
