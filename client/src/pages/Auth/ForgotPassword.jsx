import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [question, setNewQuestion] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:4000/api/auth/forgot-password`, {
        email,
        newPassword,
        question,
      });
      if (res.data) {
        navigate('/login');
        toast.success('Password reset successfully');
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
          <h2 className="text-center mb-4">Reset Password</h2>
          <form onSubmit={handleReset}>
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
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Your Security Question Answer</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Your favorite sport"
                value={question}
                onChange={(e) => setNewQuestion(e.target.value)}
                required
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg" style={{ borderRadius: '10px' }}>
                Reset Password
              </button>
            </div>
          </form>

          <div className="text-center mt-3">
            <p>
              Remember your password?{' '}
              <button onClick={() => navigate('/login')} className="btn btn-link p-0">
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
