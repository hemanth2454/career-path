import React from 'react';

const About = () => (
    <div className="container mt-5">
        <div className="text-center mb-5">
            <h1 className="fw-bold">About Us</h1>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
                We are dedicated to providing the best career guidance and courses to help you succeed in your professional journey.
            </p>
        </div>
        <div className="row align-items-center">
            <div className="col-md-6">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Team" className="img-fluid rounded shadow" />
            </div>
            <div className="col-md-6 mt-4 mt-md-0">
                <h3>Our Mission</h3>
                <p>To empower tailored career paths through expert guidance and accessible education.</p>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i>Expert Mentorship</li>
                    <li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i>Comprehensive Courses</li>
                    <li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i>Job Placement Support</li>
                </ul>
            </div>
        </div>
    </div>
);

export default About;
