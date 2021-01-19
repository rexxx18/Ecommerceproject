import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { CreateOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/checkoutSteps'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import Cartscreen from './Cartscreen'

export default function PlaceorderScreen(props) {
    const cart=useSelector(state=>state.cart)
    const orderCreate=useSelector(state=>state.orderCreate);
    
    const {loading,success,error,order}=orderCreate;
    
    if(!cart.paymentMethod){
        props.history.push('/payment');
    }
    const toPrice = (num) => Number(num.toFixed(2));

    cart.itemsPrice = 
        toPrice(cart.cartItems.reduce((a,c)=>a+c.qty*c.price,0))
      
   

    cart.shippingPrice=cart.itemsPrice>100?toPrice(0):toPrice(25);
    cart.taxprice=toPrice(0.15*cart.itemsPrice);
    cart.totalprice=cart.itemsPrice+cart.shippingPrice+cart.taxprice;

    const dispatch=useDispatch();

    const placeOrderHandler=(e)=>{
        e.preventDefault();

        dispatch(CreateOrder({...cart,orderItems:cart.cartItems}))

    }

    useEffect(()=>{
        if(success){
            console.log(order);
            props.history.push(`/order/${order._id}`);
            dispatch({type:ORDER_CREATE_RESET})
        }
    },[dispatch,order,props.history,success])

    
    return (
        <div>
           <CheckoutSteps step1 step2 step3 step4></CheckoutSteps> 
           <div className="row top">
               <div className="col-2">
                   <ul>
                       <li>
                           <div className="card card-body">
                               <h2>Shipping</h2>
                               <p>
                                   <strong>Name:</strong>{cart.shippingAddress.fullname}<br/>
                                   <strong>Address:</strong>{cart.shippingAddress.address},
                                   {cart.shippingAddress.city},{cart.shippingAddress.postalcode},{cart.shippingAddress.country}
                               </p>
                           </div>
                       </li>
                       <li>
                           <div className="card card-body">
                               <h2>Payment</h2>
                               <p>
                                   <strong>Method:</strong>{cart.paymentMethod}
                                  
                               </p>
                           </div>
                       </li>
                       <li>
                           <div className="card card-body">
                               <h2>Order Items</h2>
                               <ul>
                        {cart.cartItems.map(item=>(
                            <li key={item.product}>
                                <div className="row">
                                    <div>
                                        <img src={item.image} alt={item.name} className="small"></img>
                                    </div>
                                    <div className="min-30">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>
                                
                                
                                <div>
                                    {item.qty}x${item.price}=${item.price*item.qty}
                                </div>
                                
                              </div>
                            </li>
                        ))}
                    </ul>
                           </div>
                       </li>
                   </ul>
               </div>
               
        <div className="col-1">
          <div className="card card-body">
              <ul>
                  <li>
                      <h2>Order Smmary</h2>
                  </li>
                  <li className="row">
                      <div>
                          Items
                      </div>
                      <div>${cart.itemsPrice.toFixed(2)}</div>
                  </li>
                  <li className="row">
                      <div>
                         Shipping
                      </div>
                      <div>${cart.shippingPrice.toFixed(2)}</div>
                  </li>
                  <li className="row">
                      <div>
                         Tax
                      </div>
                      <div>${cart.taxprice.toFixed(2)}</div>
                  </li>
                  <li className="row">
                      <div>
                         <strong>Total</strong>
                      </div>
                      <div>${cart.totalprice.toFixed(2)}</div>
                  </li>
                  <li>
                      <button type="button" onClick={placeOrderHandler} className="primary block" disabled={cart.cartItems.length===0}>
                          Place Order
                      </button>
                  </li>
                  {loading && <LoadingBox></LoadingBox>}
                  {error && <MessageBox variant="danger">{error}</MessageBox>}
              </ul>
          </div>
        </div>
        </div>
        </div>
    )
}
