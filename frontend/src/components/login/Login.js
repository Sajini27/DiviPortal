import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { AppContext } from '../../context/appContext';

const Login = () => {
  const { login } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    nic: '',
  });
  const [state, setState] = useState('Login');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidNIC = (nic) => {
    const nic12 = /^\d{12}$/;
    const nicOld = /^\d{9}[vV]$/;
    return nic12.test(nic) || nicOld.test(nic);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name, nic } = formData;

    if (state === 'Sign Up' && !isValidNIC(nic)) {
      setMessage('Invalid NIC number. Must be 12 digits or 9 digits followed by "V".');
      return;
    }

    const userDetails =
      state === 'Sign Up'
        ? { email, password, name, nic }
        : { email, password };

    try {
      const url =
        state === 'Sign Up'
          ? 'http://localhost:5000/api/auth/signup'
          : 'http://localhost:5000/api/auth/login';

      const response = await axios.post(url, userDetails);
      const { token, role, name: returnedName, id: userId } = response.data;

      localStorage.setItem('authToken', token);
      localStorage.setItem('userName', returnedName);
      localStorage.setItem('userId', userId);
      localStorage.setItem('role', role);
      login(token, returnedName, userId, role);

      setMessage(state === 'Sign Up' ? 'Account created successfully!' : 'Logged in successfully!');

      if (state === 'Sign Up') {
        navigate('/login');
      } else {
        const roleRoutes = {
          user: '/',
          admin: '/admin-dashboard',
          officer: '/officer-dashboard',
          staff: '/staff-dashboard',
        };
        navigate(roleRoutes[role] || '/');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2 className="login-title">{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
        <p className="login-subtitle">
          {state === 'Sign Up' ? 'Sign up to start your journey' : 'Log in to your account'}
        </p>

        {state === 'Sign Up' && (
          <>
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

            <div className="form-group">
              <label>National Identity Card Number</label>
              <input
                type="text"
                name="nic"
                placeholder="Enter your NIC number"
                className="form-input"
                value={formData.nic}
                onChange={handleChange}
                required
              />
            </div>
          </>
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

        {state === 'Login' && (
          <div className="forgot-password">
            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>
          </div>
        )}

        <button type="submit" className="login-button">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {message && (
          <div
            className={`message ${
              message.includes('successfully') ? 'success-message' : 'error-message'
            }`}
          >
            {message}
          </div>
        )}

        <div className="form-footer">
          <p>
            {state === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span
              onClick={() => {
                setState(state === 'Sign Up' ? 'Login' : 'Sign Up');
                setMessage('');
              }}
              className="toggle-link"
            >
              {state === 'Sign Up' ? 'Login here' : 'Sign up here'}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
