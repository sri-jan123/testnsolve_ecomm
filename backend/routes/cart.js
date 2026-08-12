const express = require('express');
const router = express.Router();
const requireSignIn = require('../middlewares/requireSignIn');
const User = require('../models/user');
const Product = require('../models/product');  

router.get('/cart', requireSignIn, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('cart.productId');
        const cart = user.cart;

        let total = 0;
        let totalQuantity = 0;

        cart.forEach((item) => {
            total += item.productId.price * item.quantity;
            totalQuantity += item.quantity;
        });

        const discount = totalQuantity >= 10 ? 0.1 : 0; 
        const totalWithDiscount = total * (1 - discount); 

        res.status(200).json({
            cart,
            total,
            discount: discount * 100,  
            totalWithDiscount,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/cart/add', requireSignIn, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const user = await User.findById(req.user.id);
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const existingProductIndex = user.cart.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (existingProductIndex !== -1) {
            user.cart[existingProductIndex].quantity += quantity;
        } else {
            user.cart.push({ productId, quantity });
        }

        
        let totalQuantity = user.cart.reduce((sum, item) => sum + item.quantity, 0);
        user.totalQuantity = totalQuantity;

        await user.save();
        res.status(200).json({ message: 'Product added to cart' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/cart/remove', requireSignIn, async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user.id);
        user.cart = user.cart.filter(
            (item) => item.productId.toString() !== productId
        );

        await user.save();
        res.status(200).json({ message: 'Product removed from cart' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



router.post('/cart/increase', requireSignIn, async (req, res) => {
    try {
      const { productId } = req.body;
      const user = await User.findById(req.user.id);
  
      const cartItem = user.cart.find(
        (item) => item.productId.toString() === productId
      );
  
      if (cartItem) {
        cartItem.quantity += 1;
        await user.save();
        res.status(200).json({ message: 'Product quantity increased' });
      } else {
        res.status(404).json({ message: 'Product not found in cart' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post('/cart/removeAll', requireSignIn, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.cart = [];
        
        await user.save();
        res.status(200).json({ message: 'All items removed from cart' });
    } catch (err) {
        console.error('Error removing all items from cart:', err);
        res.status(500).json({ error: 'Failed to remove items from cart' });
    }
});

  router.post('/cart/decrease', requireSignIn, async (req, res) => {
  try {
    const { productId } = req.body; 
    const user = await User.findById(req.user.id); 


    const cartItem = user.cart.find((item) => item.productId.toString() === productId);

    if (cartItem) {
     
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        await user.save(); 
        res.status(200).json({ message: 'Product quantity decreased' });
      } else {
        res.status(400).json({ message: 'Quantity cannot be less than 1' }); 
      }
    } else {
      res.status(404).json({ message: 'Product not found in cart' }); 
    }
  } catch (err) {
    res.status(500).json({ error: err.message }); 
  }
});

  


router.post('/cart/checkout', requireSignIn, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const cart = user.cart;
        const total = cart.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

        
        user.purchaseHistory += 1;
        user.cart = [];  

        await user.save();

        res.status(200).json({
            message: 'Checkout successful',
            total,
            purchaseHistory: user.purchaseHistory,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
