import React, { useState } from 'react';
import apiConfig from '../config';

const mockJobs = [
    { id: 1, title: 'Senior React Developer', company: 'TechSolutions Inc.', location: 'Remote', category: 'Software', salary: '$120k - $150k', posted: '2 days ago' },
    { id: 2, title: 'Product Manager', company: 'Global Corp', location: 'New York, NY', category: 'Management', salary: '$130k - $160k', posted: '1 day ago' },
    { id: 3, title: 'Backend Node.js Engineer', company: 'StartupX', location: 'San Francisco, CA', category: 'Software', salary: '$110k - $140k', posted: '3 days ago' },
    { id: 4, title: 'HR Business Partner', company: 'PeopleFirst', location: 'Austin, TX', category: 'Management', salary: '$90k - $110k', posted: '5 days ago' },
    { id: 5, title: 'Full Stack Engineer', company: 'DevWorks', location: 'Remote', category: 'Software', salary: '$100k - $130k', posted: 'Just now' },
    { id: 6, title: 'Marketing Manager', company: 'Creative Agency', location: 'Chicago, IL', category: 'Management', salary: '$85k - $105k', posted: '1 week ago' },
];

const JobSearch = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [aiJobs, setAiJobs] = useState([]);
    const [loadingAI, setLoadingAI] = useState(false);

    React.useEffect(() => {
        const fetchSuggestions = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            setLoadingAI(true);
            try {
                const response = await fetch(`${apiConfig.API_URL}/api/ai/recommendations`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                setAiJobs(data.suggestedJobs || []);
            } catch (error) {
                console.error('Error fetching AI jobs:', error);
            } finally {
                setLoadingAI(false);
            }
        };

        fetchSuggestions();
    }, []);

    const filteredJobs = mockJobs.filter(job => {
        const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container mt-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold display-5 mb-3">Find Your Dream Job</h1>
                <p className="lead text-muted">Browse through thousands of job listings matching your profile.</p>
            </div>

            <div className="row justify-content-center mb-5">
                <div className="col-md-8">
                    <div className="input-group input-group-lg shadow-sm">
                        <span className="input-group-text bg-white border-end-0"><i className="bi bi-search text-muted"></i></span>
                        <input
                            type="text"
                            className="form-control border-start-0 ps-0"
                            placeholder="Search by job title, company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-primary px-4" type="button">Find Jobs</button>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center mb-5 gap-2">
                <button
                    className={`btn rounded-pill px-4 ${selectedCategory === 'All' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setSelectedCategory('All')}
                >
                    All Jobs
                </button>
                <button
                    className={`btn rounded-pill px-4 ${selectedCategory === 'Software' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setSelectedCategory('Software')}
                >
                    Software
                </button>
                <button
                    className={`btn rounded-pill px-4 ${selectedCategory === 'Management' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setSelectedCategory('Management')}
                >
                    Management
                </button>
            </div>

            {loadingAI ? (
                <div className="text-center my-5 py-5 pb-5">
                    <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-4 text-muted fw-semibold animate-pulse">Scanning the job market for your profile...</p>
                </div>
            ) : aiJobs.length > 0 ? (
                <div className="mb-5 ai-recommendation-block p-1 rounded-4 shadow-lg border-0 overflow-hidden position-relative">
                    <div className="suggestion-overlay-success"></div>
                    <div className="p-4 position-relative">
                        <div className="d-flex align-items-center mb-4">
                            <div className="bg-success bg-gradient text-white p-3 rounded-circle shadow-sm me-3 animate-bounce-soft">
                                <i className="bi bi-robot fs-3"></i>
                            </div>
                            <div>
                                <h2 className="fw-bold mb-0 text-dark">AI Recommended Jobs</h2>
                                <p className="text-muted mb-0">High-probability matches detected by our algorithm</p>
                            </div>
                        </div>
                        <div className="row g-4">
                            {aiJobs.map(job => (
                                <div key={`ai-${job.title}`} className="col-md-6 col-lg-4">
                                    <div className="card h-100 shadow-sm border-0 hover-card border-start border-4 border-success">
                                        <div className="card-body p-4">
                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                <div className="icon-box-sm bg-light text-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                                    <i className={`bi ${job.category === 'Software' ? 'bi-laptop' : 'bi-briefcase'} fs-4`}></i>
                                                </div>
                                                <span className="badge bg-success text-white px-3 py-2 rounded-pill">Top Match</span>
                                            </div>
                                            <h5 className="card-title fw-bold mb-1">{job.title}</h5>
                                            <p className="text-success mb-3 small fw-semibold">{job.company}</p>
                                            <div className="mb-3">
                                                <span className="badge bg-secondary bg-opacity-10 text-secondary me-2">{job.category}</span>
                                                <span className="badge bg-success bg-opacity-10 text-success">{job.salary}</span>
                                            </div>
                                            <div className="d-flex justify-content-end mt-4">
                                                <button className="btn btn-success btn-sm rounded-pill px-4 shadow-sm fw-bold">Quick Apply</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : null}

            <style jsx>{`
                .ai-recommendation-block {
                    background: linear-gradient(135deg, #f0fff4 0%, #ffffff 100%);
                    border: 1px solid rgba(25, 135, 84, 0.1);
                }
                .suggestion-overlay-success {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, rgba(25, 135, 84, 0.05) 0%, rgba(255, 255, 255, 0) 70%);
                    pointer-events: none;
                }
                .animate-pulse {
                    animation: pulse 2s infinite ease-in-out;
                }
                @keyframes pulse {
                    0% { opacity: 0.6; }
                    50% { opacity: 1; }
                    100% { opacity: 0.6; }
                }
                .animate-bounce-soft {
                    animation: bounce-soft 3s infinite ease-in-out;
                }
                @keyframes bounce-soft {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .hover-card {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .hover-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
                }
            `}</style>

            <h3 className="mb-4 fw-bold">All Available Positions</h3>

            <div className="row g-4">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <div key={job.id} className="col-md-6 col-lg-4">
                            <div className="card h-100 shadow-sm border-0 hover-card">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div className="icon-box-sm bg-light text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                            <i className={`bi ${job.category === 'Software' ? 'bi-laptop' : 'bi-briefcase'} fs-4`}></i>
                                        </div>
                                        <span className="badge bg-light text-dark border">{job.location}</span>
                                    </div>
                                    <h5 className="card-title fw-bold mb-1">{job.title}</h5>
                                    <p className="text-primary mb-3 small fw-semibold">{job.company}</p>
                                    <div className="mb-3">
                                        <span className="badge bg-secondary bg-opacity-10 text-secondary me-2">{job.category}</span>
                                        <span className="badge bg-success bg-opacity-10 text-success">{job.salary}</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-4">
                                        <small className="text-muted"><i className="bi bi-clock me-1"></i>{job.posted}</small>
                                        <button className="btn btn-outline-primary btn-sm rounded-pill px-3">Apply Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center py-5">
                        <i className="bi bi-emoji-frown display-1 text-muted"></i>
                        <h3 className="mt-3 text-muted">No jobs found</h3>
                        <p>Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default JobSearch;
