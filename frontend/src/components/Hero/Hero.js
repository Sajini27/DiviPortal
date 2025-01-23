import React, { useState } from 'react'; 
import './Hero.css';
import person from '../../assets/person.png';
import email from '../../assets/email.png';
import password from '../../assets/password.png';
import axios from 'axios'; // Import Axios

function Hero() {
    const [action, setAction] = useState("Sign Up"); // SignUp or Login Mode
    const [formData, setFormData] = useState({
        name: '',
        nic: '',
        password: '',
        email: '',
        division: ''
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh on submit
        try {
            if (action === "Sign Up") {
                // API call for signup
                const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
                console.log('Signup response:', response.data);
            } else {
                // API call for login
                const response = await axios.post('http://localhost:5000/api/auth/login', {
                    email: formData.email,
                    password: formData.password,
                });
                console.log('Login response:', response.data);
            }
        } catch (error) {
            console.error(`Error: ${error.message}`);
            if (error.response) {
                console.error(`Error response: ${error.response.data}`);
            } else {
                console.error("An unknown error occurred");
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
                        Designed to streamline communication and reduce the hassle of in-person visits, our platform offers a wide range of essential services at your fingertips.
                        Explore our services and manage your administrative needs effortlessly!
                    </p>
                </div>
            </div>

            <div className="right-side">
                <div className='header'>
                    <div className='text'>{action}</div>
                    <div className='underline'></div>
                </div>

                <form className='inputs' onSubmit={handleSubmit}>
                    {/* Form fields for Sign Up */}
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
                                <img src={person} alt='' />
                                <input type="text" name="division" placeholder='Gramasewa Division' onChange={handleChange} />
                            </div>
                            <div className='forgot-password'>
                                I already have an account <span onClick={() => setAction('Login')}>Click Here!</span>
                            </div>
                            <div className='submit-container'>
                                {/* Proper button for submitting the Sign Up form */}
                                <button type="submit" className="submit">
                                    Sign Up
                                </button>
                            </div>
                        </>
                    )}

                    {/* Form fields for Login */}
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
                                {/* Proper button for submitting the Login form */}
                                <button type="submit" className="submit">
                                    Login
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Hero;