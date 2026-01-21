import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        interests: '',
        skills: '',
        academicDetails: '',
        coursePreference: ''
    });
    const [recommendations, setRecommendations] = useState({ suggestedCourses: [], suggestedJobs: [] });
    const [isProfileComplete, setIsProfileComplete] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoading(false);
                    return;
                }
                const res = await axios.get('http://localhost:5000/api/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data && res.data.name) {
                    setProfile({
                        ...res.data,
                        interests: Array.isArray(res.data.interests) ? res.data.interests.join(', ') : (res.data.interests || ''),
                        skills: Array.isArray(res.data.skills) ? res.data.skills.join(', ') : (res.data.skills || '')
                    });
                    setIsProfileComplete(true);

                    // Fetch recommendations
                    try {
                        const recRes = await axios.get('http://localhost:5000/api/ai/recommendations', {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        setRecommendations(recRes.data);
                    } catch (recError) {
                        console.error('Error fetching recommendations', recError);
                    }
                }
            } catch (error) {
                console.error('Error fetching profile', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Prepare payload with split strings for backend array fields
            const profilePayload = {
                ...profile,
                interests: profile.interests.split(',').map(item => item.trim()).filter(i => i !== ""),
                skills: profile.skills.split(',').map(item => item.trim()).filter(i => i !== "")
            };

            const res = await updateUserProfile(profilePayload);
            if (res.success) {
                alert('Profile saved successfully!');
                setIsProfileComplete(true);
                window.location.reload(); // Reload to update state across app
            } else {
                alert('Failed to save profile: ' + res.message);
            }
        } catch (error) {
            console.error('Error updating profile', error);
            alert('Failed to save profile. Please try again.');
        }
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    if (!isProfileComplete) {
        return (
            <div className="container mt-5 pt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-8">
                        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                            <div className="card-header bg-primary text-white text-center py-4">
                                <h2 className="mb-0 fw-bold">Complete Your Profile</h2>
                                <p className="mb-0 opacity-75">Tell us a bit about yourself to get started</p>
                            </div>
                            <div className="card-body p-4 p-md-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold text-muted">Full Name</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0 text-primary">
                                                    <i className="bi bi-person"></i>
                                                </span>
                                                <input type="text" className="form-control border-start-0 bg-light" name="name" value={profile.name} onChange={handleChange} required placeholder="Enter your full name" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold text-muted">Email Address</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0 text-primary">
                                                    <i className="bi bi-envelope"></i>
                                                </span>
                                                <input type="email" className="form-control border-start-0 bg-light" name="email" value={profile.email} onChange={handleChange} required placeholder="Enter your email" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold text-muted">Phone Number</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0 text-primary">
                                                    <i className="bi bi-telephone"></i>
                                                </span>
                                                <input type="text" className="form-control border-start-0 bg-light" name="phone" value={profile.phone} onChange={handleChange} required placeholder="Enter phone number" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold text-muted">Interests</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0 text-primary">
                                                    <i className="bi bi-heart"></i>
                                                </span>
                                                <input type="text" className="form-control border-start-0 bg-light" name="interests" value={profile.interests} onChange={handleChange} required placeholder="e.g. Technology, Art, Science" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold text-muted">Skills</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0 text-primary">
                                                    <i className="bi bi-stars"></i>
                                                </span>
                                                <input type="text" className="form-control border-start-0 bg-light" name="skills" value={profile.skills} onChange={handleChange} required placeholder="e.g. React, Python, Design" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold text-muted">Academic Details</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0 text-primary">
                                                    <i className="bi bi-book"></i>
                                                </span>
                                                <input type="text" className="form-control border-start-0 bg-light" name="academicDetails" value={profile.academicDetails} onChange={handleChange} required placeholder="Latest qualification" />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label fw-semibold text-muted">Course Preference</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0 text-primary">
                                                    <i className="bi bi-mortarboard"></i>
                                                </span>
                                                <input type="text" className="form-control border-start-0 bg-light" name="coursePreference" value={profile.coursePreference} onChange={handleChange} required placeholder="What courses are you looking for?" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 d-grid">
                                        <button type="submit" className="btn btn-primary btn-lg rounded-pill shadow-sm py-3 fw-bold">
                                            Save Profile & Continue
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Hero Section */}
            <div className="p-5 text-center bg-image text-white d-flex align-items-center justify-content-center" style={{
                backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
                height: "600px",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
                <div>
                    <h1 className="mb-3 display-1 brand-title" style={{ letterSpacing: '2px', textShadow: 'none' }}>CareerPath</h1>
                    <h2 className="mb-4 fw-light display-5">Kickstart Your Future</h2>
                    <p className="lead mb-4" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.25rem' }}>Discover the path to your dream career with expert guidance</p>
                </div>
            </div>

            {/* AI Recommendations Section */}
            {(recommendations.suggestedCourses.length > 0 || recommendations.suggestedJobs.length > 0) && (
                <div className="container mt-5">
                    <div className="section-header text-center mb-5">
                        <h2 className="display-5 fw-bold text-gradient">Recommended for You</h2>
                        <p className="lead text-muted">Personalized suggestions based on your unique profile</p>
                    </div>

                    {recommendations.suggestedCourses.length > 0 && (
                        <div className="mb-5">
                            <h3 className="fw-bold mb-4 text-primary"><i className="bi bi-book-half me-2"></i>Suggested Courses</h3>
                            <div className="row g-4">
                                {recommendations.suggestedCourses.map((course, index) => (
                                    <div key={index} className="col-md-4">
                                        <div className="card h-100 shadow-sm border-0 hover-lift">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <h5 className="card-title fw-bold mb-0">{course.title}</h5>
                                                    <span className="badge bg-primary rounded-pill">{course.score} Matches</span>
                                                </div>
                                                <p className="card-text text-muted small mb-3">{course.description}</p>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className="fw-bold text-success">{course.price}</span>
                                                    <button
                                                        className="btn btn-sm btn-outline-primary rounded-pill"
                                                        onClick={() => navigate('/courses')}
                                                    >
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="card-footer bg-light border-0 py-2">
                                                <small className="text-muted"><i className="bi bi-tags me-1"></i>{course.tags.slice(0, 3).join(', ')}</small>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {recommendations.suggestedJobs.length > 0 && (
                        <div className="mb-5">
                            <h3 className="fw-bold mb-4 text-success"><i className="bi bi-briefcase me-2"></i>Suggested Jobs</h3>
                            <div className="row g-4">
                                {recommendations.suggestedJobs.map((job, index) => (
                                    <div key={index} className="col-md-4">
                                        <div className="card h-100 shadow-sm border-0 hover-lift">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <div>
                                                        <h5 className="card-title fw-bold mb-1">{job.title}</h5>
                                                        <p className="text-muted small mb-0">{job.company}</p>
                                                    </div>
                                                    <span className="badge bg-success rounded-pill">{job.score} Matches</span>
                                                </div>
                                                <div className="mb-3">
                                                    <span className="badge bg-light text-dark me-2 border">{job.category}</span>
                                                    <span className="badge bg-light text-dark border">{job.salary}</span>
                                                </div>
                                                <button
                                                    className="btn btn-sm btn-outline-success w-100 rounded-pill"
                                                    onClick={() => navigate('/job-search')}
                                                >
                                                    Apply Now
                                                </button>
                                            </div>
                                            <div className="card-footer bg-light border-0 py-2">
                                                <small className="text-muted"><i className="bi bi-tags me-1"></i>{job.tags.slice(0, 3).join(', ')}</small>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Cards Section */}
            <div className="container mt-5 mb-5">
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card h-100 shadow border-0 hover-card text-center p-4">
                            <div className="card-body">
                                <div className="icon-box mb-4 text-primary">
                                    <i className="bi bi-clipboard-data display-4"></i>
                                </div>
                                <h3 className="card-title fw-bold">courses for your career</h3>
                                <p className="card-text text-muted my-3">Accurate career matching assessments to help you plan your next big move with confidence.</p>
                                <button onClick={() => navigate('/courses')} className="btn btn-outline-primary rounded-pill px-4">Courses</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 shadow border-0 hover-card text-center p-4">
                            <div className="card-body">
                                <div className="icon-box mb-4 text-success">
                                    <i className="bi bi-briefcase display-4"></i>
                                </div>
                                <h3 className="card-title fw-bold">Job Search</h3>
                                <p className="card-text text-muted my-3">Explore thousands of job listings tailored to your unique skills and professional interests.</p>
                                <button onClick={() => navigate('/job-search')} className="btn btn-outline-success rounded-pill px-4">Browse Jobs</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 shadow border-0 hover-card text-center p-4">
                            <div className="card-body">
                                <div className="icon-box mb-4 text-warning">
                                    <i className="bi bi-lightbulb display-4"></i>
                                </div>
                                <h3 className="card-title fw-bold">Career Advice</h3>
                                <p className="card-text text-muted my-3">Gain insights from industry experts to navigate your career path and achieve success.</p>
                                <button onClick={() => navigate('/career-advice')} className="btn btn-outline-warning rounded-pill px-4">Read Advice</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
