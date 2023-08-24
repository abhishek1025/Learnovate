import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { checkExamStartedOrNot, formatDateTime } from '../utils/formatDateAndTime';
import { ToastContainer, toast } from 'react-toastify';

const ExamRoom = () => {

    const { examID } = useParams();

    const [exam, setExam] = useState({});

    const { title, teacher, date, questions, subject, duration } = exam;

    const [answers, setAnswer] = useState([])

    const navigate = useNavigate();


    const changeHandler = (selectedOption, question, _id, correctAns) => {

        const ans = answers.find(answer => answer._id === _id)

        if (ans) {
            const newAns = answers.map((preAns) => {
                if (preAns._id === _id) {
                    return { ...preAns, selectedAns: selectedOption }
                }
                return preAns
            })
            setAnswer(newAns)
            return;
        }

        setAnswer((prevAns) => [...prevAns, { _id, question, selectedAns: selectedOption, correctAns }])
    }

    const fetchExamByID = async () => {
        const res = await fetch(`/exams/${examID}`)
        const resData = await res.json();
        setExam(resData.data)
    }

    const storeExamReportInDB = async () => {

        const newAnswers = answers.map(({ question, selectedAns, correctAns }) => {
            return { question, selectedAns, correctAns }
        })

        const res = await fetch("/exam-reports", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                "examID": examID,
                "studentID": "64e4dd2fd91f3a02404ec3cf",
                answers: newAnswers
            })
        })

        const resData = await res.json();

        if (res.ok) {
            toast.success(resData.message)
            setTimeout(() => navigate("/exams"), 4000)
            return;
        }

        toast.error(resData.message)
    }

    const submitExam = async () => {

        if (answers.length !== questions.length) {
            toast.warning("Please Select All Questions");
            return;
        }
        await storeExamReportInDB()

    }

    useEffect(() => {
        fetchExamByID()
    }, [])



    return (
        <div className='py-10'>

            <ToastContainer />

            {
                Object.keys(exam).length !== 0 && (

                    <>
                        {/* Exam title  */}
                        <div>

                            <h1 className='text-5xl text-center'>Multiple Choice Exam</h1>


                            <section className='w-[35%] m-auto space-y-1'>

                                <Timer duration={duration} date={date} />


                                <p className='flex gap-x-4'>
                                    <span className='font-bold w-[30%]'> Title: </span> <span>{title}</span>
                                </p>

                                <p className='flex gap-x-4'>
                                    <span className='font-bold w-[30%]'> Subject: </span> <span>{subject}</span>
                                </p>

                                <p className=' flex gap-x-4'>
                                    {
                                        date && (<><span className='font-bold w-[30%]'>Start Time: </span> {formatDateTime(date)[0]} {formatDateTime(date)[1]}</>)
                                    }
                                </p>
                                <p className=' flex gap-x-4'>
                                    <span className='font-bold w-[30%]'> Invigilator: </span> {teacher?.name}
                                </p>
                            </section>


                        </div>

                        <div className='w-[60%] m-auto my-16'>
                            <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                                <p className="font-bold">Be Careful</p>
                                <p>
                                    Leaving this page/tab multiple times will automatically submit the exam.
                                </p>
                            </div>

                        </div>
                        <div className='space-y-10'>

                            {
                                questions.map(({ _id, question, options, correctAns }) => (

                                    <div className='w-[60%] m-auto' key={_id}>
                                        <p className='text-bold text-xl'>
                                            {question}
                                        </p>

                                        {
                                            options.map((option) => {
                                                return (
                                                    <div className='space-x-3 mt-3' key={Math.random()}>
                                                        {
                                                            option === answers.find(ans => ans?._id === _id)?.selectedAns ? (
                                                                <p
                                                                    className='border border-blue-600 bg-blue-600 text-white w-[40%] px-2 py-1 rounded'
                                                                    onClick={() => changeHandler(option, question, _id, correctAns)}
                                                                >
                                                                    {option}
                                                                </p>
                                                            ) : (
                                                                <p
                                                                    className='border border-black w-[40%] px-2 py-1 rounded'
                                                                    onClick={() => changeHandler(option, question, _id, correctAns)}
                                                                >
                                                                    {option}
                                                                </p>
                                                            )
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                ))
                            }


                            <div className='w-[60%] m-auto'>
                                <button
                                    className='bg-blue-600 text-white rounded px-3 py-2 mt-5'
                                    onClick={submitExam}
                                >
                                    Submit Exam
                                </button>

                            </div>

                        </div>
                    </>
                )
            }


        </div>

    )
}

export default ExamRoom

const Timer = ({ duration, date }) => {

    const { remainingExamDuration } = checkExamStartedOrNot(date, duration);


    const totalSeconds = remainingExamDuration * 60;

    const [seconds, setSeconds] = useState(totalSeconds);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds]);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;


    return (


        <section>
            <div className='flex flex-col items-center justify-center my-5 text-red-500'>
                <div className='flex text-4xl w-[150px] justify-between'>
                    <p>{minutes.toString().padStart(2, '0')}</p> <p> : </p> <p>{remainingSeconds.toString().padStart(2, '0')}</p>
                </div>

                <div className="flex justify-between w-[150px]">
                    <p className="text-[10px]">Minutes</p>
                    <p className="text-[10px] text-right">Seconds</p>
                </div>

            </div>
        </section>



    );
};

