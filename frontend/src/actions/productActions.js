import { 
    PRODUCTS_LIST_REQUEST,
    PRODUCTS_LIST_SUCCESS,
    PRODUCTS_LIST_ERROR,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_ERROR,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAILURE,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAILURE,
    PRODUCT_EDIT_REQUEST,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_EDIT_FAILURE,
    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAILURE,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAILURE,
 } from '../constants/productConstants'
import axios from 'axios'

export const listProducts=(key = '')=> async(dispatch) => {
    try {
        dispatch({type: PRODUCTS_LIST_REQUEST})
        const {data} = await axios.get(`/api/${key}`)
        dispatch({type: PRODUCTS_LIST_SUCCESS, payload:data})
    } catch (error){
        dispatch({type: PRODUCTS_LIST_ERROR, payload:error.response&&error.response.data.detail
        ? error.response.data.detail
        : error.message
        })
    }
}

export const detailProduct =(id) =>async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const {data}=await axios.get(`/api/product/${id}/`)
        dispatch({type:PRODUCT_DETAILS_SUCCESS, payload:data})
    } catch (error){
        dispatch({type:PRODUCT_DETAILS_ERROR,payload:error.response&&error.response.data.detail
            ? error.response.data.detail
                : error.message
        })

    }
}

export const deleteProductAction = (id) => async(dispatch,getState) => {
    try {
        dispatch({
            type:PRODUCT_DELETE_REQUEST
        })
        const { loginUser:{userDetails}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userDetails.token}`
            }
        }
        const {data} = await axios.delete(`/api/deleteProduct/${id}/`,config)
        dispatch({
            type:PRODUCT_DELETE_SUCCESS,
            payload:data
        })
    } catch(error){
        dispatch({
            type:PRODUCT_DELETE_FAILURE,
            payload:error.response && error.response.data.detail
                                        ? error.response.data.detail
                                        : error.message
        })
    }
}

export const createProductAction=()=> async(dispatch,getState)=>{
    try {
        dispatch({
            type:PRODUCT_CREATE_REQUEST
        })
        const { loginUser:{userDetails}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userDetails.token}`
            }
        }
        const {data} = await axios.get('/api/create/',config)
        dispatch({
            type:PRODUCT_CREATE_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:PRODUCT_CREATE_FAILURE,
            payload:error.response && error.response.data.detail
                                    ? error.response.data.detail
                                    : error.message
        })
    }
}

export const productEditAction = (product) => async(dispatch,getState)=>{
    try {
        dispatch({
            type:PRODUCT_EDIT_REQUEST
        })
        const { loginUser:{userDetails}} = getState()
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userDetails.token}`
            }
        }
        const {data} = await axios.put(`/api/product/${product.id}/edit/`,product,config)
        dispatch({
            type:PRODUCT_EDIT_SUCCESS,
            payload:data
        })
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data
        })
    }catch(error) {
        dispatch({
            type:PRODUCT_EDIT_FAILURE,
            payload:error.response && error.response.data.detail
                                    ?   error.response.data.detail
                                    :   error.message  
        })
    }
}

export const productReviewAction = (id,review) => async(dispatch,getState)=>{
    try {
        dispatch({
            type:PRODUCT_REVIEW_REQUEST
        })
        const { loginUser:{userDetails}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userDetails.token}`
            }
        }
        const {data} = await axios.post(`/api/review/${id}/`,review,config )
        dispatch({
            type:PRODUCT_REVIEW_SUCCESS,
            payload:data
        })
    } catch(error) {
        dispatch({
            type:PRODUCT_REVIEW_FAILURE,
            payload:error.response && error.response.data.detail
                                 ?  error.response.data.detail
                                 :  error.message
        })
    }
}

export const productTopAction = () => async(dispatch)=>{
    try {
        dispatch({
            type:PRODUCT_TOP_REQUEST
        })
        const {data} = await axios.get('/api/top/')
        dispatch({
            type:PRODUCT_TOP_SUCCESS,
            payload:data
        })
    } catch(error){
        dispatch({
            type:PRODUCT_TOP_FAILURE,
            payload:error.response && error.response.data.detail
                                    ? error.response.data.detail
                                    : error.message
        })
    }
}