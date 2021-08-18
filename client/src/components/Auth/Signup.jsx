import React, { useRef, useState, useEffect } from 'react';
import './Auth.css';
import { Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import { useAuth } from '../contexts/AuthContext';
import HeaderJoin from '../Join/HeaderJoin';
import Footer from '../Footer/Footer';

export default function Signup() {
  const email = useRef('');
  const password = useRef('');
  const passwordConfirm = useRef('');
  const name = useRef('');
  const { signup} = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const mounted = useRef(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password.current.value !== passwordConfirm.current.value) {
      return setError('Passwords do not match');
    }
    if (
      !email.current.value ||
      !password.current.value ||
      !passwordConfirm.current.value ||
      !name.current.value
    ) {
      return setError('Empty field not allowed');
    }
    if (name.current.value && name.current.value.length > 20) {
      return setError('Name too long');
    }
    try {
      setError('');
      setLoading(true);
      const res = await signup(
        email.current.value,
        password.current.value,
        name.current.value,
      );
      if (!res.ok) throw new Error();
    } catch {
      setError('Failed to create an account');
    }
    if (mounted.current) {
      setLoading(false);
    }
  }

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  });

  return (
    <>
      <HeaderJoin />
      <div className="content-container">
    <div className="form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <p>Email</p>
          <input type="email" id="email" ref={email} />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input type="password" ref={password} id="password" />
        </label>
        <label htmlFor="passwordConfirm">
          <p>Confirm password</p>
          <input type="password" ref={passwordConfirm} id="passwordConfirm" />
        </label>
        <label htmlFor="name">
          <p>Name</p>
          <input type="text" ref={name} id="name" />
        </label>
        <button className="blue-submit-button" disabled={loading} type="submit">
          Sign Up
        </button>
        <p>
          Already have and account?{' '}
          <Link to="/login" style={{ color: '#00adb5' }}>
            Log In
          </Link>
        </p>
      </form>
      {loading && <LinearProgress style={{ backgroundColor: '#0000' }} />}
      {error && <Alert severity="error">{error}</Alert>}
        </div>
        </div>
      <div className="footer-pin">
        <Footer />
      </div>
      </>
  );
}
