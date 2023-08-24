import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Layout from './Dashboard/components/shared/Layout.jsx';
import CreateExam from './Dashboard/pages/CreateExam';
import CreateQuestion from './Dashboard/pages/CreateQuestion';
import CreateUsers from './Dashboard/pages/CreateUsers';
import Dashboard from './Dashboard/pages/Dashboard.jsx';
import ExamDetails from './Dashboard/pages/ExamDetails';
import Feedback from './Dashboard/pages/Feedback';
import UpdateExam from './Dashboard/pages/UpdateExam';
import ViewExam from './Dashboard/pages/ViewExam';
import ViewUsers from './Dashboard/pages/ViewUsers';
import { Contact } from './pages/Contact.jsx';
import ExamDashboard from './pages/ExamDashboard';
import ExamRoom from './pages/ExamRoom';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import AddExamMaterials from './pages/AddExamMaterials';

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
                    <Route path="/admin/add-exam-materials" element={<AddExamMaterials />} />
                    <Route path="/admin/feedback" element={<Feedback />} />
                    <Route path="/admin/create-exam" element={<CreateExam />} />
                    <Route path="/admin/create-question" element={<CreateQuestion />}></Route>
                    <Route path="/admin/view-exam">
                        <Route index element={<ViewExam />}></Route>
                        <Route path="/admin/view-exam/:examID" element={<ExamDetails />}></Route>
                    </Route>
                    <Route path="/admin/update-exam" element={<UpdateExam />} />"
                </Route>

                <Route path="/exams" element={<ExamDashboard />} />
                <Route path="/exams/:examID" element={<ExamRoom />} />
            </Routes>
        </div>
    );
}

export default App;
