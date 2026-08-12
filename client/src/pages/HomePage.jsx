import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/auth'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [auth, setAuth] = useAuth();  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth)); 
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/product/all');
        if (response.status === 200) {
          setProducts(response.data.products); 
        } else {
          console.error('Failed to fetch products:', response.data.message);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    if (!auth || !auth.user || !auth.token) {   
      navigate('/login');  
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/api/usercart/cart/add',
        {
          productId: productId,
          quantity: 1,  
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: auth?.token
          },
        }
      );

      if (response.status === 200) {
        setCartItems((prev) => ({ ...prev, [productId]: 1 }));
        toast.success('Product added to cart, move to cart to checkout');
      } else {
        toast.error("Failed to add product to cart");
      }
    } catch (err) {
      console.error('Error adding product to cart:', err);
    }
  };

  const increaseQuantity = async (productId) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/usercart/cart/add',
        {
          productId: productId,
          quantity: 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: auth?.token
          },
        }
      );

      if (response.status === 200) {
        setCartItems((prev) => ({ ...prev, [productId]: (prev[productId] || 1) + 1 }));
        toast.success('Increased product quantity, check in cart');
      }
    } catch (err) {
      console.error('Error increasing product quantity:', err);
    }
  };

  return (
    <Layout>
      {loading ? (
        <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading products...</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '15px',
          padding: '20px',
          gridAutoRows: 'minmax(200px, auto)', 
        }}>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                textAlign: 'center',
                boxShadow: '0 0 5px rgba(0,0,0,0.05)',
                width: '100%',
                margin: '0 auto'
              }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'contain',
                    marginBottom: '10px'
                  }}
                />
                <h4 style={{ margin: '8px 0' }}>{product.name}</h4>
                <p style={{ marginBottom: '10px' }}>Price: ${product.price}</p>

                <button
                  disabled={!!cartItems[product._id]}
                  onClick={() => addToCart(product._id)}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: cartItems[product._id] ? '#a1d6a1' : '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: cartItems[product._id] ? 'not-allowed' : 'pointer',
                    marginBottom: '8px'
                  }}
                >
                  Add to Cart
                </button>

                {cartItems[product._id] && (
                  <div>
                    <button
                      onClick={() => increaseQuantity(product._id)}
                      style={{
                        padding: '6px 10px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', width: '100%' }}>No products available</p>
          )}
        </div>
      )}
  
      <style jsx>{`
        @media (max-width: 1200px) {
          .product-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (max-width: 992px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .product-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Layout>
  );
};

export default HomePage;
