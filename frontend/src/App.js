import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import ReactionForm from './components/ReactionForm';
import AdminPage from './components/Admin/Adminpage';
import ProtectedComponent from './components/Protectedroute';
import AddCompany from './components/Admin/AddCompany'; 
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import CompanyDashboard from './components/DashboardCompany';
import AdminAddUser from './components/Admin/AdminCreateUser';
import AdminCompanyDashboard from './components/Admin/AdminCompanyDashboard';
import AdminUserDashboard from './components/Admin/AdminUserDashboard';
import AdminNewQuestion from './components/Admin/AdminNewQuestions';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/reactionform" element={<ReactionForm />} />
                <Route path="/admin" element={<ProtectedComponent><AdminPage /></ProtectedComponent>} />
                <Route path="/admin/addcompany" element={<ProtectedComponent><AddCompany /></ProtectedComponent>} />
                <Route path="/register" element={<RegisterForm />} /> 
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/companydashboard" element={<CompanyDashboard />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/admin/adduser" element={<ProtectedComponent><AdminAddUser /></ProtectedComponent>} />
                <Route path="/admin/companies" element={<ProtectedComponent><AdminCompanyDashboard /></ProtectedComponent>} />
                <Route path="/admin/users" element={<ProtectedComponent><AdminUserDashboard /></ProtectedComponent>} />
                <Route path="/admin/newquestion" element={<ProtectedComponent><AdminNewQuestion /></ProtectedComponent>} />
            </Routes>
        </Router>
    );
}

export default App;
