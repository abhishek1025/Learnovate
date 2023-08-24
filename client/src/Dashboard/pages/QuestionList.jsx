import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const QuestionsList = ({ questions, setQuestions }) => {
    const { examID } = useParams();

    const handleDeleteQuestion = async (questionID) => {
        const response = await fetch(`/exams/${examID}/questions`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ questionID }),
        });

        console.log(questionID)

        const responseData = await response.json();

        if (response.ok) {
            const updatedQuestions = questions.filter(question => question._id !== questionID);
            toast(responseData.message);
            setQuestions(updatedQuestions);
        }
    };



    return (
        <div className="flex justify-center items-center bg-gray-100">
            <ToastContainer />
            <div className="grid grid-cols-3 w-full md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                {questions?.map((question, index) => (
                    <div key={index} className="bg-white rounded-md shadow-md p-4">
                        <h3 className="text-lg font-semibold mb-2">Question {index + 1}:</h3>
                        <p className="mb-2">{question.question}</p>
                        <ul className="list-disc pl-6 mb-2">
                            {question.options.map((option, optionIndex) => (
                                <li key={optionIndex}>{option}</li>
                            ))}
                        </ul>
                        <p className="font-semibold">Correct Answer: {question.options[question.correctAns]}</p>
                        <div className="flex gap-x-4 pt-2">

                            <Link to={`/update-question/${examID}`}>

                                <button
                                    className="w-24 h-8 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-300">Update</button>
                            </Link>

                            <button
                                className="w-24 h-8 rounded-md bg-red-500 text-white hover:bg-red-600 transition duration-300"
                                onClick={() => handleDeleteQuestion(question._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionsList;
