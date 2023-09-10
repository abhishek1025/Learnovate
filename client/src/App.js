import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Layout from './Dashboard/components/shared/Layout.jsx';
import CreateUsers from './Dashboard/pages/teacher/AddTeacher';
import Dashboard from './Dashboard/pages/Dashboard.jsx';
import ExamDetails from './Dashboard/pages/ExamDetails';
import Feedback from './Dashboard/pages/Feedback';
import ViewExam from './Dashboard/pages/ViewExam';
import ViewUsers from './Dashboard/pages/teacher/ViewTeachers';
import AddExamMaterials from './pages/AddExamMaterials';
import AllExamsResult from './pages/AllExamsResult';
import { Contact } from './pages/Contact.jsx';
import ExamDashboard from './pages/ExamDashboard';
import ExamMaterials from './pages/ExamMaterials';
import ExamResultDetails from './pages/ExamResultDetails';
import ExamRoom from './pages/ExamRoom';
import FeedbackForm from './pages/FeedbackForm';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import CreateExam from './Dashboard/pages/CreateExam';
import ExamResultsDashboard from './Dashboard/pages/ExamResultsDashboard';
import AllStudentMarksList from './Dashboard/pages/AllStudentMarksList';
import ProfilePage from './pages/ProfilePage';
import AddTeacher from './Dashboard/pages/teacher/AddTeacher';
import ViewTeachers from './Dashboard/pages/teacher/ViewTeachers';
import PageNotFound from './pages/PageNotFound';
import AddCourse from './Dashboard/pages/course/AddCourse';
import ViewCourses from './Dashboard/pages/course/ViewCourse';
import EditCourse from './Dashboard/pages/course/EditCourse';
import EditTeacher from './Dashboard/pages/teacher/EditTeacher';
import AddSubject from './Dashboard/pages/subject/AddSubject';
import ViewSubject from './Dashboard/pages/subject/ViewSubject';
import EditSubject from './Dashboard/pages/subject/EditSubject';



function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="/profile" element={<ProfilePage />} />

                {/* Admin */}
                <Route path="/admin" element={<Layout />}>

                    <Route index element={<Dashboard />} />

                    <Route path="add-teacher" element={<AddTeacher />} />
                    <Route path="view-teachers" element={<ViewTeachers />} />
                    <Route path="edit-teacher/:teacherID" element={<EditTeacher />} />

                    <Route path="add-exam-materials" element={<AddExamMaterials />} />
                    <Route path="feedback" element={<Feedback />} />

                    <Route path="create-exam" element={<CreateExam />} />

                    <Route path="view-exam">
                        <Route index element={<ViewExam />} />
                        <Route path="view-exam/:examID" element={<ExamDetails />} />
                    </Route>

                    <Route path="results">
                        <Route index element={<ExamResultsDashboard />} />
                        <Route path=':examID' element={<AllStudentMarksList />} />
                    </Route>

                    <Route path="add-course" element={<AddCourse />} />
                    <Route path="view-courses" element={<ViewCourses />} />
                    <Route path="edit-course/:courseID" element={<EditCourse />} />

                    <Route path="add-subject" element={<AddSubject />} />
                    <Route path="view-subjects" element={<ViewSubject />} />
                    <Route path="edit-subject/:subjectID" element={<EditSubject />} />

                </Route>

                <Route path="/exams" element={<ExamDashboard />} />
                <Route path="/exams/:examID" element={<ExamRoom />} />

                <Route path="/results" element={<AllExamsResult />} />
                <Route path="/results/:examID" element={<ExamResultDetails />} />
                <Route path="/exam-materials/:examID" element={<ExamMaterials />} />

                <Route path="/feedback" element={<FeedbackForm />} />

                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default App;
