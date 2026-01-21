import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';
import Courses from './pages/Courses';
import About from './pages/About';
import Contact from './pages/Contact';
import JobSearch from './pages/JobSearch';
import CareerAdvice from './pages/CareerAdvice';
import Profile from './pages/Profile';

const PrivateRoute = ({ children }) => {
    const { user, loading } = React.useContext(AuthContext);
    if (loading) return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
    return user ? children : <Navigate to="/login" replace />;
};

function Layout() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    return (
        <div className="d-flex flex-column min-vh-100">
            {!isLoginPage && <Navbar />}
            <main className="flex-fill">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route path="/courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
                    <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
                    <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
                    <Route path="/job-search" element={<PrivateRoute><JobSearch /></PrivateRoute>} />
                    <Route path="/career-advice" element={<PrivateRoute><CareerAdvice /></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                </Routes>
            </main>
            {!isLoginPage && <Footer />}
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <Layout />
            </Router>
        </AuthProvider>
    );
}

export default App;
