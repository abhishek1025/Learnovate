import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


// form modal
const UpdateQuestion = ({ questions, setQuestions, showUpdateForm, updateExam }) => {

    const [updatedQuestion, setUpdatedQuestion] = useState({
        questionID: "",
        question: "",
        options: ["", "", "", ""],
        correctAns: "",
    });

    // 
    const handleUpdateQuestion = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/exams/${updatedQuestion.questionID}/questions`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedQuestion),
            });

            const responseData = await response.json();

            if (response.ok) {
                toast(responseData.message);
                // Update the questions state with the updated question
                const updatedQuestions = questions.map((question) =>
                    question._id === updatedQuestion.questionID ? updatedQuestion : question
                );
                setQuestions(updatedQuestions);
                showUpdateForm();
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            console.error('Error updating question:', error);
        }
    };
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>


            <div className="flex justify-center items-center bg-gray-100">
                <div className="w-full max-w-md p-4">
                    <h2 className="text-2xl font-semibold mb-4">Update Question</h2>
                    <form className="space-y-4" onSubmit={() => handleUpdateQuestion}>
                        <label className="block">
                            Question:
                            <input
                                type="text"
                                placeholder={updateExam.question}
                                className="w-full border border-gray-300 p-2 mt-1 rounded"
                            />
                        </label>
                        {updatedQuestion.options.map((option, index) => (
                            <label key={index} className="block">
                                Option {index + 1}:
                                <input
                                    type="text"
                                    value={option}
                                    placeholder={updateExam.options}
                                    className="w-full border border-gray-300 p-2 mt-1 rounded"
                                />
                            </label>
                        ))}
                        <label className="block">
                            Correct Answer:
                            <input
                                type="text"
                                placeholder={updateExam.correctAns}
                                className="w-full border border-gray-300 p-2 mt-1 rounded"
                            />
                        </label>
                        <div className='flex gap-x-5'>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                            >
                                Update Question
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                                onClick={() => showUpdateForm()}
                            >
                                Exit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};



const QuestionsList = ({ questions, setQuestions }) => {
    const [updateForm, setUpdateForm] = useState(false);
    const showUpdateForm = () => {
        setUpdateForm(!updateForm);
    };

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
    }

    const [questionStates, setQuestionStates] = useState([]);

    useEffect(() => {
        const initialStates = questions.map((question) => ({
            questionID: question._id,
            question: question.question,
            options: [...question.options],
            correctAns: question.correctAns,
        }));
        setQuestionStates(initialStates);
    }, [questions]);

    return (
        <div className="flex justify-center items-center bg-gray-100">
            <ToastContainer />
            <div className="grid grid-cols-3 w-full md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
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
                            {updateForm && (
                                <UpdateQuestion
                                    showUpdateForm={showUpdateForm}
                                    updateExam={questionStates[index]} // Pass the specific state
                                />
                            )}
                            <button
                                className="w-24 h-8 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                                onClick={showUpdateForm}
                            >
                                Update
                            </button>
                            <button
                                className="w-24 h-8 rounded-md bg-red-500 text-white hover:bg-red-600 transition duration-300"
                                onClick={() => handleDeleteQuestion(question._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionsList;
