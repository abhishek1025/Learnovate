import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Dashboard/components/shared/Layout.jsx';
import Dashboard from './Dashboard/pages/Dashboard.jsx';
import { Contact } from './pages/Contact.jsx';
import Home from './pages/Home';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import CreateUsers from './Dashboard/pages/CreateUsers';
import ViewUsers from './Dashboard/pages/ViewUsers';
import AddCourseFiles from './pages/AddCourseFiles';
import ForgotPassword from './pages/ForgotPassword';
import Feedback from './Dashboard/pages/Feedback';
import CreateExam from './Dashboard/pages/CreateExam';
import ViewExam from './Dashboard/pages/ViewExam';
import UpdateExam from './Dashboard/pages/UpdateExam';
import CreateQuestion from './Dashboard/pages/CreateQuestion';
import ExamDetails from './Dashboard/pages/ExamDetails';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateQuestion from './Dashboard/pages/UpdateQuestion';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/contact" element={<Contact />} />

                {/* Admin */}
                <Route path="/admin" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/admin/create-users" element={<CreateUsers />} />
                    <Route path="/admin/view-users" element={<ViewUsers />} />
                    <Route path="/admin/add-course-files" element={<AddCourseFiles />} />
                    <Route path="/admin/feedback" element={<Feedback />} />
                    <Route path="/admin/create-exam" element={<CreateExam />} />
                    <Route path="/admin/create-question" element={<CreateQuestion />}></Route>
                    <Route path="/admin/view-exam">
                        <Route index element={<ViewExam />}></Route>
                        <Route path="/admin/view-exam/update-question/:examID" element={<UpdateQuestion />}></Route>
                        <Route path="/admin/view-exam/:examID" element={<ExamDetails />}></Route>
                    </Route>
                    <Route path="/admin/update-exam" element={<UpdateExam />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
