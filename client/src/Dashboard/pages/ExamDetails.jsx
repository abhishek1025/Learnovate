import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { formatDateTime } from '../../utils/formatDateAndTime';
import CreateQuestion from './CreateQuestion';
import QuestionsList from './QuestionList';

const ExamDetails = () => {
    const { examID } = useParams();
    const [examDetails, setExamDetails] = useState({})
    const [questions, setQuestions] = useState([])
    const fetchExamDetails = async () => {
        const response = await fetch(`/exams/${examID}`)
        const responseData = await response.json()
        setExamDetails(responseData.data)
        setQuestions(responseData.data.questions)
    }

    useEffect(() => {
        fetchExamDetails()
    }, [])


    return (
        <div>
            <ToastContainer />

            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2">{examDetails.title}</h2>
                <p className="text-gray-600 mb-2">{examDetails.subject}</p>
                <p className="text-gray-600">Date: {
                    examDetails.date && formatDateTime(examDetails.date)[0]
                } </p>

                <p className="text-gray-600">Time: {
                    examDetails.date && formatDateTime(examDetails.date)[1]
                } </p>
                <p className="text-gray-600">Duration: {examDetails.duration} minutes</p>
            </div>
            {/* page for creating question */}
            <div>
                <CreateQuestion examDetails={examDetails} />
            </div>
            <div className='mt-5'>
                <QuestionsList questions={questions} setQuestions={setQuestions} />
            </div>
        </div>

    )
}

export default ExamDetails