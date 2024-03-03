var bcrypt = require('bcrypt');
const saltRounds = 10;
const USERS =require('../models/userModel')
const jwt = require('jsonwebtoken');

const doSignup=(req,res)=>{
    try {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash){
            USERS({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
            email:req.body.email,
            mobileNumber:req.body.mobileNumber,
            password:hash
            }).save().then(response=>{
                res.status(200).json({message:'signup successfull'})
            })
            .catch((err)=>{
                console.log(err);
               if(err.code==11000)
                    res.status(500).json({message:"signup failed due to duplicate email "}) 
            })
                })
    } catch (error) {
        res.status(500).json({message:"signup failed",error})
    }


}

const doLogin=async (req,res)=>{
    try {
        
 
    const user =await USERS.findOne({email:req.body.email})
    if(user){
        bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (result ) {
                user.password=undefined
                const options = {
                    expiresIn: '2d', 
                    algorithm: 'HS256'
                  };
                const token = jwt.sign({name:user.name}, process.env.JWT_PASSWORD, options);
                res.status(200).json({token,user})
            } else {
             res.status(401).json({message:'invalid credentials'})
            }
          });
    }else{
        res.status(401).json({message:'invalid credentials2'})
    }
} catch (error) {
    res.status(500).json('some thing went wrong ')
}
}

module.exports={doSignup,doLogin}