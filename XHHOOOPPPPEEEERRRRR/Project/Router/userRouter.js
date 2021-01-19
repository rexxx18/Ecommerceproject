import express from 'express';
import data from '../data.js';
import USER from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
import {generateToken, isAuth} from '../utils.js';
import bcrypt from 'bcryptjs'


const userRouter=express.Router();

userRouter.get('/seed',expressAsyncHandler(async (req,res)=>{
    await USER.remove({});
    const createdUser= await USER.insertMany(data.users);
    res.send({createdUser});
}))


userRouter.post('/signin',expressAsyncHandler(async(req,res)=>{
    console.log("entered");
    const user=await USER.findOne({email:req.body.email});
    // console.log(user.email);
    // console.log(user.password);
    if(user){
        console.log("user")
        if(bcrypt.compareSync(req.body.password,user.password)){
    
            res.send({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user)

            });
            
            return;
        }
       
    }
    res.status(401).send({message:"Invalid Password or Email"});
}))



userRouter.post('/register',expressAsyncHandler(async (req,res)=>{
    console.log("enterd")
    console.log(req.body)
    const user=new USER({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8)
    });
    const createdUser=await user.save();
    
    res.send({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(createdUser)

    })
}))


userRouter.get('/:id',expressAsyncHandler(async(req,res)=>{


    const user=await USER.findById(req.params.id);
    if(user){
        res.send(user);
    }else{
        res.status(404).send({message:"User Not Found"})
    }



}))


userRouter.put('/profile',
isAuth,
expressAsyncHandler(async (req,res)=>{
    const user=await USER.findById(req.user._id);
    if (user){
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;
        if(req.body.password){
            user.password=bcrypt.hashSync(req.body.password,8);
        }
        const updateduser=await user.save();
        console.log(updateduser);
        res.send({
            _id:updateduser._id,
            name:updateduser.name,
          
            email:updateduser.email,
            isAdmin:updateduser.isAdmin,
            token:generateToken(updateduser)
        })
    }
}))

export default userRouter;