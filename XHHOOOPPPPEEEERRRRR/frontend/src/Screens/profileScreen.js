import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/signinConstants';

export default function ProfileScreen(props) {
    const [name,setname]=useState("");
    const [password,setpassword]=useState("");
    const [email,setemail]=useState("");
    const [confirmPassword,setconfirmPassword]=useState("");
    const userSignin=useSelector((state)=>state.userSignin)
    const {userInfo}=userSignin;

    const userDetails=useSelector((state)=>state.userDetails);
    const {loading,error,user}=userDetails;
    const userUpdateProfile=useSelector((state)=>state.userUpdateProfile);
    const {
        success:successupdate,
        error:errorupdate,
        loading:loadingupdate,

    }=userUpdateProfile;
    console.log(errorupdate);
    console.log(userDetails)
    const dispatch=useDispatch()
    const submitHandler=(e)=>{
        

        e.preventDefault()

        if(password!==confirmPassword){
            alert("The password doesnot match");
        }
        else{
            dispatch(updateUserProfile({userId:user._id,name,email,password}))
        }

    }
    useEffect(()=>{

        if(!user){
        dispatch({type:USER_UPDATE_RESET})

        dispatch(detailsUser(userInfo._id));
        }else{
            setname(user.name);
            setemail(user.email);
        }
        
    },[dispatch])
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {loading?<LoadingBox></LoadingBox>:
                error?<MessageBox variant="danger"></MessageBox>:
                (
                <>
                {loadingupdate && <LoadingBox></LoadingBox>  }
                {errorupdate && (<MessageBox variant="danger">{errorupdate.status+errorupdate.statusText}</MessageBox>)}
                {successupdate && (<MessageBox variant="success">Profile Uploaded SuccessFully</MessageBox>)}
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                    id="name"
                    type="text"
                    placeholder="EnterName"
                    value={name}
                    onChange={(e)=>setname(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                    id="email"
                    type="text"
                    placeholder="EnterEmail"
                    value={email}
                    onChange={(e)=>setemail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                    id="password"
                    type="text"
                    placeholder="Enter Password"
                   onChange={(e)=>setpassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                    id="confirmPassword"
                    type="text"
                    placeholder="Enter password again"
                    onChange={(e)=>{setconfirmPassword(e.target.value)}}
                    ></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Update</button>
                </div>
                </>)}
            </form>
        </div>
    )
}
