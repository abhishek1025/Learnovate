import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import ErrorModal from '../../../comps/ErrorModal';
import Loader from '../../../comps/Loader/Loader';
import NormalButton from '../../../comps/Buttons/NormalButton';

const AddCourse = () => {

    const [displayLoader, setDisplayLoader] = useState(false);
    const [error, setError] = useState(false);

    const defaultCourseInfo = {
        title: "",
        duration: ""
    }

    const [courseInfo, setCourseInfo] = useState(defaultCourseInfo);

    const handleInputChange = (e) => {
        setCourseInfo((prevCourseInfo) => {
            return { ...prevCourseInfo, [e.target.name]: e.target.value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setDisplayLoader(true);

            const res = await fetch("/courses", {
                method: "POST",
                body: JSON.stringify(courseInfo),
                headers: {
                    "content-type": "application/json"
                }
            })

            const resMsg = await res.json();

            if (res.ok) {
                setDisplayLoader(false);
                swal("", resMsg.message, "success")
                setCourseInfo(defaultCourseInfo)
                return;
            }

            setDisplayLoader(false);
            swal("", resMsg.message, "error")


        } catch (error) {
            setError(true)
        }
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
                    Add  Course
                </h1>
            </div>

            <form onSubmit={(e) => handleSubmit(e)} className="bg-white p-10 shadow-md rounded-lg">
                <div className="mb-4">
                    <label htmlFor="course title" className="block text-sm font-medium text-gray-700">
                        Course Title
                    </label>
                    <input
                        type="text"
                        id="course title"
                        name="title"
                        value={courseInfo.title}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                        Duration (In Years)
                    </label>
                    <input
                        type="number"
                        id="duration"
                        name="duration"
                        value={courseInfo.duration}
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

export default AddCourse