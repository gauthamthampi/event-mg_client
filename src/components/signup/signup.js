import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { localhost } from '../../url';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State for success message
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate(); // For navigation

  useEffect(()=>{
    const checkLogin = async() => {
      if(localStorage.getItem('userToken')){
        navigate('/')
      }
    }
    checkLogin()
  },[])


  const handleSignup = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setError('');
    setSuccess('');
    setNameError('');
    setEmailError('');
    setPasswordError('');

    // Validate inputs
    if (!name) {
      setNameError('Name is required.');
      return;
    }
    if (!email) {
      setEmailError('Email is required.');
      return;
    }
    if (!password) {
      setPasswordError('Password is required.');
      return;
    }
    if (password.length < 6) {
      setPasswordError('Password should contain at least 6 characters.');
      return;
    }

    try {
      const response = await axios.post(`${localhost}/api/users/signup`, { name, email, password });
      console.log('Signup successful:', response.data);

      // Set success message and redirect after 2 seconds
      setSuccess('Signup successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login'); // Redirect to login page
      }, 2000);
    } catch (err) {
      setError(err.response.data.error);
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

        {/* Error message */}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {/* Success message */}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter your full name"
              required
            />
            {nameError && <p className="text-red-600 text-sm mt-1">{nameError}</p>}
          </div>
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
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
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Create a password"
              required
            />
            {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-2 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-shadow shadow-lg"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-green-600 font-medium hover:underline"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
