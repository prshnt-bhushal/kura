import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase-config';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUp } from '../methods/firebase';
import { set } from 'react-hook-form';

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
    <>
      <h2>Sign Up</h2>
      <div>
        {error ? <div>{error}</div> : null}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Your Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Your Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="password2"
            value={password2}
            placeholder="Confirm Password"
            required
            onChange={(e) => setPassword2(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <p>
          already registered? <Link to="/login">Login</Link>
        </p>
      </div>
      <div>
        <button onClick={signInWithGoogle}>Sign In With Google</button>
      </div>
    </>
  );
};

export default Signup;
