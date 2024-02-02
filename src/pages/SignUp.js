import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase-config';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUp } from '../methods/firebase';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, seterror] = useState('');

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      seterror('Passwords do not match');
    } else {
      setEmail('');
      setPassword('');
      setPassword2('');
      const res = await signUp(email, password);
      if (res.error) seterror(res.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-semibold mb-4">Sign Up</h2>
      <div className="mb-4">
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Your Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Your Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            name="password2"
            value={password2}
            placeholder="Confirm Password"
            required
            onChange={(e) => setPassword2(e.target.value)}
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
        <p className="mt-4">
          Already registered?{' '}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
      <div>
        <button
          onClick={signInWithGoogle}
          className="bg-blue-500 text-white p-2 rounded hover:bg--700"
        >
          Sign In With Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
