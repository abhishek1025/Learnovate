import {
    HiOutlineUserAdd,
    HiOutlineViewGrid
} from 'react-icons/hi';

import { IoCloudUploadOutline, IoDocumentTextOutline, IoPeopleOutline } from 'react-icons/io5';
import { PiExam, PiStudentBold } from 'react-icons/pi';

import { MdCastForEducation, MdOutlineFeedback } from "react-icons/md";


// export const DASHBOARD_SIDEBAR_LINKS = [
//     {
//         key: 'dashboard',
//         label: 'Dashboard',
//         path: '/admin',
//         icon: <HiOutlineViewGrid />,
//     },

//     {
//         key: 'create-users',
//         label: 'Create Users',
//         path: '/admin/create-users',
//         icon: <HiOutlineUserAdd />,
//         role: "admin",
//     },
//     {
//         key: 'view-users',
//         label: 'View Users',
//         path: '/admin/view-users',
//         icon: <IoPeopleOutline />,
//     },
//     {
//         key: 'Create Exam',
//         label: 'Create Exam',
//         path: '/admin/create-exam',
//         icon: <IoDocumentTextOutline />,
//     },
//     {
//         key: 'View Exam',
//         label: 'View Exam',
//         path: '/admin/view-exam',
//         icon: <MdCastForEducation />,
//     },
//     {
//         key: 'Add Exam Materials',
//         label: 'Add Exam Materials',
//         path: '/admin/add-exam-materials',
//         icon: <IoCloudUploadOutline />,
//     },
//     {
//         key: 'Results',
//         label: 'Results',
//         path: '/admin/results',
//         icon: <PiExam />,
//     },
//     {
//         key: 'feedback',
//         label: 'Feedback',
//         path: '/admin/feedback',
//         icon: <MdOutlineFeedback />,
//         role: "admin",
//     },

// ];

export const DASHBOARD_SIDEBAR_LINKS = {
    "admin": [
        {
            key: 'dashboard',
            label: 'Dashboard',
            path: '/admin',
            icon: <HiOutlineViewGrid />,
        },

        {
            key: 'Teachers',
            label: 'Teachers',
            icon: <IoPeopleOutline />,
            subMenu: [
                {
                    key: 'Add Teacher',
                    label: 'Add Teacher',
                    path: '/admin/add-teacher',
                },
                {
                    key: 'View Teachers',
                    label: 'View Teacher',
                    path: '/admin/view-teachers',
                },
            ]
        },

        {
            key: 'Students',
            label: 'Students',
            icon: <PiStudentBold />,
            subMenu: [
                {
                    key: 'Add Students',
                    label: 'Add Students',
                    path: '/admin/add-student',
                },
                {
                    key: 'View Students',
                    label: 'View Students',
                    path: '/admin/view-students',
                },
            ]
        },

        {
            key: 'Exams',
            label: 'Exams',
            icon: <MdCastForEducation />,
            subMenu: [
                {
                    key: 'Create Exam',
                    label: 'Create Exam',
                    path: '/admin/create-exam',
                },
                {
                    key: 'View Exam',
                    label: 'View Exam',
                    path: '/admin/view-exam',
                },
                {
                    key: 'Add Exam Materials',
                    label: 'Add Exam Materials',
                    path: '/admin/add-exam-materials',
                },
            ]
        },


        {
            key: 'Results',
            label: 'Results',
            path: '/admin/results',
            icon: <PiExam />,
        },
        {
            key: 'feedback',
            label: 'Feedback',
            path: '/admin/feedback',
            icon: <MdOutlineFeedback />,
            role: "admin",
        },
    ]

};

