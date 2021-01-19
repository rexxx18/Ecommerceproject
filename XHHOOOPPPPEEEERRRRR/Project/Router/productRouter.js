import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import PRODUCT from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';

const productRouter=express.Router();


productRouter.get('/',expressAsyncHandler(async (req,res)=>{
    const product=await PRODUCT.find({});
    res.send(product);
}))


productRouter.get('/seed',
    
    expressAsyncHandler(async (req,res)=>{

    //await PRODUCT.remove({});

    const createdproducts=await PRODUCT.insertMany(data.products);
    
    res.send({createdproducts});

    

}))


productRouter.get('/:id',expressAsyncHandler(async (req,res)=>{
    const product=await PRODUCT.findById(req.params.id);
    if(product){
        res.send(product)
    }
    else{
        res.status(404).send({message:'Product Not found'})
    }

}))


productRouter.post('/',isAuth,isAdmin,expressAsyncHandler(async (req,res)=>{


    const product=new PRODUCT({
        name:'sample Name'+Date.now(),
        category: 'Shirts',
        image: '/images/p1.jpg',
        price: 0,
        countInStock: 1,
        brand: 'N',
        rating: 0,
        numReviews: 0,
        description: 'product'
    })

    const createdproduct=await product.save();
    res.send({message:"Created product",product:createdproduct});

}))

productRouter.put('/:id',isAuth,isAdmin,expressAsyncHandler(async (req,res)=>{
    const productId=req.params.id;
    const product=await PRODUCT.findById(productId);
    if(product){
        product.name=req.body.name;
        product.price=req.body.price;
        product.image=req.body.image;
        product.countInStock=req.body.countInStock;
        product.category=req.body.category;
        product.brand=req.body.brand;
        product.description=req.body.description;

        const updatedproduct=await product.save();
        res.send({message:"Updated Product" , product:updatedproduct})

    }else{
        res.status(401).send({message:'Product Not Found'})
    }
}))




productRouter.delete('/:id',isAuth,isAdmin,expressAsyncHandler(async (req,res)=>{
    const product=await PRODUCT.findById(req.params.id);
    if(product){
        const deleteproduct=await product.remove();
        res.send({message:"The product is deleted",product:deleteproduct})
    }else{
        res.status(404).send({messsage:"product Not Found"})
    }
}))


export default productRouter;