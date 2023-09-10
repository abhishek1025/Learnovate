
import React, { useState } from 'react'
import ErrorModal from '../../../comps/ErrorModal';
import TableList from '../../../comps/TableList';
import Loader from '../../../comps/Loader/Loader';
import { useReactQueryToFetch } from '../../../hooks/useReactQueryToFetch';


const ViewCourses = () => {

    const fetchCourseData = async () => {
        const res = await fetch('/subjects');
        const resData = await res.json();
        return resData.data;
    }

    const { isLoading, data: subjectsData, isError, error } = useReactQueryToFetch("subjects", fetchCourseData)

    const formatSubjectData = (subjects) => {
        return subjects.map((subject) => {
            return { ...subject, course: subject.course.title }
        })
    }

    const deleteSubject = async (id) => {
        const response = await fetch(`/subjects/${id}`, {
            method: "DELETE",
        })

        return response;
    }

    const columns = [
        { id: "title", label: "Subject Title", },
        { id: "code", label: "Code" },
        { id: "year", label: "Year" },
        { id: "course", label: "Course" },
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
                        rows={formatSubjectData(subjectsData)}
                        deleteFunction={deleteSubject}
                        editPageRoute={"edit-subject"}
                    />

                }

            </div>
        </div>
    )
}

export default ViewCourses