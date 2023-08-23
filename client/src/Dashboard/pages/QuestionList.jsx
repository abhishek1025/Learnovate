import React, { useState, useEffect } from 'react';

const QuestionsList = ({ examID, examData, questionDetails }) => {
    console.log("examData data is", examData)
    const [questions, setQuestions] = useState([]);
    // console.log("this is examdata", examData)
    // console.log('this is ques details', questionDetails)
    // const fetchQuestions = async () => {
    //     const response = await fetch(`/exams/${examID}/questions`)
    //     const responseData = await response.json()
    //     if (response.ok) {
    //         setQuestions()
    //     }
    // }

    // useEffect(() => {
    //     fetchQuestions();
    // }, []);

    return (
        <div>
            <h2>Questions:</h2>
            {examData.map((question, index) => (
                <div key={index}>
                    <h3>Question {index + 1}:</h3>
                    <p>{question.question}</p>
                    <ul>
                        {question.options.map((option, optionIndex) => (
                            <li key={optionIndex}>{option}</li>
                        ))}
                    </ul>
                    <p>Correct Answer: {question.options[question.correctAns]}</p>
                </div>
            ))}
        </div>
    );
};

export default QuestionsList;
