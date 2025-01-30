import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { AppContext } from '../../context/appContext';

const Login = () => {
    const { login } = useContext(AppContext);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '', // Only used for Sign Up
    });
    const [state, setState] = useState('Login'); // 'Sign Up' or 'Login'
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission (Login or Sign Up)
    const handleSubmit = async (event) => {
        event.preventDefault();

        const { email, password, name } = formData;

        // Prepare user details based on state (Sign Up / Login)
        const userDetails = state === 'Sign Up' ? { email, password, name } : { email, password };

        try {
            const url = state === 'Sign Up'
                ? 'http://localhost:5000/api/auth/signup'
                : 'http://localhost:5000/api/auth/login';

            const response = await axios.post(url, userDetails);
            const { token, role, name } = response.data;

            console.log('User Name:', name);
            console.log('User Role:', role);

            // Store token and user details in local storage
            localStorage.setItem('authToken', token);
            localStorage.setItem('userName', name);
            localStorage.setItem('role', role);

            // Update AppContext state (Fixed missing role)
            login(token, name, role);

            // Set success message
            setMessage(state === 'Sign Up' ? 'Account created successfully!' : 'Logged in successfully!');

            // Navigate based on user role
            if (state === 'Sign Up') {
                navigate('/login'); // Redirect to login page after successful sign up
            } else {
                if (role === 'user') {
                    navigate('/');
                } else if (role === 'admin') {
                    navigate('/admin-dashboard');
                } else if (role === 'officer') {
                    navigate('/officer-dashboard');
                } else if (role === 'staff') {
                    navigate('/staff-dashboard');
                } else {
                    navigate('/'); // Fallback to home if no role is recognized
                }
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error);
            setMessage(error.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={handleSubmit}>
                <h2 className="login-title">
                    {state === 'Sign Up' ? 'Create Account' : 'Login'}
                </h2>
                <p className="login-subtitle">
                    {state === 'Sign Up' ? "Sign up to start your journey" : "Log in to your account"}
                </p>

                {state === 'Sign Up' && (
                    <div className="form-group">
                        <label>Name with Initial</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="form-input"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="form-input"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="form-input"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="login-button">
                    {state === 'Sign Up' ? 'Create Account' : 'Login'}
                </button>

                {/* Display success or error message */}
                {message && (
                    <div
                        className={`message ${message.includes('successfully') ? 'success-message' : 'error-message'}`}
                    >
                        {message}
                    </div>
                )}

                <div className="form-footer">
                    <p>
                        {state === 'Sign Up' ? "Already have an account?" : "Don't have an account?"}{" "}
                        <span
                            onClick={() => {
                                setState(state === 'Sign Up' ? 'Login' : 'Sign Up');
                                setMessage(''); // Clear message when switching states
                            }}
                            className="toggle-link">
                            {state === 'Sign Up' ? 'Login here' : 'Sign up here'}
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
