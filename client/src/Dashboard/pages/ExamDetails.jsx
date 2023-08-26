import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { formatDateTime } from '../../utils/formatDateAndTime';
import QuestionsList from '../components/QuestionList';
import CreateQuestion from '../components/CreateQuestion';

const ExamDetails = () => {

    const { examID } = useParams();

    const [examDetails, setExamDetails] = useState({})
    const [questions, setQuestions] = useState([])

    const [displayQuestionCreationForm, setDisplayQuestionCreationForm] = useState(false)

    // To toggle between update and add question operation
    const [questionToUpdate, setQuestionToUpdate] = useState(null);
    const [operationType, setOperationType] = useState("Add")


    const fetchExamDetails = async () => {
        const response = await fetch(`/exams/${examID}`)
        const responseData = await response.json()
        setExamDetails(responseData.data)
        setQuestions(responseData.data.questions)
    }

    // To reset the form into add new question form
    const resetCreateQuestionCompForm = () => {
        setQuestionToUpdate(null)
        setOperationType("Add")
        setDisplayQuestionCreationForm(false)
    }

    // To set the form into update question form
    const setOperationTypeForForm = (question) => {
        setQuestionToUpdate(question)
        setOperationType("Update")
        setDisplayQuestionCreationForm(true)
    }

    useEffect(() => {
        fetchExamDetails()
    }, [displayQuestionCreationForm])


    return (
        <div>
            <ToastContainer />

            <div className="container mx-auto p-6 bg-gray-100">

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">

                    <h2 className="text-2xl font-semibold mb-3">{examDetails.title}</h2>
                    <p className="text-gray-600 mb-2">{examDetails.subject}</p>
                    <p className="text-gray-600">Date: {examDetails.date && formatDateTime(examDetails.date)[0]}</p>
                    <p className="text-gray-600">Time: {examDetails.date && formatDateTime(examDetails.date)[1]}</p>
                    <p className="text-gray-600">Duration: {examDetails.duration} minutes</p>

                    <button
                        className="px-8 py-2 mt-5 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                        onClick={() => setDisplayQuestionCreationForm(true)}
                    >
                        Add Question
                    </button>
                </div>


            </div>

            {/* page for creating question */}
            {
                displayQuestionCreationForm && (
                    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 flex items-center justify-center w-full h-[100%]'>

                        <CreateQuestion
                            questionToUpdate={questionToUpdate}
                            operationType={operationType}
                            setDisplayQuestionCreationForm={setDisplayQuestionCreationForm}
                            resetCreateQuestionCompForm={resetCreateQuestionCompForm}
                        />
                    </div>

                )
            }


            {/* Question List */}
            <div className='mt-5'>
                <QuestionsList
                    questions={questions}
                    setQuestions={setQuestions}
                    setOperationTypeForForm={setOperationTypeForForm}
                />
            </div>
        </div>

    )
}

export default ExamDetails