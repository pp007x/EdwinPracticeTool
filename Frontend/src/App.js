import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import HomePage from './components/Homepage';
import ReactionForm from './components/ReactionForm';
import AdminPage from './components/Adminpage';
import ProtectedComponent from './components/Protectedroute';
import AddCompany from './components/AddCompany'; 

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/reactionform" element={<ReactionForm />} />
                <Route path="/admin" element={<ProtectedComponent><AdminPage /></ProtectedComponent>} />
                <Route path="/addcompany" element={<ProtectedComponent><AddCompany /></ProtectedComponent>} /> 
            </Routes>
        </Router>
    );
}

export default App;
