// import React from 'react'
// import Layout from '../../components/layout/Layout'

// const Cart = () => {
//     const [auth, setAuth] = useAuth();
//   const [cart, setCart] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [discount, setDiscount] = useState(0);
//   const [totalWithDiscount, setTotalWithDiscount] = useState(0);
//   const [isEligibleForDiscount, setIsEligibleForDiscount] = useState(false); 

//   useEffect(() => {
//     const fetchCartDetails = async () => {
//       if (!auth || !auth.token) return;

//       try {
//         const response = await axios.get('http://localhost:4000/api/usercart/cart', {
//           headers: {
//             Authorization:auth?.token,
//           },
//         });

//         if (response.status === 200) {
//           setCart(response.data.cart);
//           setTotal(response.data.total);
//           setDiscount(response.data.discount);
//           setTotalWithDiscount(response.data.totalWithDiscount);
          
//           const totalQuantity = response.data.cart.reduce((sum, item) => sum + item.quantity, 0);
//           setIsEligibleForDiscount(totalQuantity >= 10); 
//         } else {
//           console.error('Failed to fetch cart details:', response.data.message);
//         }
//       } catch (err) {
//         console.error('Error fetching cart details:', err);
//       }
//     };

//     fetchCartDetails();
//   }, [auth]);
//   return (
//     <Layout>

// <div>
//   <h2>Shopping Cart</h2>
//   {cart.length === 0 ? (
//     <p>Your cart is empty</p>
//   ) : (
//     <div>
//       {cart.map((item) => (
//         <div key={item.productId._id}>
//           <p>{item.productId.name} - Quantity: {item.quantity} - Price: ${item.productId.price}</p>
//         </div>
//       ))}
//       <div>
//         <p>Total Quantity: {cart.reduce((total, item) => total + item.quantity, 0)}</p>
//         <p>Total: ${total}</p>
//         <p>Discount: {discount}%</p>
//         <p>Total with Discount: ${totalWithDiscount}</p>
//       </div>

//       <div>
//         {isEligibleForDiscount ? (
//           <p>You are eligible for a 10% discount!</p>
//         ) : (
//           <p>You are not eligible for a discount. Add more products to your cart to qualify.</p>
//         )}
//       </div>
//     </div>
//   )}
// </div>

// {cart.length > 0 && (
//   <button onClick={() => alert('Proceed to Checkout')}>Checkout</button>
// )}
//     </Layout>
//   )
// }

// export default Cart
