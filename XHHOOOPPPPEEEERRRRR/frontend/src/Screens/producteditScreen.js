import React ,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import Axios from '../../node_modules/axios/index';
import { detailsproducts, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProducteditScreen(props) {
    const productId=props.match.params.id;
    const [name,setname]=useState("");
    const [price,setprice]=useState("");
    const [countInStock,setcountInStock]=useState("");
    const [image,setimage]=useState("");
    const [category,setcategory]=useState("");
    const [brand,setbrand]=useState('');
    const [description,setdescription]=useState("");


    const productDetails=useSelector(state=>state.productDetails);
    
    const {loading,error,product}=productDetails;

    const productUpdate=useSelector(state=>state.productUpdate);

    console.log(productUpdate)

    const {loading:updateloading, error:updateerror , success:updatesuccess}=productUpdate;

    const dispatch=useDispatch()


    const userSignin=useSelector(state=>state.userSignin);
    const {userInfo}=userSignin;


    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    useEffect(()=>{
        if(updatesuccess){
           
            props.history.push('/productlist');
        }
        if(!product || (product._id!==productId) || updatesuccess){
            
            dispatch({type:PRODUCT_UPDATE_RESET})
            dispatch(detailsproducts(productId))
        }
        else{
            setname(product.name);
            setprice(product.price);
            setimage(product.image);
            setcategory(product.category);
            setcountInStock(product.countInStock);
            setbrand(product.brand);
            setdescription(product.description);
        }

    },[
        product, dispatch, productId, updatesuccess, props.history
    ])

    const handleSubmit=(e)=>{

        
        e.preventDefault();
        dispatch(updateProduct({_id:productId,
        name,price,image,category,brand,countInStock,description}))

    }

    const uploadFileHandler=async (e)=>{
            const file=e.target.files[0];
            const bodyformdata=new FormData();
            bodyformdata.append('image',file);
            setLoadingUpload(true);
            try{
                const {data}=await Axios.post('/api/uploads',bodyformdata,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                    Authorization:`Bearer${userInfo.token}`
                }})

                setimage(data);
                setLoadingUpload(false);

            }catch(error){
                setErrorUpload(error.message)
                setLoadingUpload(false);
            }
    }

    return (
        <div>

            <form className="form" onSubmit={handleSubmit}>
                <div><h1>EDIT PRODUCT {productId}</h1></div>
                {updateloading && <LoadingBox></LoadingBox>}
                {updateerror && <MessageBox variant="danger">{updateerror}</MessageBox>}
                {loading?<LoadingBox></LoadingBox>:error?<MessageBox variant="danger">{error}</MessageBox>:
                <>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text"
                    id="name"
                    placeholder="enter name"
                    value={name}
                    onChange={(e)=>setname(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="text"
                    id="price"
                    placeholder="enter new price"
                    value={price}
                    onChange={(e)=>setprice(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input type="text"
                    id="Image"
                    placeholder="enter Image"
                    value={image}
                    onChange={(e)=>setimage(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="image file">Image file</label>
                    <input type="file"
                    id="Image file"
                    placeholder="enter Image file"
                    label="choose Image"
                    onChange={uploadFileHandler}></input>
                </div>
                {loadingUpload && <LoadingBox></LoadingBox>}
                {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
                <div>
                    <label htmlFor="CountInStock">Stock</label>
                    <input type="text"
                    id="Count In Stock"
                    placeholder="Count In Stock"
                    value={countInStock}
                    onChange={(e)=>setcountInStock(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="brand">Brand</label>
                    <input type="text"
                    id="brand"
                    placeholder="enter brand name"
                    value={brand}
                    onChange={(e)=>setbrand(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <input type="text"
                    id="category"
                    placeholder="enter category"
                    value={category}
                    onChange={(e)=>setcategory(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="description">description</label>
                    <textarea type="text"
                    id="description"
                    rows="3"
                    placeholder="enter description"
                    value={description}
                    onChange={(e)=>setdescription(e.target.value)}></textarea>
                </div>
                <div>
                    <label></label>
                    <button type="submit" className="primary" >Update</button>
                </div>
                </>}
            </form>
            
        </div>
    )
}
