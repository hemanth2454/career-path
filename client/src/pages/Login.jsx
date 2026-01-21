import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginIllustration from '../assets/login-illustration.png';
import logo from '../assets/logo.png';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, register, user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    React.useEffect(() => {
        if (!loading && user) {
            navigate('/');
        }
    }, [user, loading, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!isLogin) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(password)) {
                setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
                return;
            }
        }

        if (isLogin) {
            const res = await login(email, password);
            if (res.success) {
                navigate('/');
            } else {
                setError(res.message);
            }
        } else {
            const res = await register(username, email, password);
            if (res.success) {
                setIsLogin(true);
                setSuccessMessage('Registration successful! Please login.');
            } else {
                setError(res.message);
            }
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setSuccessMessage('');
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
            <div className="card shadow-lg border-0 overflow-hidden m-3" style={{ maxWidth: '900px', width: '100%', borderRadius: '20px' }}>
                <div className="row g-0">
                    {/* Left Side - Image */}
                    <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-light">
                        <img
                            src={LoginIllustration}
                            alt="Career Guidance"
                            className="img-fluid"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '500px' }}
                        />
                    </div>

                    {/* Right Side - Form */}
                    <div className="col-md-6 p-5 bg-white">
                        <div className="d-flex flex-column justify-content-center h-100">
                            <div className="text-center mb-3">
                                <img src={logo} alt="CareerPath Logo" style={{ height: '80px', width: 'auto' }} />
                            </div>
                            <h1 className="text-center brand-title mb-2" style={{ fontSize: '3rem' }}>CareerPath</h1>
                            <h2 className="text-center mb-4 fw-bold text-secondary fs-4">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>

                            {error && <div className="alert alert-danger">{error}</div>}
                            {successMessage && <div className="alert alert-success">{successMessage}</div>}

                            <form onSubmit={handleSubmit}>
                                {(!isLogin || isLogin) && (
                                    <div className="mb-3">
                                        <label className="form-label text-muted">{isLogin ? 'Email Address' : 'Username'}</label>
                                        <div className="input-group input-group-lg">
                                            <span className="input-group-text bg-light border-end-0">
                                                <i className={`bi ${isLogin ? 'bi-envelope' : 'bi-person'} text-primary`}></i>
                                            </span>
                                            <input
                                                type={isLogin ? "email" : "text"}
                                                className="form-control form-control-lg border-start-0 ps-0 bg-light"
                                                value={isLogin ? email : username}
                                                onChange={(e) => isLogin ? setEmail(e.target.value) : setUsername(e.target.value)}
                                                required
                                                placeholder={isLogin ? "Enter your email" : "Enter your username"}
                                            />
                                        </div>
                                    </div>
                                )}
                                {!isLogin && (
                                    <div className="mb-3">
                                        <label className="form-label text-muted">Email Address</label>
                                        <div className="input-group input-group-lg">
                                            <span className="input-group-text bg-light border-end-0">
                                                <i className="bi bi-envelope text-primary"></i>
                                            </span>
                                            <input
                                                type="email"
                                                className="form-control form-control-lg border-start-0 ps-0 bg-light"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="mb-4">
                                    <label className="form-label text-muted">Password</label>
                                    <div className="input-group input-group-lg">
                                        <span className="input-group-text bg-light border-end-0">
                                            <i className="bi bi-lock text-primary"></i>
                                        </span>
                                        <input
                                            type="password"
                                            className="form-control form-control-lg border-start-0 ps-0 bg-light"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary w-100 btn-lg mb-3 shadow-sm rounded-pill">
                                    {isLogin ? 'Login' : 'Sign Up'}
                                </button>
                            </form>
                            <div className="text-center">
                                <button
                                    className="btn btn-link text-decoration-none"
                                    onClick={toggleMode}
                                    style={{ color: '#667eea' }}
                                >
                                    {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
