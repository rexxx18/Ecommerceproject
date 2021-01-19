import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAdmin, isAuth } from '../utils.js';


const orderRouter=express();

orderRouter.get('/',isAuth,isAdmin,expressAsyncHandler(async (req,res)=>{
    console.log('orderRouter')
    const orders=await Order.find({}).populate('User','name');
    console.log(orders)
    res.send(orders);
}))



orderRouter.get(
    '/mine',
        isAuth,
    expressAsyncHandler(async (req, res) => {
        console.log("enterd");
      const orders = await Order.find({ user: req.user._id });
      res.send(orders);
    })
  );


orderRouter.post('/',

isAuth,

expressAsyncHandler(async (req,res)=>{


    
        

        if(req.body.orderItems.length===0){
            res.status(400).send({message: "cart is Empty"});
        }else{
            
            console.log(req.user);
            const order=new Order({
                orderItems:req.body.cartItems,
                shippingAddress:req.body.shippingAddress,
                paymentMethod:req.body.paymentMethod,
                itemsPrice:req.body.itemsPrice,
                shippingPrice:req.body.shippingPrice,
                taxPrice:req.body.taxprice,
                totalPrice:req.body.totalprice,
                user: req.user._id,

            });
            const createOrder=await order.save();
          
            
            res.status(201).send({message:"New Order Created",order:createOrder})
        }

    }

))


orderRouter.get('/:id',isAuth,expressAsyncHandler(async(req,res)=>{

    const order=await Order.findById(req.params.id);

    if(order){
        res.send(order);
    }

    else{
        res.status(404).send({message:"Order not Found"});
    }

}));

orderRouter.put('/:id/pay',isAuth,expressAsyncHandler(async (req,res)=>{
    const order=await Order.findById(req.params.id);
    if(order){
        order.isPaid=true;
        order.paidAt=Date.now();
        order.paymentResult={
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.email_address
        }
        const updatedOrder=await order.save();
        res.send({message:'order Paid', order:updatedOrder})
    }else{
        res.status(404).send({message:"Order Not Found"})
    }

}))

orderRouter.delete('/:id',isAuth,isAdmin,expressAsyncHandler(async (req,res)=>{
    const order=Order.findById(req.params.id);
    if(order){
        const deleteorder=await order.remove();
        res.send({message:"Order Deleted",deleteorder})

    }else{
        res.status(404).send({message:"Order Not Found"})
    }
}))

orderRouter.put('/:id/deliver',isAuth,expressAsyncHandler(async (req,res)=>{
    const order=await Order.findById(req.params.id);
    if(order){
        order.isDelivered=true;
        order.deliveredAt=Date.now();
        
        const updatedOrder=await order.save();
        res.send({message:'order Paid', order:updatedOrder})
    }else{
        res.status(404).send({message:"Order Not Found"})
    }

}))







export default orderRouter;