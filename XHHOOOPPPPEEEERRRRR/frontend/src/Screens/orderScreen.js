import Axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2';
import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';


import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants';



export default function OrderScreen(props) {
    
    
   
    const orderId=props.match.params.id;
    const userSignin=useSelector(state=>state.userSignin);
    const {userInfo}=userSignin;
    const [sdkReady,setsdkReady]=useState(false);
    const orderDetails=useSelector((state)=>state.orderDetails);
    const {order,error,loading}=orderDetails;

    const orderPayment=useSelector((state)=>state.orderPayment)

    const {loading:loadingpay,error:errorpay ,success:successpay}=orderPayment
    const orderDeliver=useSelector((state)=>state.orderDeliver)

    const {loading:loadingdeliver,error:errordeliver ,success:successdeliver}=orderDeliver
   
   
    // const toPrice = (num) => Number(num.toFixed(2));

    const deliverHandler=()=>{
        dispatch(deliverOrder());
    }

    const dispatch=useDispatch();

  

    useEffect(()=>{
        const addPayPalScript=async()=>{
            const {data}=await Axios.get('/api/config/paypal');
            
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            
            script.async = true;
            script.onload=()=>{
                setsdkReady(true);
            }
            document.body.appendChild(script);
        }

        if(!order || successpay || successdeliver && (order && order._id !==orderId)){
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch(detailsOrder(orderId));
        }
        else{
            if(!order.isPaid){
                if(!window.paypal){
                    addPayPalScript();
                }else{
                    setsdkReady(true);
                }
            }
        }
      
    },[dispatch,orderId,sdkReady,order,successdeliver])

    const SuccessPaymentHandler=(paymentResult)=>{

        dispatch(payOrder(order,paymentResult));
       
    }

    // console.log(order)
    
    return loading?(<LoadingBox></LoadingBox>):
    error?(<MessageBox variant="danger">{error}</MessageBox>):
    
    (
        <div>
           <h1>Order:{order._id}</h1>
           <div className="row top">
               <div className="col-2">
                   <ul>
                       <li>
                           <div className="card card-body">
                               <h2>Shipping</h2>
                               <p>
                                   <strong>Name:</strong>{order.shippingAddress.fullname}<br/>
                                   <strong>Address:</strong>{order.shippingAddress.address},
                                   {order.shippingAddress.city},{order.shippingAddress.postalcode},{order.shippingAddress.country}
                               </p>
                               {order.isDelivered?(<MessageBox variant="success">order Delivered at :{order.deliveredAt}</MessageBox>):
                               (<MessageBox variant="danger">Not Delivered</MessageBox>)}
                           </div>
                       </li>
                       <li>
                           <div className="card card-body">
                               <h2>Payment</h2>
                               <p>
                                   <strong>Method:</strong>{order.paymentMethod}
                                  
                               </p>
                               {order.isPaid?(<MessageBox variant="success">Paid at :{order.paidAt}</MessageBox>):
                               (<MessageBox variant="danger">Not Paid</MessageBox>)}
                           </div>
                       </li>
                       <li>
                           <div className="card card-body">
                               <h2>Order Items</h2>
                               <ul>
                        {order.orderItems.map(item=>(
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
                      <h2>Order Summary</h2>
                  </li>
                  <li className="row">
                      <div>
                          Items
                      </div>
                      <div>${order.itemsPrice.toFixed(2)}</div>
                  </li>
                  <li className="row">
                      <div>
                         Shipping
                      </div>
                      <div>${order.shippingPrice.toFixed(2)}</div>
                  </li>
                  <li className="row">
                      <div>
                         Tax
                      </div>
                      <div>${order.taxPrice.toFixed(2)}</div>
                  </li>
                  <li className="row">
                      <div>
                         <strong>Total</strong>
                      </div>
                      <div>${order.totalPrice.toFixed(2)}</div>
                  </li>
                  {!order.isPaid && (
                      <li>
                          {!sdkReady?(<LoadingBox></LoadingBox>):
                          (
                              <>
                              {errorpay && (<MessageBox variant="danger">{errorpay}</MessageBox>)}
                              {loadingpay && <LoadingBox></LoadingBox>}
                              <PayPalButton amount={order.totalPrice} onSuccess={SuccessPaymentHandler}></PayPalButton>
                                </>
                          )}
                      </li>
                  )}

                  {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                      <li>
                          <button type="button" onClick={deliverHandler}>
                              Deliver Order
                          </button>

                      </li>
                  )}
                 
              </ul>
          </div>
        </div>
        </div>
        </div>
    )
}
