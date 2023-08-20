import React, { useEffect, useState } from 'react';

//toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateUsers = () => {

    // storing the user details in a state
    const [user, setUser] = useState({
        name: '',
        email: '',
        role: '',
        phoneNumber: '',
        address: '',
    });

    // creating state to store the data for view table
    const [usersLists, setUsersLists] = useState([])

    // for input types
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // for creating a new user

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting user:', user);

        try {
            const response = await fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const responseData = await response.json();
            if (response.ok) {
                console.log('User created:', user);
                setUser({
                    name: '',
                    email: '',
                    role: '',
                    phoneNumber: '',
                    address: '',
                });
                console.log(response)
            }

            toast(responseData.message)

        } catch (error) {
            console.error('Error:', error);
        }
    };

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

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Create User</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="max-w-sm">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Role
                    </label>
                    <select
                        id="role"
                        name="role"
                        value={user.role}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded w-full"
                        required
                    >
                        <option value="">Select a role</option>
                        <option value="teacher">Teacher</option>
                        <option value="student">Student</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={user.phoneNumber}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={user.address}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"

                >
                    Create User
                </button>
            </form>

            <div>

            </div>
            <ToastContainer />
        </div>
    );
};

export default CreateUsers;
