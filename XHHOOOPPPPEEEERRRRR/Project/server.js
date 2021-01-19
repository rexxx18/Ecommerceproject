import express from 'express';
import userRouter from './Router/userRouter.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRouter from './Router/productRouter.js';
import orderRouter from './Router/orderRouter.js';
import uploadRouter from './Router/uploadRouter.js';


dotenv.config();
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));



mongoose.connect(process.env.MONGO_URL||'mongodb://localhost/Xhoper',{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true
})

app.get('/',(req,res)=>{
    res.send("Hi from the server side")
})






app.use('/api/users',userRouter);

app.use(`/api/uploads`,uploadRouter)
app.use('/api/products',productRouter);
app.use('/api/orders',orderRouter);
app.use('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID||'AcLTMBE2K9lyd1ji9RmrH9tFvs__l6O4Cc6obo3jNTmRB10eTwnBFtW4clPjiRgU0zzNblXE4z9j3Nis');
})






app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message});
})
const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log("The server is listening in this port");
})