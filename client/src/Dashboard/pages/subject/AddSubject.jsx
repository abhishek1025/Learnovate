import React, { useState } from 'react';
import swal from 'sweetalert';
import NormalButton from '../../../comps/Buttons/NormalButton';
import ErrorModal from '../../../comps/ErrorModal';
import Loader from '../../../comps/Loader/Loader';
import { useReactQueryToFetch } from '../../../hooks/useReactQueryToFetch';

const AddSubject = () => {

    const fetchCourseData = async () => {
        const res = await fetch('/courses');
        const resData = await res.json();
        return resData.data;
    }

    const { isLoading, data: courseData, isError } = useReactQueryToFetch("courses", fetchCourseData)

    const [displayLoader, setDisplayLoader] = useState(false);
    const [error, setError] = useState(false);

    const defaultSubjectInfo = {
        title: "",
        code: "",
        courseID: "",
        year: "",
    }

    const [subjectInfo, setSubjectInfo] = useState(defaultSubjectInfo);

    const handleInputChange = (e) => {
        setSubjectInfo((prevSubjectInfo) => {
            return { ...prevSubjectInfo, [e.target.name]: e.target.value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            setDisplayLoader(true);

            const res = await fetch("/subjects", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(subjectInfo)
            })

            const resMsg = await res.json();

            if (res.ok) {
                setDisplayLoader(false);
                swal("", resMsg.message, "success");
                setSubjectInfo(defaultSubjectInfo)
                return;
            }

            setDisplayLoader(false);
            swal("", resMsg.message, "error");
        } catch (error) {
            setDisplayLoader(false);
            setError(true)
        }
    }

    if (isLoading) {
        return <Loader />
    }


    if (isError) {
        return <ErrorModal message="An unexpected error encountered" />
    }


    return (
        <div>
            {
                displayLoader && (
                    <Loader />
                )
            }

            {error && <ErrorModal message="An unexpected error encountered" />}

            <div className=" px-4 py-2 mb-3 bg-gray-800">
                <h1 className="text-lg font-semibold text-white">
                    Add Subject
                </h1>
            </div>

            <form onSubmit={(e) => handleSubmit(e)} className="bg-white p-10 shadow-md rounded-lg">
                <div className="mb-4">
                    <label htmlFor="subject title" className="block text-sm font-medium text-gray-700">
                        Subject Title
                    </label>
                    <input
                        type="text"
                        id="subject title"
                        name="title"
                        value={subjectInfo.title}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                        Subject  Code
                    </label>
                    <input
                        type="text"
                        id="code"
                        name="code"
                        value={subjectInfo.code}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="courseID" className="block text-sm font-medium text-gray-700">
                        Course
                    </label>

                    <select
                        name="courseID"
                        id="courseID"
                        value={subjectInfo.courseID}
                        className="mt-1 p-2 border rounded w-full"
                        onChange={handleInputChange}
                    >
                        <option value="">Select Course</option>
                        {
                            courseData.map(({ _id, title }) => (
                                <option key={_id} value={_id}>{title}</option>
                            ))
                        }
                    </select>

                </div>



                <div className="mb-4">
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                        Year
                    </label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={subjectInfo.year}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
                </div>

                <NormalButton type="submit">
                    Add Course
                </NormalButton>

            </form>
        </div>

    )
}

export default AddSubject