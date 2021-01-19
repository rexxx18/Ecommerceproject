import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:String,
        required:false
    }
},{
    timestamps:true
})

const USER=mongoose.model('USER',userSchema);

export default USER;