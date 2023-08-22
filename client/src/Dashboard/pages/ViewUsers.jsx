import React, { useEffect, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateUserForm = ({ showUpdateForm, user }) => {

    const [updatedData, setUpdatedData] = useState({
        name: '',
        role: '',
        phoneNumber: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({
            ...prevData, [name]: value,
        }))
    }

    const updateUser = async (email) => {
        const response = await fetch('/users/change-password', {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(updatedData)
        })

        const responseData = await response.json();
        if (response.ok) {
            toast(responseData.message)
        }

    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-2">Update User</h2>
                <form onSubmit={updateUser}>
                    <div className="mb-4">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role">Role:</label>
                        <input
                            type="text"
                            id="role"
                            name="role"
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
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            onClick={showUpdateForm}
                        >
                            Exit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ViewUsers = () => {
    // creating state to store the data for view table
    const [usersLists, setUsersLists] = useState([])

    const [updateForm, setUpdateForm] = useState(false)
    const showUpdateForm = () => {
        setUpdateForm(!updateForm)
    }

    const fetchUserData = async () => {
        // Fetch the updated list of users after creating a new user
        const userListResponse = await fetch('/users');
        const userListData = await userListResponse.json();
        console.log(userListData)
        setUsersLists(userListData.data);
    }

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

            console.log(responseData)
        }
    }


    return (
        <div className='relative'>
            {/* for update form  */}
            {
                updateForm && (
                    <UpdateUserForm showUpdateForm={showUpdateForm} />
                )
            }
            {/* view section */}
            <div className=''>
                <h1>View Users</h1>
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="p-3 font-medium text-left text-gray-800 border border-gray-300">
                                Name
                            </th>
                            <th className="p-3 font-medium text-left text-gray-800 border border-gray-300">
                                E-mail
                            </th>
                            <th className="p-3 font-medium text-left text-gray-800 border border-gray-300">
                                Role
                            </th>
                            <th className="p-3 font-medium text-left text-gray-800 border border-gray-300">
                                Phone Number
                            </th>
                            <th className="p-3 font-medium text-left text-gray-800 border border-gray-300">
                                Address
                            </th>
                            <th className="p-3 font-medium text-left text-gray-800 border border-gray-300">

                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            usersLists.map((user, index) => (
                                <tr key={index}>
                                    <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                                        {user.name}
                                    </td>
                                    <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                                        {user.email}
                                    </td>
                                    <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                                        {user.role}
                                    </td>
                                    <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                                        {user.phoneNumber}
                                    </td>
                                    <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                                        {user.address}
                                    </td>
                                    <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                                        <button className="px-2 py-1 bg-blue-600 text-white rounded-md mr-2" onClick={showUpdateForm}>
                                            Update
                                        </button>
                                        <button className="px-2 py-1 bg-red-600 text-white rounded-md" onClick={deleteUser(user.email)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>

            <ToastContainer />
        </div>
    )
}

export default ViewUsers

