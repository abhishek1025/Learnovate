import React, { useEffect, useRef, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { formatDateTime } from '../utils/formatDateAndTime';


const AddCourseFiles = () => {

    const [courseFile, setCourseFile] = useState("")
    const [courseFiles, setCourseFiles] = useState([])

    const [link, setLink] = useState("")
    const [links, setLinks] = useState([])

    const [exams, setExams] = useState([]);

    const [selectedExam, setSelectedExam] = useState("")

    const fileInput = useRef()



    const deleteFiles = (fileName) => {
        return () => {
            setCourseFiles((prevFiles) => [...prevFiles.filter((file) => file.name !== fileName)])
        }
    }

    const deleteLinks = (linkToDelete) => {
        return () => {
            setLinks((prevFiles) => [...prevFiles.filter((link) => link !== linkToDelete)])
        }
    }

    function generateBoundary() {
        return '--------------------------' + Date.now().toString(16);
    }


    const addCourseMaterials = () => async () => {

        if (!selectedExam) {
            toast("Please select the exam")
            return;
        }

        if (links.length === 0 && courseFiles.length === 0) {
            toast("Add some files or links")
            return;
        }

        const formData = new FormData();

        // Append files individually
        courseFiles.forEach(file => {
            formData.append("files", file);
        });

        // Append links as an array
        links.forEach(link => {
            formData.append("links", link);
        });

        formData.append("examID", selectedExam)

        // Add the _id of teacher who is currently logged in
        formData.append("teacherID", "64e383133b02a5bc15059ef5")

        console.log(Array.from(formData));

        const res = await fetch("/exam-material", {
            method: "POST",
            body: formData
        })

        console.log(await res.json());

    }

    const fetchExams = async () => {
        const res = await fetch("/exams");
        const resData = await res.json();
        setExams(resData.data)
    }

    useEffect(() => {

        fetchExams();

    }, [])

    return (
        <div>

            <div className='my-7 space-x-4'>
                <select
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    className='border border-black'
                >
                    <option value="">Select Exam</option>
                    {
                        exams.map(({ title, _id, date }) => (
                            <option
                                value={_id}
                                key={_id}
                            >
                                {`${title} - ${formatDateTime(date)[0]} | ${formatDateTime(date)[1]}`}
                            </option>
                        ))
                    }
                </select>
            </div>


            <div className='mb-4'>
                <form
                    className='space-x-6'
                    onSubmit={
                        (e) => {
                            e.preventDefault();
                            setCourseFiles((prevFiles) => [...prevFiles, courseFile])
                            setCourseFile("")
                            if (fileInput.current) {
                                fileInput.current.value = '';
                            }
                        }}
                >


                    <input
                        type="file"
                        name="files"
                        onChange={(e) => {
                            setCourseFile(e.target.files[0])
                        }}
                        required
                        ref={fileInput}
                    />

                    <button
                        className=" text-sm py-2 text-center font-medium rounded-md px-3 text-white bg-blue-600"
                    >
                        Add Files
                    </button>
                </form>

                <h2 className='mt-5 mb-3 border-b '>All Files</h2>

                <ul className=''>


                    {courseFiles.length === 0 && "No Files are selected"}

                    {
                        courseFiles.length !== 0 && courseFiles.map((file, index) => (
                            <li
                                key={uuidv4()}
                                className='flex items-center gap-x-5'
                            >
                                {index + 1}. {file.name}
                                <button
                                    className='text-red-600'
                                    onClick={deleteFiles(file.name)}
                                >
                                    <AiFillDelete />
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className='border-b border-black' />

            <div className='mt-4'>
                <form
                    className='space-x-6'
                    onSubmit={(e) => {
                        e.preventDefault();
                        setLinks((prevLinks) => [...prevLinks, link])
                        setLink("")
                    }}
                >

                    <input
                        type="text"
                        name="link"
                        onChange={(e) => setLink(e.target.value)}
                        className='border border-black py-2 px-2 text-[12px] w-[25%]'
                        required
                        value={link}
                        placeholder='https://'
                    />

                    <button
                        className=" text-sm py-2 text-center font-medium rounded-md px-3 text-white bg-blue-600"
                    >
                        Add Link
                    </button>

                </form>

                <h2 className='mt-5 mb-3 border-b '>All Links</h2>

                <ul className=''>

                    {links.length === 0 && "No links are added"}

                    {
                        links.map((link, index) => (
                            <li
                                key={uuidv4()}
                                className='flex items-center gap-x-5'
                            >
                                {index + 1}. <a href={link} target='_blank' className='text-blue-600 underline'> {link}</a>
                                <button
                                    className='text-red-600'
                                    onClick={deleteLinks(link)}
                                >
                                    <AiFillDelete />
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className='mt-5'>
                <button
                    className="p-4 text-center font-medium rounded-md px-3 text-white bg-blue-600"
                    style={{
                        height: '40px',
                        paddingTop: '9px',
                        marginTop: '6px',
                    }}
                    onClick={addCourseMaterials()}
                >
                    Add Materials
                </button>

            </div>

            <ToastContainer />

        </div>
    )
}

export default AddCourseFiles