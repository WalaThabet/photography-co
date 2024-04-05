import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './App';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Ensure you include { withCredentials: true }
      const response = await axios.post(
        '/photographers/sign_in',
        {
          photographer: {
            email: email,
            password: password
          }
        },
        { withCredentials: true }
      );

      // Check response for successful authentication
      if (response.data.success) {
        // Update auth state - you might adjust this based on your backend response
        auth.signIn(response.data.photographer);
        navigate(`/photographers/${response.data.photographer.id}/dashboard`);
      } else {
        // Handle failed authentication (e.g., show error message)
      }
    } catch (error) {
      // Handle errors (e.g., show error message)
      console.error('Sign in error:', error);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInPage;
