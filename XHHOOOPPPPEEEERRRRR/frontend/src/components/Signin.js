import React from 'react'
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Signin } from '../actions/userActions';
import {useDispatch,useSelector} from 'react-redux';
import MessageBox from './MessageBox';
import LoadingBox from './LoadingBox';

export default function SigninScreen(props) {
    const [email,setemail] =useState("")
    const [password,setpassword]=useState("");

    const redirect=props.location.search?props.location.search.split("=")[1]:'/';

    const userSignin=useSelector(state=>state.userSignin)
    const {userInfo,loading,error}=userSignin



    const dispatch=useDispatch()
    const submithandler=(e)=>{
        e.preventDefault();
        dispatch(Signin(email,password));

    }



    useEffect(() => {

        if(userInfo){
            props.history.push(redirect);
        }

       
    }, [props.history,redirect,userInfo])




    return (
        <div>
            <form className="form" onSubmit={submithandler}>
                <div>
                    <h1>
                        SignIn
                    </h1>
                </div>
                {loading&&<LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input
                     type="email"
                     id="email"
                     placeholder="Enter Email"
                     required onChange={(e)=>{setemail(e.target.value)}} />
                      <label htmlFor="password">Password</label>
                    <input
                     type="password"
                     id="password"
                     placeholder="Enter Password"
                     required onChange={(e)=>{setpassword(e.target.value)}} />
                </div>
                <div>
                    <button className="primary" type="submit">SignIn</button>
                </div>
                <div>
                    <label />
                    New Customer ? <Link to={`/register?redirect=${redirect}`}>Create Your Account</Link>
                </div>
            </form>
            
        </div>
    )
}
