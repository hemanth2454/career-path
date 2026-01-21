import React, { useState } from 'react';

const courses = {
    IT: [
        { title: 'Full Stack Java', price: '₹29,999', description: 'Master Java, Spring Boot, and React/Angular.', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { title: 'Full Stack Python', price: '₹24,999', description: 'Learn Python, Django/Flask, and Frontend.', image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { title: 'MERN Stack', price: '₹27,999', description: 'MongoDB, Express, React, Node.js expert.', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { title: 'Web Development', price: '₹19,999', description: 'HTML, CSS, JS, and modern frameworks.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { title: 'Data Science', price: '₹34,999', description: 'Analyze data with Python and ML.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { title: 'Data Analyst', price: '₹22,999', description: 'Visualize and interpret data.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { title: 'Testing', price: '₹15,999', description: 'Manual and Automation Testing.', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    ],
    Management: [
        { title: 'Marketing', price: '₹18,999', description: 'Digital marketing strategies.', image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { title: 'HR', price: '₹16,999', description: 'Human Resource Management.', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { title: 'Finance', price: '₹21,999', description: 'Financial planning and analysis.', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { title: 'Analytics', price: '₹20,999', description: 'Business Analytics.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    ]
};

const CourseSection = ({ title, items, onEnroll }) => (
    <div className="mb-5">
        <h3 className="mb-4 text-primary border-start border-4 border-primary ps-3">{title}</h3>
        <div className="row g-4">
            {items.map((course, index) => (
                <div key={index} className="col-md-6 col-lg-3">
                    <div className="card h-100 shadow-sm border-0 hover-card overflow-hidden">
                        <div className="position-relative">
                            <img src={course.image} className="card-img-top" alt={course.title} style={{ height: '180px', objectFit: 'cover' }} />
                            <div className="card-img-overlay d-flex align-items-end p-0">
                                <div className="bg-dark bg-opacity-50 text-white w-100 p-2 text-center">
                                    <small>Course Price: {course.price}</small>
                                </div>
                            </div>
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title fw-bold">{course.title}</h5>
                            <p className="card-text text-muted small flex-grow-1">{course.description}</p>
                            <div className="d-grid gap-2 mt-3">
                                <button className="btn btn-primary btn-sm rounded-pill" onClick={() => onEnroll(course)}>Enroll Now</button>
                                <a
                                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(course.title + ' tutorial')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline-danger btn-sm rounded-pill"
                                >
                                    <i className="bi bi-youtube me-2"></i>Explore
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const Courses = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [aiSuggestions, setAiSuggestions] = useState([]);
    const [loadingAI, setLoadingAI] = useState(false);

    React.useEffect(() => {
        const fetchSuggestions = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            setLoadingAI(true);
            try {
                const response = await fetch('http://localhost:5000/api/ai/recommendations', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                setAiSuggestions(data.suggestedCourses || []);
            } catch (error) {
                console.error('Error fetching AI suggestions:', error);
            } finally {
                setLoadingAI(false);
            }
        };

        fetchSuggestions();
    }, []);

    const handleEnrollClick = (course) => {
        setSelectedCourse(course);
    };

    const handleCloseModal = () => {
        setSelectedCourse(null);
    };

    return (
        <div className="container mt-5 py-4">
            <div className="text-center mb-5">
                <h1 className="fw-bold display-5">Explore Our Courses</h1>
                <p className="text-muted lead">Upgrade your skills with our industry-leading courses</p>
            </div>

            {loadingAI ? (
                <div className="text-center my-5 py-5 pb-5">
                    <div className="spinner-grow text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-4 text-muted fw-semibold animate-pulse">Analyzing your professional profile...</p>
                </div>
            ) : aiSuggestions.length > 0 ? (
                <div className="mb-5 ai-recommendation-block p-1 rounded-4 shadow-lg border-0 overflow-hidden position-relative">
                    <div className="suggestion-overlay"></div>
                    <div className="p-4 position-relative">
                        <div className="d-flex align-items-center mb-4">
                            <div className="bg-primary bg-gradient text-white p-3 rounded-circle shadow-sm me-3 animate-bounce-soft">
                                <i className="bi bi-stars fs-3"></i>
                            </div>
                            <div>
                                <h2 className="fw-bold mb-0 text-dark">AI Recommended for You</h2>
                                <p className="text-muted mb-0">Discover paths tailored to your unique expertise</p>
                            </div>
                        </div>
                        <CourseSection title="" items={aiSuggestions} onEnroll={handleEnrollClick} />
                    </div>
                </div>
            ) : null}

            <CourseSection title="IT & Software" items={courses.IT} onEnroll={handleEnrollClick} />
            <CourseSection title="Business & Management" items={courses.Management} onEnroll={handleEnrollClick} />

            <style jsx>{`
                .ai-recommendation-block {
                    background: linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%);
                    border: 1px solid rgba(13, 110, 253, 0.1);
                }
                .suggestion-overlay {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, rgba(13, 110, 253, 0.05) 0%, rgba(255, 255, 255, 0) 70%);
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

            {/* Enrollment Modal */}
            {selectedCourse && (
                <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                            <div className="modal-header bg-primary text-white border-0" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                                <h5 className="modal-title fw-bold">Enroll in {selectedCourse.title}</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body p-4">
                                <div className="text-center mb-4">
                                    <img src={selectedCourse.image} alt={selectedCourse.title} className="img-fluid rounded-3 mb-3 shadow-sm" style={{ maxHeight: '200px', width: '100%', objectFit: 'cover' }} />
                                    <h4 className="fw-bold text-dark">{selectedCourse.title}</h4>
                                    <p className="text-muted">{selectedCourse.description}</p>
                                    <div className="display-6 fw-bold text-primary mb-3">
                                        Price: {selectedCourse.price}
                                    </div>
                                </div>

                                <form onSubmit={(e) => { e.preventDefault(); alert(`Successfully enrolled in ${selectedCourse.title}!`); handleCloseModal(); }}>
                                    <div className="mb-3">
                                        <label className="form-label text-muted fw-bold">Full Name</label>
                                        <input type="text" className="form-control form-control-lg bg-light border-0" placeholder="Your Name" required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-muted fw-bold">Email Address</label>
                                        <input type="email" className="form-control form-control-lg bg-light border-0" placeholder="Your Email" required />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label text-muted fw-bold">Payment Method</label>
                                        <select className="form-select form-select-lg bg-light border-0">
                                            <option>Credit/Debit Card</option>
                                            <option>UPI / Net Banking</option>
                                            <option>PayPal</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill fw-bold shadow-sm">Confirm & Pay</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Courses;

