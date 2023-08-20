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

];
