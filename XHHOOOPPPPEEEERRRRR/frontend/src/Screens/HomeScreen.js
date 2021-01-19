import React,{useEffect} from 'react';

import Product from '../components/product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useSelector,useDispatch} from 'react-redux'
import { listproducts } from '../actions/productActions';


export default function HomeScreen() {
  const dispatch=useDispatch()
 const productList= useSelector(state => state.productList)
 const {loading,error,products}=productList;


 console.log(loading);

  useEffect(()=>{
    dispatch(listproducts())
  },[])

    return (
        <>
        
        <div>
          {loading?(<LoadingBox></LoadingBox>):
           error?(<MessageBox>{error}</MessageBox>):
            (
              <div className="row center">
              {products.map((product)=>(
                <Product key={product._id} product={product}/>
              ))}
              
             
            </div>
            )}
           
        </div>

        </>
          
    )
}
