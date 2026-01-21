import React from 'react';

const Contact = () => (
    <div className="container mt-5">
        <h1 className="text-center fw-bold mb-5">Get in Touch</h1>
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card shadow border-0">
                    <div className="card-body p-5">
                        <div className="row text-center">
                            <div className="col-md-6 mb-4 mb-md-0">
                                <div className="mb-3 text-primary">
                                    <i className="bi bi-envelope-paper display-4"></i>
                                </div>
                                <h4>Email Us</h4>
                                <p className="text-muted">admin@careerguidance.com</p>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3 text-primary">
                                    <i className="bi bi-telephone display-4"></i>
                                </div>
                                <h4>Call Us</h4>
                                <p className="text-muted">+1 234 567 890</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Contact;
