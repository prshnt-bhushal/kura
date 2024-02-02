import React, { useState } from 'react';
import { signIn } from '../methods/firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase-config';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, seterror] = useState('');

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn(email, password);

    if (res.error) {
      seterror(res.error);
    } else {
      // Clear the form fields on successful login
      setEmail('');
      setPassword('');

      // Navigate to the profile page
      navigate('/profile');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-semibold mb-4">Login</h2>
      {error ? <div className="text-red-500 mb-2">{error}</div> : null}
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your Email"
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Your Password"
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="submit"
          value="Submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        />
      </form>
      <button
        onClick={signInWithGoogle}
        className="bg-blue-500 text-white p-2 m-2 rounded hover:bg--700"
      >
        Sign In With Google
      </button>
    </div>
  );
};

export default Login;
