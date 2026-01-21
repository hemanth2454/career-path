import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-3 fixed-top">
            <div className="container">
                <Link className="navbar-brand brand-title d-flex align-items-center" to="/" style={{ fontSize: '2rem', textShadow: 'none' }}>
                    <img src={logo} alt="CareerPath Logo" style={{ height: '50px', width: 'auto', marginRight: '10px' }} />
                    CareerPath
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item"><Link className="nav-link text-white fs-5 mx-2" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white fs-5 mx-2" to="/courses">Courses</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white fs-5 mx-2" to="/job-search">Jobs</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white fs-5 mx-2" to="/career-advice">Advice</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white fs-5 mx-2" to="/about">About</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white fs-5 mx-2" to="/contact">Contact</Link></li>
                        {user ? (
                            <li className="nav-item dropdown ms-lg-3">
                                <a className="nav-link dropdown-toggle btn btn-light text-dark px-3 rounded-pill" href="#" role="button" data-bs-toggle="dropdown">
                                    <i className="bi bi-person-circle me-2"></i>{user.username}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end shadow border-0 text-center">
                                    <li className="px-3 py-2">
                                        <div className="fw-bold">{user.profile?.name || user.username}</div>
                                        <div className="text-muted small">{user.email}</div>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/profile">Edit Profile</Link></li>
                                    <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </li>
                        ) : (
                            <li className="nav-item ms-lg-3">
                                <Link className="btn btn-light rounded-pill px-4 text-primary fw-bold" to="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
