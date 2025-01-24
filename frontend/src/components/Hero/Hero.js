import React, { useState } from 'react'; 
import './Hero.css';
import person from '../../assets/person.png';
import email from '../../assets/email.png';
import password from '../../assets/password.png';
import axios from 'axios';

function Hero() {
    const [action, setAction] = useState("Sign Up"); // SignUp or Login Mode
    const [formData, setFormData] = useState({
        name: '',
        nic: '',
        password: '',
        email: '',
        division: '',
        role: 'user', // Default role
    });
    const [errorMessage, setErrorMessage] = useState(""); // Error message state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (action === "Sign Up") {
                const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
                console.log('Signup response:', response.data);
                setErrorMessage(""); // Clear error message after successful signup
            } else {
                const response = await axios.post('http://localhost:5000/api/auth/login', {
                    email: formData.email,
                    password: formData.password,
                });
                
                // Handle the login response
                console.log('Login response:', response.data);
                const { token, user } = response.data;
                
                // Save the token in localStorage
                localStorage.setItem('token', token);
                
                // Redirect based on role
                if (user.role === 'admin') {
                    window.location.href = '/admin-dashboard'; // Redirect to admin dashboard
                } else {
                    window.location.href = '/user-dashboard'; // Redirect to user dashboard
                }
            }
        } catch (error) {
            console.error(`Error: ${error.message}`);
            if (error.response) {
                console.error(`Error response: ${error.response.data}`);
                setErrorMessage(error.response.data.message || "An error occurred. Please try again."); // Display error message
            }
        }
    };

    return (
        <div className='hero'>
            <div className='hero-text'>
                <div className="left-side">
                    <h1>Welcome to DiviPortal</h1>
                    <p>
                        DiviPortal is your one-stop solution for accessing the services of the Divisional Secretariat Office with ease and convenience.
                    </p>
                </div>
            </div>

            <div className="right-side">
                <div className='header'>
                    <div className='text'>{action}</div>
                    <div className='underline'></div>
                </div>

                <form className='inputs' onSubmit={handleSubmit}>
                    {action === "Sign Up" && (
                        <>
                            <div className='input'>
                                <img src={person} alt='' />
                                <input type="text" name="name" placeholder='Name with Initials' onChange={handleChange} />
                            </div>
                            <div className='input'>
                                <img src={person} alt='' />
                                <input type="text" name="nic" placeholder='National Identity Card Number' onChange={handleChange} />
                            </div>
                            <div className='input'>
                                <img src={password} alt='' />
                                <input type="password" name="password" placeholder='Password' onChange={handleChange} />
                            </div>
                            <div className='input'>
                                <img src={email} alt='' />
                                <input type="email" name="email" placeholder='Email Address' onChange={handleChange} />
                            </div>
                            <div className='input'>
                                <select name="role" onChange={handleChange} value={formData.role}>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className='forgot-password'>
                                I already have an account <span onClick={() => setAction('Login')}>Click Here!</span>
                            </div>
                            <div className='submit-container'>
                                <button type="submit" className="submit">Sign Up</button>
                            </div>
                        </>
                    )}
                    {action === "Login" && (
                        <>
                            <div className='input'>
                                <img src={email} alt='' />
                                <input type="email" name="email" placeholder='Email Address' onChange={handleChange} />
                            </div>
                            <div className='input'>
                                <img src={password} alt='' />
                                <input type="password" name="password" placeholder='Password' onChange={handleChange} />
                            </div>
                            <div className='forgot-password'>
                                Lost Password? <span>Click Here!</span>
                            </div>
                            <div className='forgot-password'>
                                I don't have an account <span onClick={() => setAction('Sign Up')}>Click Here!</span>
                            </div>
                            <div className='submit-container'>
                                <button type="submit" className="submit">Login</button>
                            </div>
                        </>
                    )}
                </form>

                {/* Display error message if login or signup fails */}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </div>
    );
}

export default Hero;
