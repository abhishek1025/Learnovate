import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { formatDateTime } from '../../utils/formatDateAndTime'
import UpdateExamForm from '../components/UpdateExamForm'

const UpdateExam = () => {
    const { examID } = useParams()
    console.log(examID)

    const [examData, setExamData] = useState([])

    const [updateExamForm, setUpdateExamForm] = useState(false)

    const displayUpdateExamForm = () => {
        setUpdateExamForm(!updateExamForm)
    }

    const fetchExamData = async () => {
        const response = await fetch(`/exams`)
        const responseData = await response.json();
        console.log(responseData)
        setExamData(responseData.data)
    }

    useEffect(() => {
        fetchExamData();
    }, [])


    console.log(examData)


    return (
        <div>

            <div className=" px-4 py-2 mb-3 bg-gray-800">
                <h1 className="text-lg font-semibold text-white">
                    Update Exam
                </h1>
            </div>
            {/* cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between gap-8">
                {examData.map((data) => (
                    <div key={data._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div
                            className="bg-cover bg-center h-40"
                            style={{ backgroundImage: `url("https://png.pngtree.com/background/20210706/original/pngtree-notebook-keyboard-computer-laptop-background-picture-image_105116.jpg")` }}
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold mb-2">{data.title}</h2>
                            <p className="text-gray-600 mb-2">{data.subject}</p>
                            <p className="text-gray-600">Date: {formatDateTime(data.date)[0]}</p>
                            <p className="text-gray-600">Time: {formatDateTime(data.date)[1]}</p>
                            <p className="text-gray-600">Duration: {data.duration} minutes</p>

                            <button
                                className="bg-blue-600 w-full text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
                                onClick={displayUpdateExamForm}>
                                Update Exam
                            </button>

                            {
                                updateExamForm && (
                                    <UpdateExamForm displayUpdateExamForm={displayUpdateExamForm} examData={examData} />
                                )
                            }

                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default UpdateExam