
const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const config=require('config');
const jwt=require('jsonwebtoken');
const auth=require('../../middleware/auth');
//Item Model
const User=require('../../models/User');
//@route get item /api/auth
router.get('/',(req,res)=>{
   res.send('registered')
});
//post
router.post('/',(req,res)=>{
   const{email,password}=req.body
   //Simple Validation
   if(!email || !password){
       return res.status(400).json({
           msg:"Please enter all fields"
       });
   }
   //existing user
   User.findOne({email})
   .then(user=>{
       if(!user){
           return res.status(400).json({
           msg:"User doesn't exists"
       });
    }
       //validate password
       bcrypt.compare(password,user.password)
       .then(isMatch=>{
           if(!isMatch)
           return res.status(400).json({msg:"invalid credentials"});
           jwt.sign(
            {id:user.id },
            config.get('jwtSecret'),
            {expiresIn:3600},
            (err,token)=>{
                if(err) throw err;
                res.json({
                    token,
                    user:{
                        id:user.id,
                        name:user.name,
                        email:user.email
                    }
                });
            }
           
        )
       })
       
   })
});

//get /api/auth/user
router.get('/user',auth,(req,res)=>{
    User.findById(req.user.id)
    .select('-password')
    .then(user=>res.json(user));
})
module.exports=router;