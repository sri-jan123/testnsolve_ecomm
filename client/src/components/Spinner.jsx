import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Spinner = () => {
  const [count, setCount] = useState(5); 
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 1) {
          clearInterval(interval); 
          navigate('/login'); 
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval); 
  }, [navigate]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <h1 className="text-center">
        Redirecting you in {count} second{count !== 1 ? 's' : ''}
      </h1>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
