import React, { useState } from "react";
import "./Login.css"; // Import external CSS

const Login = () => {
    const [state, setState] = useState('Sign Up');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        console.log({ state, email, password, name }); // Placeholder for form submission logic
    };

    const isSignUp = state === 'Sign Up';

    return (
        <div className="login-container">
            <form className="login-box">
                <h2 className="login-title">
                    {isSignUp ? 'Create Account' : 'Login'}
                </h2>
                <p className="login-subtitle">
                    {isSignUp ? "Sign up to start your journey" : "Log in to your account"}
                </p>

                {isSignUp && (
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

                <button
                    type="submit"
                    onClick={onSubmitHandler}
                    className="login-button">
                    {isSignUp ? 'Create Account' : 'Login'}
                </button>

                <div className="form-footer">
                    <p>
                        {isSignUp ? "Already have an account?" : "Don't have an account?"} {" "}
                        <span
                            onClick={() => setState(isSignUp ? 'Login' : 'Sign Up')}
                            className="toggle-link">
                            {isSignUp ? 'Login here' : 'Sign up here'}
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
