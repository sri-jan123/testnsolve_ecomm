import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', {
        email,
        password,
      });
      if (res.data) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate('/');
        toast.success('Login successful');
      } else {
        toast.error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
        <div className="p-4 shadow rounded" style={{ width: '100%', maxWidth: '400px', backgroundColor: '#fff' }}>
          <h2 className="text-center mb-4">Welcome Back</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </button>
              <button type="submit" className="btn btn-primary btn-lg px-4" style={{ borderRadius: '10px' }}>
                Login
              </button>
            </div>
          </form>

          <div className="text-center mt-3">
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="btn btn-link p-0"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
