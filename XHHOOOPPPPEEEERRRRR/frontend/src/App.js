
import React from 'react';
import {useSelector,useDispatch} from 'react-redux';

import {BrowserRouter, Link, Route} from 'react-router-dom';
import { Signout } from './actions/userActions';
import AdminRoute from './components/adminRoute';
import PrivateRoute from './components/privateRoute';
import Registerscreen from './components/register';
import SigninScreen from './components/Signin';
import Cartscreen from './Screens/Cartscreen';
//>.................................................
import HomeScreen from './Screens/HomeScreen';
import OrderHistoryScreen from './Screens/orderHistoryScreen';
import Orderlistscreen from './Screens/Orderlistscreen';
import OrderScreen from './Screens/orderScreen';
import PaymentmethodScreen from './Screens/paymentmethodScreen';
import PlaceorderScreen from './Screens/placeorderScreen';
import ProducteditScreen from './Screens/producteditScreen';
import ProductListScreen from './Screens/productListScreen';
import ProductScreen from './Screens/productScreen';
import ProfileScreen from './Screens/profileScreen';
import ShippingAdrressscreen from './Screens/shippingAdrressscreen';


function App() {
  const cart=useSelector(state=>state.cart);
  
  const {cartItems}=cart
  const userSignin=useSelector(state=>state.userSignin)
  const {userInfo}=userSignin
  // console.log(cartItems);
  // console.log(cartItems.length);

  const dispatch=useDispatch()

  const signouthandler=()=>{
    dispatch(Signout())
  }
  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">Xhoper</Link>
        </div>
        <div>
          <Link to='/cart'>Cart
          {cartItems.length>0 &&( <span className="badge">{cartItems.length}</span>)}
          </Link>
          {userInfo?
          
          (
          <div className="dropdown"><Link to="#">{userInfo.name}<i className="fa fa-caret-down"></i></Link>
          <ul className="dropdown-content">
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/orderhistory">OrderHistory</Link></li>
            <li><Link to="#signout" onClick={signouthandler}>Signout</Link></li>
            
          </ul>
          </div>):
          (<Link to="/signin">Sign In</Link>)}
          {userInfo && userInfo.isAdmin && (
            <div className="dropdown">
              <Link to="#admin">Admin <i className="fa fa-caret-down"></i></Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/productlist">Product List</Link>
                </li>
                <li>
                  <Link to="/orderlist">OrderList</Link>
                </li>
                <li>
                  <Link to="/userlist">Users</Link>
                </li>
              </ul>

            </div>
          )}
        </div>
      </header>
    <main>
      <Route path='/cart/:id?' component={Cartscreen}></Route>
      <Route path='/product/:id'  component={ProductScreen} exact></Route>
      <Route path='/product/:id/edit'  component={ProducteditScreen} exact></Route>
      <Route path="/signin" component={SigninScreen}></Route>
      <Route path="/register" component={Registerscreen}></Route>
      <Route path="/shipping" component={ShippingAdrressscreen}></Route>
      <Route path="/payment" component={PaymentmethodScreen}></Route>
      <Route path="/placeorder" component={PlaceorderScreen}></Route>
      <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
      <Route path="/order/:id" component={OrderScreen}></Route>
      <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
      <AdminRoute path="/productlist" component={ProductListScreen}></AdminRoute>
      <AdminRoute path="/orderlist" component={Orderlistscreen}></AdminRoute>
      <Route path='/' component={HomeScreen} exact></Route>
      
     
      

    </main>
    <footer className="row center">All right reserved</footer>

    </div>
    </BrowserRouter>
  );
}

export default App;
