import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateExamForm = ({ displayUpdateExamForm, examData }) => {
    const { examID } = useParams();
    console.log(examID)
    const [formData, setFormData] = useState();
    console.log(examData)
    const handleSubmit = () => {

    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-5 z-50">
            <div className="bg-white w-96 p-6 rounded-lg ">
                <h2 className="text-lg font-semibold mb-4">Update Exam</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title" className="block font-medium">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block font-medium">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="date" className="block font-medium">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="duration" className="block font-medium">
                            Duration
                        </label>
                        <input
                            type="text"
                            id="duration"
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            onClick={displayUpdateExamForm}
                            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
                        >
                            Exit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateExamForm;
