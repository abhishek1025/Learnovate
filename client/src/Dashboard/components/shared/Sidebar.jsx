import React from 'react';
import classNames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineLogout } from 'react-icons/hi';
import { DASHBOARD_SIDEBAR_LINKS } from '../../lib/index.jsx';
// import { logout } from '../../../../features/auth/authSlice.js';

const linkClass =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-[#212945] hover:no-underline active:[#55609A] rounded-sm text-base';

export default function Sidebar() {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     dispatch(logout());
    //     navigate('/');
    // };

    return (
        <div className="bg-[#1b2138] w-60 p-3 flex flex-col">
            <div className="flex items-center gap-2 px-1 py-3">
                <Link
                    to="/"
                    className="text-white font-bold text text-2xl text-center ml-12"
                >
                    Online Exam
                </Link>
            </div>
            <div className="py-8 flex flex-1 flex-col  gap-0.5">
                {DASHBOARD_SIDEBAR_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
            </div>
            <div className="flex flex-col gap-0.5 pt-2 border-t">
                <button
                    className={classNames(
                        linkClass,
                        'cursor-pointer text-white',
                    )}
                >
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    Logout
                </button>
            </div>
        </div>
    );
}

function SidebarLink({ link }) {
    const { pathname } = useLocation();

    return (
        <Link
            to={link.path}
            className={classNames(
                pathname === link.path
                    ? 'bg-[#353f66] text-white'
                    : 'text-white',
                linkClass,
            )}
        >
            <span className="text-xl">{link.icon}</span>
            {link.label}
        </Link>
    );
}
