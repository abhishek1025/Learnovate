import React, { useEffect, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserDataFromLocalStorage } from '../../../utils/getUserDataFromLocalStorage';
import TableList from '../../../comps/TableList';
import { useQuery } from 'react-query';
import Loader from '../../../comps/Loader/Loader';
import ErrorModal from '../../../comps/ErrorModal';

const UpdateUserForm = ({ showUpdateForm, user, setUsersLists }) => {

    const [formData, setFormData] = useState(user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateUser = async (e) => {
        e.preventDefault();

        const response = await fetch(`/users/${user.email}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                updatedData: formData,
            }),
        });

        const responseData = await response.json();

        if (response.ok) {
            toast.success(responseData.message);
            showUpdateForm();
            setUsersLists((prevLists) => [...prevLists.map((item) => {
                if (item.email === formData.email) {
                    return {
                        ...item, ...formData
                    }
                }
                return item;
            })])
        }

    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-2">Update User</h2>
                <form onSubmit={(e) => updateUser(e)}>

                    <div className="mb-4">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData?.name}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData?.phoneNumber}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData?.address}

                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div className="flex gap-x-3 mt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"

                        >
                            Update
                        </button>
                        <button
                            type="button"
                            className="text-white px-4 py-2 rounded bg-red-500"
                            onClick={() => showUpdateForm()}
                        >
                            Exit
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

const fetchUserData = async () => {
    const res = await fetch('/teachers');
    const resData = await res.json();
    return resData.data;
}

const ViewTeachers = () => {

    const { isLoading, data: teachersData, isError, error } = useQuery("teachers", fetchUserData)

    // creating state to store the data for view table
    const [usersLists, setUsersLists] = useState([])
    const [openUpdateFormForUser, setOpenUpdateFormForUser] = useState(null);

    const showUpdateForm = (email) => {
        setOpenUpdateFormForUser(email);
    };


    useEffect(() => {
        fetchUserData();
    }, [])

    const deleteUser = (email) => {
        return async () => {
            const response = await fetch(`/users/${email}`, {
                method: "DELETE",
            })

            const responseData = await response.json();

            const deleteUserState = usersLists.filter((item) => item.email !== email)
            setUsersLists(deleteUserState)

            toast(responseData.message)

        }
    }

    // const isAdmin = getUserDataFromLocalStorage()?.user?.role === 'admin';

    const columns = [
        { id: "name", label: "Name", minWidth: 170 },
        { id: "email", label: "Email", minWidth: 100 },
        {
            id: "phoneNumber",
            label: "Phone Number",
            minWidth: 170,
            align: "right",
        },
    ]

    if (isLoading) {
        return <Loader />
    }


    if (isError) {
        return <ErrorModal message={error.message} />
    }

    return (
        <div className='relative'>

            {/* view section */}
            <div className=''>
                <div className=" px-4 py-2 mb-3 bg-gray-800">
                    <h1 className="text-lg font-semibold text-white">
                        View Teachers
                    </h1>
                </div>

                {
                    <TableList
                        columns={columns}
                        rows={[...teachersData.map(({ _id, name, email, phoneNumber }) => { return { _id, name, email, phoneNumber } })]}
                    />

                }


            </div>

            <ToastContainer />
        </div>
    )
}

export default ViewTeachers

