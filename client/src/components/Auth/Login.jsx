/* eslint-disable react/jsx-curly-brace-presence */
import './Auth.css';
import React, { useRef, useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import HeaderJoin from '../Join/HeaderJoin';
import Footer from '../Footer/Footer';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const mounted = useRef(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.current.value || !password.current.value) {
      return setError('Empty field not allowed');
    }
    try {
      setError('');
      setLoading(true);

      const res = await login(email.current.value, password.current.value);
      if (!res.ok) throw new Error();
    } catch {
      setError('Failed to login');
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
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <p>Email</p>
          <input type="email" ref={email} id="email" />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input type="password" ref={password} id="password" />
        </label>
        <button className="blue-submit-button" type="submit">
          Log In
        </button>
        <p>
          {"Don't have and account yet?"}{' '}
          <Link to="/signup" style={{ color: '#00adb5' }}>
            Sign up
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
