import {
    HiOutlineViewGrid,
    HiOutlineCube,
} from 'react-icons/hi';

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/admin',
        icon: <HiOutlineViewGrid />,
    },

    {
        key: 'create-category',
        label: 'Create Category',
        path: '/admin/create-category',
        icon: <HiOutlineCube />,
    },
    {
        key: 'add-candidate',
        label: 'Add Candidate',
        path: '/admin/add-candidate',
        icon: <HiOutlineCube />,
    },

    {
        key: 'total-user',
        label: 'Total Users',
        path: '/admin/total-user',
        icon: <HiOutlineCube />,
    },
    {
        key: 'total-candidate',
        label: 'Total Candidate',
        path: '/admin/total-candidate',
        icon: <HiOutlineCube />,
    },
    {
        key: 'total-voting',
        label: 'Total Voting',
        path: '/admin/total-voting',
        icon: <HiOutlineCube />,
    },
];
