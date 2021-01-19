import {applyMiddleware, createStore,compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { Cartreducer } from './reducers/cartReducers';
import { ordercreateReducers, orderDeleteReducers, orderDeliverReducers, orderDetailsReducers, orderListReducers, orderMineListReducers, orderPayReducers } from './reducers/orderReducers';
import {ProductListReducers,ProductDetailsReducers, productCreateReducers, productUpdateReducers, productDeleteReducers} from './reducers/productReducers';
import { userSigninReducer,userRegisterReducer, userDetailsReducers, userUpdateProfileReducers } from './reducers/userReducers';


 

const initialState={
    userSignin:{
        userInfo:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
    },

    cart: {


        cartItems: localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
        shippingAddress:localStorage.getItem("shippingAddress")?JSON.parse(localStorage.getItem("shippingAddress")):{},
        paymentMethod:"paypal"
    },
    

};

const reducer=combineReducers({
    productList: ProductListReducers,
    productDetails: ProductDetailsReducers,
    cart: Cartreducer,
    userSignin:userSigninReducer,
    userRegister:userRegisterReducer,
    orderCreate:ordercreateReducers,
    orderDetails:orderDetailsReducers,
    orderPayment:orderPayReducers,
    orderMine:orderMineListReducers,
    userDetails:userDetailsReducers,
    userUpdateProfile:userUpdateProfileReducers,
    productCreate:productCreateReducers,
    productUpdate:productUpdateReducers,
    productDelete:productDeleteReducers,
    orderList:orderListReducers,
    orderDelete:orderDeleteReducers,
    orderDeliver:orderDeliverReducers
})
const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;

const store=createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;