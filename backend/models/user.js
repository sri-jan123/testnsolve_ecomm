const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
     required:true,
     unique:true,
     type:String
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String,
    },
    question:{
        type:String,
        required:true
    },
    cart: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 },
        },
    ],
    purchaseHistory: { type: Number, default: 0 }, 
})
module.exports=mongoose.model("user",userSchema)