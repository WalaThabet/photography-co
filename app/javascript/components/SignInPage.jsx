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
      const response = await axios.post('/photographers/sign_in', {
        photographer: {
          email: email,
          password: password
        }
      });
      auth.signIn({ isAuthenticated: true, user: response.data });
      const photographerId = response.data.id;
      navigate(`/photographers/${photographerId}/dashboard`);
    } catch (error) {
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
