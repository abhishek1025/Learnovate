import {
    HiOutlineUserAdd,
    HiOutlineViewGrid
} from 'react-icons/hi';

import { IoCloudUploadOutline, IoDocumentTextOutline, IoPeopleOutline, IoSchoolOutline } from 'react-icons/io5';
import { PiExam, PiExamBold, PiStudentBold, PiUsersThreeBold } from 'react-icons/pi';

import { MdCastForEducation, MdOutlineDashboard, MdOutlineFeedback, MdOutlineSchool } from "react-icons/md";
import { MdSchool, MdSubject } from "react-icons/md"
import { BiBookReader, BiSolidBookReader } from 'react-icons/bi';
import { RiDashboardLine, RiFeedbackLine } from 'react-icons/ri'


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
            icon: <MdOutlineDashboard />,
        },

        {
            key: 'Teachers',
            label: 'Teachers',
            icon: <PiUsersThreeBold />,
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
            key: 'Courses',
            label: 'Courses',
            icon: <MdOutlineSchool />,
            subMenu: [
                {
                    key: 'Add Course',
                    label: 'Add Course',
                    path: '/admin/add-course',
                },
                {
                    key: 'View Courses',
                    label: 'View Courses',
                    path: '/admin/view-courses',
                },
            ]
        },

        {
            key: 'Subjects',
            label: 'Subjects',
            icon: <BiBookReader />,
            subMenu: [
                {
                    key: 'Add Subject',
                    label: 'Add Subject',
                    path: '/admin/add-subject',
                },
                {
                    key: 'View Subjects',
                    label: 'View Subjects',
                    path: '/admin/view-subjects',
                }
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
            icon: <PiExamBold />,
        },
        {
            key: 'feedback',
            label: 'Feedback',
            path: '/admin/feedback',
            icon: <RiFeedbackLine />,
            role: "admin",
        },
    ]

};

