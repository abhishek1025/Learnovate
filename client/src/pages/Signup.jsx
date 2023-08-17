import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../comps/Navbar'
import Footer from '../comps/Footer'

const SignUp = () => {


    const userInfo = {
        name: "",
        citizenshipNumber: "",
        voterID: "",
        password: ""
    }
    const [formFields, setFormFields] = useState(userInfo)

    const changeHandler = (e) => {
        setFormFields((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <section>

            <Navbar />

            <div className="grid grid-cols-1 lg:grid-cols-2">

                <div className="h-full w-full flex items-center justify-center">
                    <img
                        className="mx-auto rounded-md object-cover"
                        src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-8044864-6430773.png?f=webp"
                        alt=""
                    />
                </div>

                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">

                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md ">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up</h2>
                        <p className="mt-2 text-base text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="font-medium text-black transition-all duration-200 hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                        <form onSubmit={submitHandler} className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Full Name{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Full Name"
                                            id="name"
                                            name='name'
                                            onChange={changeHandler}
                                            value={formFields.name}
                                            required
                                        ></input>
                                    </div>
                                </div>

                                {/* <div>
                                    <label htmlFor="email" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Email address{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="Email"
                                            id="email"
                                        ></input>
                                    </div>
                                </div> */}


                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="citizenshipNumber" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Citizenship Number{' '}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="citizenshipNumber"
                                            placeholder="citizenshipNumber"
                                            id="citizenshipNumber"
                                            name="citizenshipNumber"
                                            onChange={changeHandler}
                                            value={formFields.citizenshipNumber}
                                            required
                                        ></input>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="citizenshipNumber" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Voter ID{' '}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="voterID"
                                            placeholder="voterID"
                                            id="voterID"
                                            name="voterID"
                                            value={formFields.voterID}
                                            onChange={changeHandler}
                                            required
                                        ></input>
                                    </div>
                                </div>


                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Password{' '}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Password"
                                            id="password"
                                            name='password'
                                            value={formFields.password}
                                            onChange={changeHandler}
                                            required
                                        ></input>
                                    </div>
                                </div>


                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    >
                                        Create Account <ArrowRight className="ml-2" size={16} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

            <Footer />
        </section>
    )
}


export default SignUp;