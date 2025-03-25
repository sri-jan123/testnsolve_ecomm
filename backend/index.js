const express=require('express')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const app=express()
const cookieParser=require('cookie-parser')
const cors=require('cors')
const authRoute=require('./routes/auth')
const addProduct=require('./routes/productAdd')
const userCart=require('./routes/cart')

const connectDB=async()=>{
    try{
      await mongoose.connect(process.env.MONGO_URL)
      console.log("database connected")
    }
    catch(err){
      console.log(err)
    }
}

dotenv.config()
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoute)
app.use('/api/product',addProduct)
app.use('/api/usercart',userCart)
app.use(cookieParser());


app.listen(process.env.PORT,()=>{
    connectDB()
    console.log(`server running on PORT ${process.env.PORT}`)
})