const express=require('express')
const router=express.Router()
const user=require("../models/user")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const requireSignIn=require("../middlewares/requireSignIn")


router.post('/register',async function(req,res){
    try {
        const { username, email, password, question } = req.body;  
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt); 
        const newUser = new user({ username, email, password: hashedPassword,question });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/login', async function(req, res) {
    try {
        const logger = await user.findOne({ email: req.body.email }).select("+password");
        if (!logger) {
            return res.status(404).json({ message: "User not found" });
        }

        const match = await bcrypt.compare(req.body.password, logger.password);
        if (!match) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: logger._id, username: logger.username, email: logger.email },
            process.env.SECRET,
            { expiresIn: "3d" }
        );

        res.cookie("token", token, { httpOnly: true });
        const userData = {
            id: logger._id,
            username: logger.username,
            email: logger.email,
        };

        res.status(200).json({ message: "Successfully logged in", token,user:userData });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/logout', async function(req,res){
    res.clearCookie("token");
    res.status(200).json("succesfully logged out");
})


router.post('/forgot-password', async function(req, res) {
    try {
      const { email, question, newPassword } = req.body;
  
      if (!email) {
        return res.status(400).send({ message: 'Email is required' });
      }
  
      if (!newPassword) {
        return res.status(400).send({ message: 'New password is required' });
      }
  
      if (!question) {
        return res.status(400).send({ message: 'Question is required' });
      }
  
      const user1 = await user.findOne({ email, question });
  
      if (!user1) {
        return res.status(404).send({
          success: false,
          message: 'Wrong email or question',
        });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      await user.findByIdAndUpdate(user1._id, { password: hashedPassword });
  
      res.status(200).send({
        success: true,
        message: 'Password reset successfully',
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: 'Something went wrong',
        error: err.message,
      });
    }
  });
  

router.get('/test',requireSignIn,function(req,res){
    try{
      res.send("hello")
    }
    catch(err){
       console.log(err)
    }
})

router.get('/user-auth',requireSignIn,function(req,res){
    res.status(200).send({ok:true})
})

module.exports=router