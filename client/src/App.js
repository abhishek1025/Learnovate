import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Dashboard/components/shared/Layout.jsx';
import AddCandidate from './Dashboard/pages/AddCandidate.jsx';
import CreateCategory from './Dashboard/pages/CreateCategory.jsx';
import Dashboard from './Dashboard/pages/Dashboard.jsx';
import TotalCandidate from './Dashboard/pages/TotalCandidate.jsx';
import TotalUser from './Dashboard/pages/TotalUser.jsx';
import TotalVoting from './Dashboard/pages/TotalVoting.jsx';
import { Contact } from './pages/Contact.jsx';
import Home from './pages/Home';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import CreateUsers from './Dashboard/pages/CreateUsers';
import ViewUsers from './Dashboard/pages/ViewUsers';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contact" element={<Contact />} />

                {/* Admin */}
                <Route path="/admin" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/admin/create-users" element={<CreateUsers />} />
                    <Route path="/admin/view-users" element={<ViewUsers />} />

                    {/* <Route path="/admin/totalcustomer" element={<TotalUser />} />
                    <Route path="/admin/total-user" element={<TotalUser />} />

                    <Route path="/admin/total-candidate" element={<TotalCandidate />} />

                    <Route path="/admin/total-voting" element={<TotalVoting />} />


                    <Route path="/admin/add-candidate" element={<AddCandidate />} />

                    <Route path="/admin/create-category" element={<CreateCategory />} /> */}
                </Route>
            </Routes>
        </div>
    );
}

export default App;
