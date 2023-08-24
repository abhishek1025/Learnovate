import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex justify-between  items-center h-24 max-w-[1240px] mx-auto  text-black">
      <Link to="/" className="w-full text-3xl font-bold text-blue-600">
        Online Exam
      </Link>
      <ul className="hidden md:flex">
        <Link to="/" className="p-4">
          Home
        </Link>
        <Link to="/contact" className="p-4">
          Contact
        </Link>
        <Link to="/admin" className="p-4">
          Dashboard
        </Link>

        <Link to="/exams" className="p-4">
          Exams
        </Link>

        <Link
          to="/signup"
          className="p-4 text-center font-medium rounded-md w-24 px-3 text-white bg-blue-600"
          style={{
            height: '40px',
            paddingTop: '9px',
            marginTop: '6px',
          }}
        >
          SignUp
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;