import React, { useEffect, useState } from 'react'

const ViewUsers = () => {
    // creating state to store the data for view table
    const [usersLists, setUsersLists] = useState([])

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
        <div>
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
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
            <div className='flex gap-x-5 mt-5'>
                <button className='w-24 h-10 bg-green-600 text-white'>Update</button>
                <button className='w-24 h-10 bg-red-600 text-white'>Delete</button>
            </div>
        </div>
    )
}

export default ViewUsers