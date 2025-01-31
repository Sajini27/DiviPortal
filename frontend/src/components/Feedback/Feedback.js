import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Feedback.css';

function Feedback() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [feedback, setFeedback] = useState('');
    const [feedbacks, setFeedbacks] = useState([]);

    // Fetch all feedbacks on component mount
    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/feedback');
                setFeedbacks(response.data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };
        fetchFeedbacks();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/feedback', formData);
            setFeedback('Thank you for your feedback!');
            setFormData({ name: '', email: '', message: '' }); // Clear the form fields

            // Refresh the feedback list
            const response = await axios.get('http://localhost:5000/api/feedback');
            setFeedbacks(response.data);
        } catch (error) {
            console.error('There was an error submitting the feedback:', error);
            setFeedback('Error submitting feedback. Please try again later.');
        }
    };

    return (
        <div className="feedback-page">
            {/* Feedback Form Container */}
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

            {/* Recent Feedbacks Container */}
            <div className="recent-feedbacks-container">
                <h3>Recent Feedbacks</h3>
                {feedbacks.length > 0 ? (
                    feedbacks.map((fb, index) => (
                        <div key={index} className="feedback-item">
                            <p><strong>{fb.name}</strong></p> {/* Removed email */}
                            <p>{fb.message}</p>
                            <p><small>{new Date(fb.dateSubmitted).toLocaleString()}</small></p>
                        </div>
                    ))
                ) : (
                    <p>No feedbacks yet. Be the first to submit!</p>
                )}
            </div>
        </div>
    );
}

export default Feedback;