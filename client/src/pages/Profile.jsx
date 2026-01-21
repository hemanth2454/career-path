import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interests: '',
        skills: '',
        academicDetails: '',
        coursePreference: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (user && user.profile) {
            setFormData({
                name: user.profile.name || user.username || '',
                email: user.profile.email || user.email || '',
                phone: user.profile.phone || '',
                interests: user.profile.interests ? user.profile.interests.join(', ') : '',
                skills: user.profile.skills ? user.profile.skills.join(', ') : '',
                academicDetails: user.profile.academicDetails || '',
                coursePreference: user.profile.coursePreference || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const profilePayload = {
            ...formData,
            interests: formData.interests.split(',').map(item => item.trim()),
            skills: formData.skills.split(',').map(item => item.trim())
        };

        const res = await updateUserProfile(profilePayload);
        if (res.success) {
            setMessage('Profile updated successfully!');
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg border-0 rounded-3">
                        <div className="card-header bg-primary text-white text-center py-4">
                            <h3 className="mb-0 fw-bold"><i className="bi bi-person-lines-fill me-2"></i>Edit Profile</h3>
                        </div>
                        <div className="card-body p-5">
                            {message && <div className="alert alert-success">{message}</div>}
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold text-muted">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold text-muted">Email</label>
                                        <input
                                            type="email"
                                            className="form-control form-control-lg"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled
                                        />
                                        <small className="text-muted">Email cannot be changed.</small>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold text-muted">Phone Number</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold text-muted">Academic Details (University/Degree)</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        name="academicDetails"
                                        value={formData.academicDetails}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold text-muted">Skills (comma separated)</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            name="skills"
                                            value={formData.skills}
                                            onChange={handleChange}
                                            placeholder="e.g. React, Node.js, Python"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold text-muted">Interests (comma separated)</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            name="interests"
                                            value={formData.interests}
                                            onChange={handleChange}
                                            placeholder="e.g. Coding, Design, AI"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-bold text-muted">Course Preference</label>
                                    <select
                                        className="form-select form-select-lg"
                                        name="coursePreference"
                                        value={formData.coursePreference}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select a preference</option>
                                        <option value="IT">Information Technology</option>
                                        <option value="Management">Management</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Design">Design</option>
                                    </select>
                                </div>

                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary btn-lg shadow-sm fw-bold">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
