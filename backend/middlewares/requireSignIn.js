const jwt=require('jsonwebtoken')

 const requireSignIn=async(req,res,next)=>{
    try{
    const decode=jwt.verify(req.headers.authorization,process.env.SECRET)
    req.user=decode
    next();
    }
    catch(err){
    //   console.log(err)
      res.status(401).json({message:"wrong token"})
    }
}

module.exports=requireSignIn;