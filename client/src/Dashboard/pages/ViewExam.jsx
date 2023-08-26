import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatDateTime } from '../../utils/formatDateAndTime'

const ViewExam = () => {

    const [examData, setExamData] = useState([])

    const fetchAllExam = async () => {
        const response = await fetch('/exams')
        const responseData = await response.json();
        setExamData(responseData.data)
    }

    useEffect(() => {
        fetchAllExam();
    }, [])

    return (
        <div>

            <div className=" px-4 py-2 mb-3 bg-gray-800">
                <h1 className="text-lg font-semibold text-white">
                    View Exam
                </h1>
            </div>
            {/* cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between gap-10 mt-10">
                {examData.map((data) => (
                    <div key={data._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div
                            className="bg-cover bg-center h-40"
                            style={{ backgroundImage: `url("https://png.pngtree.com/background/20210706/original/pngtree-notebook-keyboard-computer-laptop-background-picture-image_105116.jpg")` }}
                        />
                        <div className="p-4">

                            <div className='flex justify-between items-center'>
                                <h2 className="text-lg font-semibold mb-2">{data.title.toUpperCase()}</h2>
                                <p className="text-gray-600 mb-2">{data.subject.toUpperCase()}</p>
                            </div>

                            <p className="text-gray-600">Date: {formatDateTime(data.date)[0]}</p>
                            <p className="text-gray-600">Time: {formatDateTime(data.date)[1]}</p>
                            <p className="text-gray-600">Duration: {data.duration} minutes</p>

                            <Link
                                to={`/admin/view-exam/${data._id}`}

                            >
                                <button className="bg-blue-600 w-full text-white px-4 py-2 rounded hover:bg-blue-700 my-3">
                                    View
                                </button>
                            </Link>
                            <button
                                className="bg-red-600 w-full text-white px-4 py-2 rounded hover:bg-red-700 mb-2"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ViewExam