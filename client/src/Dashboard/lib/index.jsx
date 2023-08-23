import {
    HiOutlineViewGrid,
    HiOutlineUserAdd,
    HiOutlineUserGroup,
    HiOutlineClipboardList,
    HiOutlineCog,
} from 'react-icons/hi';

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/admin',
        icon: <HiOutlineViewGrid />,
    },
    {
        key: 'create-users',
        label: 'Create Users',
        path: '/admin/create-users',
        icon: <HiOutlineUserAdd />,
    },
    {
        key: 'view-users',
        label: 'View Users',
        path: '/admin/view-users',
        icon: <HiOutlineUserAdd />,
    },
    {
        key: 'feedback',
        label: 'Feedback',
        path: '/admin/feedback',
        icon: <HiOutlineClipboardList />,
    },
    {
        key: 'Add course',
        label: 'Add course',
        path: '/admin/add-course-files',
        icon: <HiOutlineClipboardList />,
    },
    {
        key: 'Create Exam',
        label: 'Create Exam',
        path: '/admin/create-exam',
        icon: <HiOutlineClipboardList />,
    },
    {
        key: 'View Exam',
        label: 'View Exam',
        path: '/admin/view-exam',
        icon: <HiOutlineClipboardList />,
    },
    {
        key: 'Update Exam',
        label: 'Update Exam',
        path: '/admin/update-exam',
        icon: <HiOutlineClipboardList />,
    },

];
