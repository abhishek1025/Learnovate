import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import NormalButton from '../../../comps/Buttons/NormalButton';
import ErrorModal from '../../../comps/ErrorModal';
import Loader from '../../../comps/Loader/Loader';
import { useReactQueryToFetch } from '../../../hooks/useReactQueryToFetch';
import { Link, useParams } from 'react-router-dom';
import BackButton from '../../../comps/Buttons/BackButton';

const EditSubject = () => {

  const { subjectID } = useParams();

  const fetchCourseData = async () => {
    const res = await fetch('/courses');
    const resData = await res.json();
    return resData.data;
  }

  const { isLoading, data: courseData, isError } = useReactQueryToFetch("courses", fetchCourseData)

  const [displayLoader, setDisplayLoader] = useState(false);
  const [error, setError] = useState(false);

  const [subjectInfo, setSubjectInfo] = useState({});

  const handleInputChange = (e) => {
    setSubjectInfo((prevSubjectInfo) => {
      return { ...prevSubjectInfo, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      setDisplayLoader(true);

      const res = await fetch(`/subjects/${subjectID}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(subjectInfo)
      })

      const resMsg = await res.json();

      if (res.ok) {
        setDisplayLoader(false);
        swal("", resMsg.message, "success");
        return;
      }
      setDisplayLoader(false);
      swal("", resMsg.message, "error");
    } catch (error) {
      setDisplayLoader(false);
      setError(true)
    }
  }

  const fetchSubjectData = async () => {

    try {
      setDisplayLoader(true)

      const res = await fetch(`/subjects/${subjectID}`);
      const resData = await res.json();

      setDisplayLoader(false)

      if (res.ok) {

        const { course, title, code, year } = resData.data

        setSubjectInfo({ title, year, courseID: course._id, prevCode: code, code })
        return;
      }

      setError(true)

    } catch (error) {
      setDisplayLoader(false)
      setError(true)
    }

  }

  useEffect(() => {
    fetchSubjectData()
  }, [])


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
          Edit Subject
        </h1>
      </div>

      <form onSubmit={(e) => handleSubmit(e)} className="bg-white p-10 shadow-md rounded-lg">
        <div className="mb-4">
          <label htmlFor="subject title" className="block text-sm font-medium text-gray-700">
            Subject Title
          </label>
          <input
            type="text"
            id="subject title"
            name="title"
            value={subjectInfo.title}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
            Subject  Code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={subjectInfo.code}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="courseID" className="block text-sm font-medium text-gray-700">
            Course
          </label>

          <select
            name="courseID"
            id="courseID"
            value={subjectInfo.courseID}
            className="mt-1 p-2 border rounded w-full"
            onChange={handleInputChange}
          >
            <option value="">Select Course</option>
            {
              !isLoading && courseData.map(({ _id, title }) => (
                <option key={_id} value={_id}>{title}</option>
              ))
            }
          </select>

        </div>



        <div className="mb-4">
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={subjectInfo.year}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className='gap-x-4 flex'>
          <NormalButton type="submit">
            Update Subject
          </NormalButton>
          <Link to="../view-subjects">
            <BackButton />
          </Link>
        </div>

      </form>
    </div>

  )
}

export default EditSubject