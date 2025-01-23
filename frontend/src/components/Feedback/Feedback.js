import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './Feedback.css'; 

function Feedback() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [feedback, setFeedback] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/feedback', formData); // API call to backend
            setFeedback('Thank you for your feedback! We will get back to you soon.');
            setFormData({ name: '', email: '', message: '' }); // Clear the form fields
        } catch (error) {
            console.error('There was an error submitting the feedback:', error);
            setFeedback('Error submitting feedback. Please try again later.');
        }
    };

    return (
        <div className="feedback-container">
            <h2>Feedback</h2>
            <form className="feedback-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
            {feedback && <p className="feedback">{feedback}</p>}
        </div>
    );
}

export default Feedback;
