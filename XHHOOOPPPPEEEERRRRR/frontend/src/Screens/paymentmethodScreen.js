import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { savepaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/checkoutSteps'

export default function PaymentmethodScreen(props) {
    const cart=useSelector((state)=>state.cart)
    const {shippingAddress}=cart;
    if(!shippingAddress){
        props.history.push('/shipping');
    }
    const [paymentMethod,setpaymentMethod]=useState('paypal')
    const dispatch=useDispatch()
    const sumbmithandler=(e)=>{

        e.preventDefault();
        dispatch(savepaymentMethod(paymentMethod))
        props.history.push('/placeorder')
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="form" onSubmit={sumbmithandler}>
                <div>
                    <h1>Payment</h1>
                </div>
                <div>
                    <div>
                        <input type="radio" id="paypal" value="paypal" name="paymentMethod" required checked
                        onChange={(e)=>{setpaymentMethod(e.target.value)}}></input>
                        <label htmlFor="paypal">Paypal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" id="stripe" value="stripe" name="paymentMethod" required checked
                        onChange={(e)=>{setpaymentMethod(e.target.value)}}></input>
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                </div>
                <button type="submit" className="primary">Continue</button>
            </form>
        </div>
    )
}
