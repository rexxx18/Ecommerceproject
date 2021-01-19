import CheckoutSteps from '../components/checkoutSteps'
import {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions';

export default function ShippingAdrressscreen(props) {
    
    const userSignin=useSelector((state)=>state.userSignin);
    const userInfo=userSignin;
    
    const cart=useSelector((state)=>state.cart)
    const {shippingAddress}=cart
    
    if(!userInfo)
    {
        props.history.push('/signin');
    }
    const [fullname,setfullname]=useState(shippingAddress.fullname);
    const [address,setaddress]=useState(shippingAddress.address);
    const [city,setcity]=useState(shippingAddress.city);
    const [postalcode,setpostalcode]=useState(shippingAddress.postalcode);
    const [country,setcountry]=useState(shippingAddress.country);
    const dispatch=useDispatch();
    const submithandler=(e)=>{

        e.preventDefault();
        dispatch(saveShippingAddress({fullname,address,city,postalcode,country}))
        props.history.push('/payment');

    }
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submithandler}>
                <div>
                <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" id="fullName" placeholder="Enter full name" value={fullname}
                    onChange={(e)=>{setfullname(e.target.value)}}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" placeholder="Enter address" value={address}
                    onChange={(e)=>{setaddress(e.target.value)}}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" placeholder="Enter city" value={city}
                    onChange={(e)=>{setcity(e.target.value)}}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="postalcode">postalcode</label>
                    <input type="text" id="postalcode" placeholder="Enter postalcode" value={postalcode}
                    onChange={(e)=>{setpostalcode(e.target.value)}}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" placeholder="Enter Country" value={country}
                    onChange={(e)=>{setcountry(e.target.value)}}
                    required
                    />
                </div>
                <button className="primary" type="submit">Continue</button>
            </form>
        </div>
    )
}
