import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateQuestion = () => {
    const { examID } = useParams();
    const [question, setQuestion] = useState({
        questionID: "",
        question: "",
        options: ["", "", "", ""],
        correctAns: "",
    });



    const fetchQuestionData = async () => {
        try {
            const response = await fetch(`/exams/${examID}/questions`);
            const data = await response.json();
            setQuestion(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchQuestionData();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setQuestion(prevQuestion => ({
            ...prevQuestion,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`/exams/${examID}/questions`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(question),
            });

            const data = await response.json();
            console.log(data.message); // Success message from the server
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <>


            <div className="container mx-auto mt-8">
                <h2 className="text-2xl font-bold mb-4">Update Question</h2>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="mb-4">
                        <label className="block font-medium mb-2">Question:</label>
                        <input
                            type="text"
                            name="question"
                            value={question.question}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    {/* ... Other form inputs */}
                    <input type="text" name="question" value={question.question} onChange={handleChange} />
                    {question.options.map((option, index) => (
                        <input
                            key={index}
                            type="text"
                            name={`options[${index}]`}
                            value={option}
                            onChange={handleChange}
                        />
                    ))}
                    <select name="correctAns" value={question.correctAns} onChange={handleChange}>
                        {question.options.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Update Question
                        </button>
                    </div>
                </form>
            </div>
            {/*  */}

        </>
    );
};

export default UpdateQuestion;
