import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [state, setState] = useState('Sign Up');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('user');  // Role selection moved to login
    const [message, setMessage] = useState('');  // For success or error messages

    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        // User details include 'name' only for signup, and 'role' only for login
        const userDetails = {
            email,
            password,
            ...(state === 'Sign Up' && { name }),  // Include name for sign up
            ...(state === 'Login' && { role })     // Include role for login
        };

        try {
            const url = state === 'Sign Up'
                ? 'http://localhost:5000/api/auth/signup'
                : 'http://localhost:5000/api/auth/login';

            const response = await axios.post(url, userDetails);
            console.log(`${state === 'Sign Up' ? 'User created' : 'User logged in'} successfully:`, response.data);

            // Store JWT token in localStorage
            localStorage.setItem('authToken', response.data.token);

            // Show success message
            setMessage(state === 'Sign Up' ? 'Account created successfully!' : 'Logged in successfully!');

            // Redirect user to the dashboard or home page after login
            if (state === 'Login') navigate('/dashboard');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error);
            setMessage(error.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={onSubmitHandler}>
                {/* Role selection for Login */}
                {state === 'Login' && (
                    <div className="form-group">
                        <label>Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="form-input"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                            <option value="officer">Officer</option>
                        </select>
                    </div>
                )}

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
                            placeholder="Enter your name"
                            className="form-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                )}

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
