import React, { useEffect, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserDataFromLocalStorage } from '../../../utils/getUserDataFromLocalStorage';
import TableList from '../../../comps/TableList';
import { useQuery } from 'react-query';
import Loader from '../../../comps/Loader/Loader';
import ErrorModal from '../../../comps/ErrorModal';
import { useReactQueryToFetch } from '../../../hooks/useReactQueryToFetch';


const fetchTeachersData = async () => {
    const res = await fetch('/teachers');
    const resData = await res.json();
    return resData.data;
}

const ViewTeachers = () => {

    const { isLoading, data: teachersData, isError, error } = useReactQueryToFetch("teachers", fetchTeachersData);

    const deleteTeacher = async (id) => {
        return await fetch(`/teachers/${id}`, {
            method: "DELETE",
        })
    }

    const columns = [
        { id: "name", label: "Name", },
        { id: "email", label: "Email", },
        {
            id: "phoneNumber",
            label: "Phone Number",
            align: "right",
        },
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
                        Teachers
                    </h1>
                </div>

                {
                    <TableList
                        columns={columns}
                        rows={[...teachersData.map(({ _id, name, email, phoneNumber }) => { return { _id, name, email, phoneNumber } })]}
                        deleteFunction={deleteTeacher}
                        editPageRoute="edit-teacher"
                    />

                }

            </div>

            <ToastContainer />
        </div>
    )

}
export default ViewTeachers

