import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { createProduct, deleteProduct, listproducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';

export default function ProductListScreen(props) {
    const productList=useSelector(state=>state.productList);
    const {loading,error,products}=productList;
    const productCreate=useSelector(state=>state.productCreate);
    const productDelete=useSelector((state)=>state.productDelete);

    const {
        loading:deleteloading,
        error:deleteerror,
        success:deletesuccess
    }=productDelete;

    
    const {loading:loadingcreate,error:errorcreate,success:successcreate,product:createdProduct}=productCreate;
    const dispatch=useDispatch()
    useEffect(()=>{
        if(successcreate){
           
            dispatch({type:PRODUCT_CREATE_RESET});
            props.history.push(`/product/${createdProduct._id}/edit`);
        }
        if(deletesuccess){
            dispatch({type:PRODUCT_DELETE_RESET})
        }
        dispatch(listproducts())
    },[createdProduct,successcreate,props.history,dispatch,deletesuccess])

    

    const deleteHandler=(product)=>{

        if(window.confirm("Are you Sure You wanna Delete tThe product?"))
        {
            dispatch(deleteProduct(product._id))
        }

        

    }

    
    const createHandler=()=>{
        dispatch(createProduct())
    }
    return (
        <div>
            <div className="row">
            <h1>Products</h1>
            <button type="button" className="primary" onClick={createHandler}>Add Products</button>
            </div>
            {deleteloading && <LoadingBox></LoadingBox>}
            {deleteerror && <MessageBox variant="danger">{deleteerror}</MessageBox>}
            {loadingcreate && <LoadingBox></LoadingBox>}
            {errorcreate && <MessageBox variant="danger">{errorcreate}</MessageBox>}
             {loading?<LoadingBox></LoadingBox>:
             error?<MessageBox variant="danger"></MessageBox>:
             (<table className="table">
                 <thead>
                     <tr>
                         <th>ID</th>
                         <th>NAME</th>
                         <th>PRICE</th>
                         <th>CATEGORY</th>
                         <th>BRAND</th>
                         <th>ACTIONS</th>
                     </tr>
                 </thead>
                 <tbody>
                     {products.map(product=>(
                         <tr key={product._id}>
                             <td>{product._id}</td>
                             <td>{product.name}</td>
                             <td>{product.price}</td>
                             <td>{product.category}</td>
                             <td>{product.brand}</td>
                             
                             <td>
                                 <button type="button" className="small" onClick={()=>props.history.push(`/product/${product._id}/edit`)}>
                                     Edit
                                 </button>
                                 <button type="button" className="small" onClick={()=>deleteHandler(product)}>
                                     Delete
                                 </button>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>)}
        </div>
    )
}
