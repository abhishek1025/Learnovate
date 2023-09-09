import React, { useEffect, useRef, useState } from 'react';

//toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../../comps/Loader/Loader';

const AddTeacher = () => {

    const [displayLoader, setDisplayLoader] = useState(false);

    const defaultUserInfo = {
        name: '',
        email: '',
        gender: '',
        phoneNumber: '',
        address: '',
        joiningDate: '',
        subjectID: "64f4546b1ffb9958db59f19d"
    }

    // storing the user details in a state
    const [user, setUser] = useState(defaultUserInfo);

    const [profileImg, setProfileImg] = useState("")

    const profileImgInputRef = useRef();

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

        setDisplayLoader(true);
        
        const displayLoaderTimeout = setTimeout(() => setDisplayLoader(false), 3000)

        const formData = new FormData();
        formData.append("file", profileImg);
        formData.append("teacherDetails", JSON.stringify(user));

        try {
            const response = await fetch('/teachers', {
                method: 'POST',
                body: formData,
            });

            const responseData = await response.json();

            if (response.ok) {
                clearTimeout(displayLoaderTimeout);
                if (profileImgInputRef.current) {
                    profileImgInputRef.current.value = "";
                }
                setUser(defaultUserInfo);
                toast.success(responseData.message)
                return;
            }

            if (!displayLoader) {
                toast.error(responseData.message)
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className="">

            {
                displayLoader && (
                    <Loader />
                )
            }

            <div className=" px-4 py-2 mb-3 bg-gray-800">
                <h1 className="text-lg font-semibold text-white">
                    Add Teacher
                </h1>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className="bg-white p-10 shadow-md rounded-lg">
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

                {/* <div className="mb-4">
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
                </div> */}

                <div className="mb-4">
                    <label htmlFor="profileImg" className="block text-sm font-medium text-gray-700">
                        Profile Image
                    </label>
                    <input
                        type="file"
                        id="profileImg"
                        name="profileImg"
                        ref={profileImgInputRef}
                        onChange={(e) => setProfileImg(e.target.files[0])}
                        className="mt-1 p-2 border rounded w-full"
                        required
                        accept='image/*'
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                        Gender
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        value={user.gender}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded w-full"
                        required
                    >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="joiningDate" className="block text-sm font-medium text-gray-700">
                        Joining Date
                    </label>
                    <input
                        type="date"
                        id="joiningDate"
                        name="joiningDate"
                        value={user.joiningDate}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
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
                    Add Teacher
                </button>
            </form>

            <div>

            </div>
            <ToastContainer />
        </div>
    );
};

export default AddTeacher;
