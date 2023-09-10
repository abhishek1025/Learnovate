
import React, { useState } from 'react'
import ErrorModal from '../../../comps/ErrorModal';
import TableList from '../../../comps/TableList';
import Loader from '../../../comps/Loader/Loader';
import { useReactQueryToFetch } from '../../../hooks/useReactQueryToFetch';


const ViewCourses = () => {

    const fetchCourseData = async () => {
        const res = await fetch('/courses');
        const resData = await res.json();
        return resData.data;
    }

    const { isLoading, data: courseData, isError, error } = useReactQueryToFetch("courses", fetchCourseData)

    const deleteCourse = async (id) => {
        const response = await fetch(`/courses/${id}`, {
            method: "DELETE",
        })

        return response;
    }

    const columns = [
        { id: "title", label: "Course Title", },
        { id: "duration", label: "Duration" },
    ]

    if (isLoading) {
        return <Loader />
    }


    if (isError) {
        return <ErrorModal message="An unexpected error encountered" />
    }

    return (
        <div className='relative'>

            {/* view section */}
            <div className=''>
                <div className=" px-4 py-2 mb-3 bg-gray-800">
                    <h1 className="text-lg font-semibold text-white">
                        Courses
                    </h1>
                </div>

                {
                    <TableList
                        columns={columns}
                        rows={courseData}
                        deleteFunction={deleteCourse}
                        editPageRoute={"edit-course"}
                    />

                }

            </div>
        </div>
    )
}

export default ViewCourses