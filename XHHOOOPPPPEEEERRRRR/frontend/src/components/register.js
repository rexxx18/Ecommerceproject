import React from 'react'
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Register } from '../actions/userActions';
import {useDispatch,useSelector} from 'react-redux';
import MessageBox from './MessageBox';
import LoadingBox from './LoadingBox';

export default function Registerscreen(props) {
    const [name,setname]=useState("");
    const [email,setemail] =useState("")
    const [password,setpassword]=useState("");
    const [confirmpassword,setconfirmpassword]=useState("")

    const redirect=props.location.search?props.location.search.split("=")[1]:'/';

    const userRegister=useSelector(state=>state.userRegister)
    const {userInfo,loading,error}=userRegister



    const dispatch=useDispatch()
    const submithandler=(e)=>{
        e.preventDefault();
        if(confirmpassword!==password)
        {
            alert('password and confirm password does not match')
        }
        else{
            dispatch(Register(name,email,password));
        }

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
                        Create Account
                    </h1>
                </div>
                {loading&&<LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                <label htmlFor="name">Email Address</label>
                    <input
                     type="text"
                     id="name"
                     placeholder="Enter name"
                     required onChange={(e)=>{setname(e.target.value)}} />
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
                       <label htmlFor="Confirm password">Password</label>
                    <input
                     type="confirm password"
                     id="confirm password"
                     placeholder="Enter confirm Password"
                     required onChange={(e)=>{setconfirmpassword(e.target.value)}} />
                </div>
                <div>
                    <button className="primary" type="submit">Register</button>
                </div>
                <div>
                    <label />
                    Already have a account ? <Link to={`/signin?redirect=${redirect}`}>Signin</Link>
                </div>
            </form>
            
        </div>
    )
}
