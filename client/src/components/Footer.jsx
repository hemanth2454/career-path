import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
            <div className="container text-center text-md-left">
                <div className="row text-center text-md-left">
                    <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h5 className="mb-4 brand-title" style={{ fontSize: '1.5rem' }}>CareerPath</h5>
                        <p>Empowering your professional journey with expert guidance, curated courses, and career advice. Find your path to success with us.</p>
                    </div>

                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 font-weight-bold text-primary">Quick Links</h5>
                        <p><Link to="/" className="text-white text-decoration-none hover-link">Home</Link></p>
                        <p><Link to="/courses" className="text-white text-decoration-none hover-link">Courses</Link></p>
                        <p><Link to="/job-search" className="text-white text-decoration-none hover-link">Job Search</Link></p>
                        <p><Link to="/career-advice" className="text-white text-decoration-none hover-link">Career Advice</Link></p>
                    </div>

                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 font-weight-bold text-primary">Support</h5>
                        <p><Link to="/about" className="text-white text-decoration-none hover-link">About Us</Link></p>
                        <p><Link to="/contact" className="text-white text-decoration-none hover-link">Contact</Link></p>
                        <p><Link to="/profile" className="text-white text-decoration-none hover-link">My Profile</Link></p>
                    </div>

                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 font-weight-bold text-primary">Contact</h5>
                        <p><i className="bi bi-house-fill me-2"></i> 123 Career Blvd, Tech City</p>
                        <p><i className="bi bi-envelope-fill me-2"></i> info@careerpath.com</p>
                        <p><i className="bi bi-phone-fill me-2"></i> + 01 234 567 88</p>
                    </div>
                </div>

                <hr className="mb-4" />

                <div className="row align-items-center">
                    <div className="col-md-7 col-lg-8">
                        <p>© {new Date().getFullYear()} Copyright:
                            <strong className="text-primary"> CareerPath</strong>
                        </p>
                    </div>

                    <div className="col-md-5 col-lg-4">
                        <div className="text-center text-md-right">
                            <ul className="list-unstyled list-inline">
                                <li className="list-inline-item">
                                    <a href="#" className="btn-floating btn-sm text-white" style={{ fontSize: '23px' }}><i className="bi bi-facebook"></i></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn-floating btn-sm text-white" style={{ fontSize: '23px' }}><i className="bi bi-twitter-x"></i></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn-floating btn-sm text-white" style={{ fontSize: '23px' }}><i className="bi bi-google"></i></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn-floating btn-sm text-white" style={{ fontSize: '23px' }}><i className="bi bi-linkedin"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                .hover-link:hover {
                    color: #0d6efd !important;
                    transition: 0.3s;
                }
            `}} />
        </footer>
    );
};

export default Footer;
