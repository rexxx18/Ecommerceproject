import React,{useEffect} from 'react';
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import { addToCart, removefromcart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function Cartscreen(props) {
    const productId=props.match.params.id;
    const qty=props.location.search?
    Number(props.location.search.split("=")[1]):1;
    const cart=useSelector((state)=>state.cart)
    const {cartItems}=cart;
    const dispatch=useDispatch();

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,qty));
        }
    },[dispatch,productId,qty])
    const removefromcarthandler=(id)=>{

        //product deletion from cart

        dispatch(removefromcart(id));

    }

    const checkoutHandler=()=>{

        props.history.push('/signin?redirect=shipping')

    }

    return (
        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
              
                    {cartItems.length===0?
                        (<MessageBox>
                            Cart is Empty ....<Link to='/'>Lets Go Shopping</Link>
                        </MessageBox>
                    ):(<ul>
                        {cartItems.map(item=>(
                            <li key={item.product}>
                                <div className="row">
                                    <div>
                                        <img src={item.image} alt={item.name} className="small"></img>
                                    </div>
                                    <div className="min-30">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>
                                
                                <div>
                                <select value={item.qty} onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value)))}>
                                {[...Array(item.countInStock).keys()].map(
                                                  (x)=>(
                                                      <option key={x+1} value={x+1}>{x+1}</option>
                                                  )

                                                  
                                              )}
                                </select>
                                </div>
                                <div>
                                    ${item.price}
                                </div>
                                <button type="button" onClick={()=>removefromcarthandler(item.product)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>)}
                    </div>
                    
                    <div className="col-1">
                        <div className="card card-body">
                            <ul>
                                <li>
                                    <h2>
                                        Subtotal ({cartItems.reduce((a,c)=>a+c.qty,0)}items):${cartItems.reduce((a,c)=>a+c.price*c.qty,0)};
                                    </h2>
                                </li>

                                <li>
                                    <button type="button" 
                                    onClick={checkoutHandler} 
                                    className="primaryBlock" 
                                    disabled={cartItems.length===0}>
                                        CheckOut
                                    </button>
                                </li>
                            </ul>
                        </div>

                    </div>
                
            
            
        </div>
    )
}
