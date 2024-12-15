import React, { useState } from 'react';
import axios from 'axios';
import { localhost } from '../../url';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setError('');
    setEmailError('');
    setPasswordError('');

    // Validate inputs
    if (!email) {
      setEmailError('Email is required.');
      return;
    }
    if (!password) {
      setPasswordError('Password is required.');
      return;
    }

    try {
      const response = await axios.post(localhost+'/api/users/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('userToken', token);
      console.log('Login successful:', response.data);
     navigate('/');
    } catch (err) {
      if(err.response.data.error){
        setError(err.response.data.error)
      }else{
        setError('Login failed. Please check your credentials and try again.');

      }
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>

        {/* Error message */}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
            {emailError && <p className="text-red-600 text-sm mt-1">{emailError}</p>}
          </div>
          <div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
            {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-shadow shadow-lg"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <a
            href="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
