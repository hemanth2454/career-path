import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CareerAdvice = () => {
    const { user } = useContext(AuthContext);
    const [recommendations, setRecommendations] = useState({ suggestedCourses: [], suggestedJobs: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (user) {
                setLoading(true);
                try {
                    const token = localStorage.getItem('token');
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    };
                    const res = await axios.get('http://localhost:5000/api/ai/recommendations', config);
                    setRecommendations(res.data);
                } catch (err) {
                    console.error("Error fetching recommendations:", err);
                    setError('Failed to load recommendations.');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchRecommendations();
    }, [user]);

    const roadmaps = [
        {
            role: "Java Full Stack Developer",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Master the complete implementation of Java applications.",
            steps: [
                "Core Java (OOPs, Collections, Streams)",
                "Advanced Java (JDBC, Servlets, JSP)",
                "Spring Framework & Spring Boot",
                "Frontend (HTML, CSS, React/Angular)",
                "Database (SQL/NoSQL) & Microservices"
            ]
        },
        {
            role: "Software Automation Tester",
            image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Ensure software quality through automated testing pipelines.",
            steps: [
                "Manual Testing Fundamentals",
                "Java/Python for Scripting",
                "Selenium WebDriver",
                "API Testing (Postman/RestAssured)",
                "CI/CD Tools (Jenkins, Git)"
            ]
        },
        {
            role: "Data Analyst",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Turn raw data into actionable business insights.",
            steps: [
                "Advanced Excel & SQL",
                "Python/R Programming",
                "Data Visualization (PowerBI/Tableau)",
                "Statistics & Exploratory Analysis",
                "Basic Machine Learning"
            ]
        },
        {
            role: "IT Management",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Lead teams and delivery successful projects.",
            steps: [
                "Effective Communication & Leadership",
                "Agile & Scrum Methodologies",
                "Project Management Tools (Jira)",
                "Risk Management",
                "Stakeholder Management"
            ]
        }
    ];

    return (
        <div className="container mt-5 mb-5">
            {/* Recommendations Section */}
            {user && (
                <div className="mb-5">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold mb-3">
                            <span className="text-primary">AI Powered</span> Recommendations
                        </h2>
                        <p className="text-muted">Based on your skills: {user.profile?.skills?.join(', ') || 'No skills added yet'}</p>
                    </div>

                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="alert alert-warning text-center">{error}</div>
                    ) : (
                        <div>
                            {/* Suggested Courses */}
                            {recommendations.suggestedCourses && recommendations.suggestedCourses.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="fw-bold mb-3"><i className="bi bi-book-half me-2 text-primary"></i>Recommended Courses</h4>
                                    <div className="row g-4">
                                        {recommendations.suggestedCourses.map((course, index) => (
                                            <div key={index} className="col-md-4">
                                                <div className="card h-100 shadow-sm border-0 hover-card">
                                                    <img src={course.image} className="card-img-top" alt={course.title} style={{ height: '200px', objectFit: 'cover' }} />
                                                    <div className="card-body">
                                                        <h5 className="card-title fw-bold">{course.title}</h5>
                                                        <p className="card-text small text-muted">{course.description}</p>
                                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                                            <span className="badge bg-light text-primary border border-primary">{course.price}</span>
                                                            <Link to="/courses" className="btn btn-sm btn-outline-primary">View</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Suggested Jobs */}
                            {recommendations.suggestedJobs && recommendations.suggestedJobs.length > 0 && (
                                <div>
                                    <h4 className="fw-bold mb-3"><i className="bi bi-briefcase-fill me-2 text-primary"></i>Recommended Jobs</h4>
                                    <div className="row g-4">
                                        {recommendations.suggestedJobs.map((job, index) => (
                                            <div key={index} className="col-md-4">
                                                <div className="card h-100 shadow-sm border-0 hover-card">
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between mb-2">
                                                            <span className="badge bg-success-subtle text-success">{job.category}</span>
                                                            <small className="text-muted text-end">{job.salary}</small>
                                                        </div>
                                                        <h5 className="card-title fw-bold">{job.title}</h5>
                                                        <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                                                        <div className="mt-3">
                                                            {job.tags.map((tag, i) => (
                                                                <span key={i} className="badge bg-light text-secondary me-1 mb-1">{tag}</span>
                                                            ))}
                                                        </div>
                                                        <Link to="/job-search" className="btn btn-outline-primary w-100 mt-3">Apply Now</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {(!recommendations.suggestedCourses?.length && !recommendations.suggestedJobs?.length) && (
                                <div className="text-center py-4 bg-light rounded">
                                    <p className="mb-0 text-muted">Update your profile with more skills to get personalized recommendations!</p>
                                    <Link to="/profile" className="btn btn-primary btn-sm mt-2">Update Profile</Link>
                                </div>
                            )}
                        </div>
                    )}
                    <hr className="my-5" />
                </div>
            )}


            <div className="text-center mb-5">
                <h1 className="fw-bold display-4">Career Roadmaps</h1>
                <p className="lead text-muted">Step-by-step guides to reach your professional goals</p>
                <div className="mx-auto bg-primary" style={{ height: '4px', width: '80px', borderRadius: '2px' }}></div>
            </div>

            <div className="row g-4">
                {roadmaps.map((map, index) => (
                    <div key={index} className="col-lg-6">
                        <div className="card shadow border-0 h-100 hover-card overflow-hidden">
                            <div className="row g-0 h-100">
                                <div className="col-md-5">
                                    <img
                                        src={map.image}
                                        className="img-fluid h-100 w-100"
                                        style={{ objectFit: 'cover', minHeight: '250px' }}
                                        alt={map.role}
                                    />
                                </div>
                                <div className="col-md-7">
                                    <div className="card-body d-flex flex-column h-100 p-4">
                                        <h3 className="card-title fw-bold text-primary">{map.role}</h3>
                                        <p className="card-text text-muted mb-3">{map.description}</p>

                                        <h6 className="fw-bold text-uppercase text-secondary small mb-2">Learning Path:</h6>
                                        <ul className="list-group list-group-flush flex-grow-1">
                                            {map.steps.map((step, i) => (
                                                <li key={i} className="list-group-item px-0 py-1 border-0 d-flex align-items-center">
                                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                                    <span>{step}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .hover-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .hover-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
                }
            `}</style>
        </div>
    );
};

export default CareerAdvice;
