import React, { useState, useEffect } from 'react';
import Layout from "../../components/layout/Layout";
import { useAuth } from '../../context/auth';
import axios from 'axios';

const Dashboard = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalWithDiscount, setTotalWithDiscount] = useState(0);
  const [isEligibleForDiscount, setIsEligibleForDiscount] = useState(false);

  // Function to fetch cart details
  const fetchCartDetails = async () => {
    if (!auth || !auth.token) return;

    try {
      const response = await axios.get('http://localhost:4000/api/usercart/cart', {
        headers: { Authorization: auth?.token },
      });

      if (response.status === 200) {
        setCart(response.data.cart);
        setTotal(response.data.total);
        setDiscount(response.data.discount);
        setTotalWithDiscount(response.data.totalWithDiscount);

        const totalQuantity = response.data.cart.reduce((sum, item) => sum + item.quantity, 0);
        setIsEligibleForDiscount(totalQuantity >= 10);
      } else {
        console.error('Failed to fetch cart details:', response.data.message);
      }
    } catch (err) {
      console.error('Error fetching cart details:', err);
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, [auth]);

  // Handle remove all items function
  const handleRemoveAllItems = async () => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/usercart/cart/removeAll',
        {},
        { headers: { Authorization: auth?.token } }
      );

      if (response.status === 200) {
        alert('All items removed from cart');
        
        fetchCartDetails();
      } else {
        console.error('Failed to remove all items:', response.data.error);
      }
    } catch (err) {
      console.error('Error removing all items:', err);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/usercart/cart/remove',
        { productId },
        { headers: { Authorization: auth?.token } }
      );

      if (response.status === 200) {
        alert('Item removed from cart');
        
        fetchCartDetails();
      } else {
        console.error('Failed to remove item:', response.data.error);
      }
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

 
  const handleIncreaseQuantity = async (productId) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/usercart/cart/increase',
        { productId },
        { headers: { Authorization: auth?.token } }
      );

      if (response.status === 200) {
        fetchCartDetails(); 
      } else {
        console.error('Failed to increase quantity:', response.data.error);
      }
    } catch (err) {
      console.error('Error increasing quantity:', err);
    }
  };

 
  const handleDecreaseQuantity = async (productId) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/usercart/cart/decrease',
        { productId },
        { headers: { Authorization: auth?.token } }
      );

      if (response.status === 200) {
        fetchCartDetails(); 
      } else {
        console.error('Failed to decrease quantity:', response.data.error);
      }
    } catch (err) {
      console.error('Error decreasing quantity:', err);
    }
  };

  return (
    <Layout>
      <div className="dashboard-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Dashboard</h1>

        <div className="cart-card" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
          <h2 style={{ marginBottom: '20px' }}>Shopping Cart</h2>

          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#777' }}>Your cart is empty</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div
                  key={item.productId._id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: '1px solid #eaeaea'
                  }}
                >
                  <div>
                    <p style={{ fontWeight: 'bold' }}>{item.productId.name}</p>
                    <p style={{ fontSize: '14px', color: '#666' }}>Quantity: {item.quantity}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button
                      onClick={() => handleIncreaseQuantity(item.productId._id)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#28a745',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      +
                    </button>
                    <p style={{ fontWeight: 'bold' }}>${item.productId.price}</p>
                    <button
                      onClick={() => handleDecreaseQuantity(item.productId._id)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.productId._id)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: 'red',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '15px' }}>
                <p>Total Quantity: <strong>{cart.reduce((total, item) => total + item.quantity, 0)}</strong></p>
                <p>Total: <strong>${total}</strong></p>
                <p>Discount: <strong>{discount}%</strong></p>
                <p>Total with Discount: <strong style={{ color: 'green' }}>${totalWithDiscount}</strong></p>
              </div>

              <div style={{ marginTop: '15px' }}>
                {isEligibleForDiscount ? (
                  <p style={{ color: 'green' }}>You are eligible for a 10% discount!</p>
                ) : (
                  <p style={{ color: 'red' }}>You are not eligible for a discount. Add more items to qualify.</p>
                )}
              </div>

              {cart.length > 0 && (
                <div style={{ textAlign: 'center', marginTop: '25px' }}>
                  <button
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                    onClick={() => alert('Proceed to Checkout')}
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          )}

        
          {cart.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
                onClick={handleRemoveAllItems}
              >
                Remove All Items
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
