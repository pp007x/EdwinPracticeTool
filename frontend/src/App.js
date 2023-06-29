import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import HomePage from './components/Homepage';
import ReactionForm from './components/ReactionForm';
import AdminPage from './components/Adminpage';
import ProtectedComponent from './components/Protectedroute';
import AddCompany from './components/AddCompany'; 
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import CompanyDashboard from './components/DashboardCompany';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/reactionform" element={<ReactionForm />} />
                <Route path="/admin" element={<ProtectedComponent><AdminPage /></ProtectedComponent>} />
                <Route path="/addcompany" element={<ProtectedComponent><AddCompany /></ProtectedComponent>} />
                <Route path="/register" element={<RegisterForm />} /> 
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/companydashboard" element={<CompanyDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;