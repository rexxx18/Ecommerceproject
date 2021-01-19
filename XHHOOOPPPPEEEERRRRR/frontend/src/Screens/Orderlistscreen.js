import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions';
import { listOrders,deleteOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

export default function Orderlistscreen(props) {

    const orderList=useSelector(state=>state.orderList);
    const {loading,error,orders}=orderList
    const orderDelete=useSelector(state=>state.orderDelete);
    const {loading:deleteloading,error:deleteerror,success:deletesuccess}=orderDelete

    const deleteHandler=(order)=>{

       if(window.confirm("Are You sure You wanna delete The order?")){
           dispatch(deleteOrder(order._id));
       };


    }

    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch({type:ORDER_DELETE_RESET})
        dispatch(listOrders())
        
    },[dispatch,deletesuccess])
    return (
        <div>
             <div>
          <h1>Orders</h1>  
          {deleteloading && <LoadingBox></LoadingBox>}
          {deleteerror && <MessageBox variant="danger">{deleteerror}</MessageBox>}
          {loading?<LoadingBox></LoadingBox>:
          error?<MessageBox variant="danger">{error}</MessageBox>
        :(
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th>ACTIONS</th>
                    </tr>
                    
                </thead>
                {!orders?null:(<tbody>
                    {orders.map((order)=>
                        
                        (<tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.shippingAddress.fullname}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.isPaid?order.paidAt.substring(0,10):"No"}</td>
                            <td>{order.isDelivered?order.deliveredAt.substring(0,10):"No"}</td>
                            <td><button type="button" className="small" onClick={()=>props.history.push(`/order/${order._id}`)}>Details</button>
                            <button onClick={()=>deleteHandler(order)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>)}
            </table>
        )}
        </div>
        </div>
    )
}
