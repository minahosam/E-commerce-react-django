import axios from 'axios'
import { 
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILURE,
    LIST_MY_ORDERS_REQUEST,
    LIST_MY_ORDERS_SUCCESS,
    LIST_MY_ORDERS_FAILURE,
    PAY_ORDER_REQUEST,
    PAY_ORDER_SUCCESS,
    PAY_ORDER_FAILURE,
    GET_ALL_ORDERS_REQUEST,
    GET_ALL_ORDERS_SUCCESS,
    GET_ALL_ORDERS_FAILURE,
    DELIEVER_ORDER_REQUEST,
    DELIEVER_ORDER_SUCCESS,
    DELIEVER_ORDER_FAILURE,
 } from '../constants/orderConstants'
 import { CLEAR_CART } from '../constants/cartConstants'

 
export const createOrderAction=(order)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:CREATE_ORDER_REQUEST
        })
        const { loginUser:{userDetails} } = getState()
        const config={
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userDetails.token}`
            }
        }
        console.log(config)
        console.log(`Bearer ${userDetails.token}`)
        console.log(order)

        // const { loginUser:{userDetails}} = getState()
        // const config = {
        //     headers: {'Content-Type': 'application/json',Authorization: `Bearer ${userDetails.token}`}
        // }

        // const {data} = await axios.post('/api/order/',order,config)
        const { data } = await axios.post('/api/order/create/',{order},config)
        console.log(data)
        dispatch({
            type:CREATE_ORDER_SUCCESS,
            payload: data
        })
        dispatch({
            type:CLEAR_CART,
            payload: data
        })

        localStorage.removeItem('cartItems')
        localStorage.removeItem('paymentMethod')

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAILURE,
            payload:error.response && error.response.data.detail
                                    ?   error.response.data.detail
                                    : error.message
        })
    }
}

// export const createOrderAction = (order) => async(dispatch,getState)=>{
//     try{
//         dispatch({
//             type:CREATE_ORDER_REQUEST
//         })
//         // const { loginUser:{userDetails}} = getState()
//         // const config = {
//         //     headers: {'Content-Type': 'application/json',Authorization: `Bearer ${userDetails.token}`}
//         // }
//         const { loginUser:{userDetails},}=getState()
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${userDetails.token}`
//             }
//         }
//         const {data} = await axios.post('/api/order/create/',order,config)
//         console.log(data)
//         dispatch({
//             type:CREATE_ORDER_SUCCESS,
//             payload: data
//         })

//     } catch (error){
//         dispatch({
//             type:CREATE_ORDER_FAILURE,
//             payload:error.response && error.response.data.detail
//                                     ?   error.response.data.detail
//                                     :  error.message,
//         })
//     }
// }

export const getOrderAction=(id) => async(dispatch,getState)=>{
    try {
        dispatch({
            type:GET_ORDER_REQUEST
        })
        const { loginUser:{ userDetails }} = getState()
        const config = {
            headers: {'Content-Type': 'application/json',
            Authorization: `Bearer ${userDetails.token}`}
        }
        console.log(config)
        const {data} = await axios.get(`/api/orders/${id}/`,config)
        console.log(data)
        dispatch({
            type:GET_ORDER_SUCCESS,
            payload:data
        })
    } catch (error){
        dispatch({
            type:GET_ORDER_FAILURE,
            payload:error.response && error.response.data.detail
                                    ? error.response.data.detail
                                    : error.message
        })
    }
}


export const listMyOrderAction =()=> async(dispatch,getState)=>{
    try {
        dispatch({
            type:LIST_MY_ORDERS_REQUEST
        })
        const { loginUser:{userDetails}} = getState()
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization : `Bearer ${userDetails.token}`
            }
        }
        const {data} = await axios.get('/api/all-orders/',config)
        dispatch({
            type:LIST_MY_ORDERS_SUCCESS,
            payload:data
        })
    } catch(error){
        dispatch({
            type:LIST_MY_ORDERS_FAILURE,
            payload:error.response && error.response.data.detail
                                    ? error.response.data.detail
                                    : error.message
        })
    }
}

export const payAction=(id,paymentResult) => async(dispatch,getState)=>{
    try{
        dispatch({
            type:PAY_ORDER_REQUEST
        })
        const { loginUser:{userDetails}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userDetails.token}`
            }
        }
        const {data}= await axios.put(`/api/pay/${id}`,config,paymentResult)
        dispatch({
            type : PAY_ORDER_SUCCESS,
            payload:data
        })
    } catch(error){
        dispatch({
            type:PAY_ORDER_FAILURE,
            payload:error.response && error.response.data
                                    ? error.response.data.detail
                                    : error.message
        })
    }
}

export const getAllOrdersAction =()=> async(dispatch,getState)=>{
    try {
        dispatch({
            type:GET_ALL_ORDERS_REQUEST
        })
        const { loginUser:{userDetails}} = getState()
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${userDetails.token}`
            }
        }
        const {data} = await axios.get('/api/all-orders/',config)
        dispatch({
            type:GET_ALL_ORDERS_SUCCESS,
            payload:data
        })
    } catch(error){
        dispatch({
            type:GET_ALL_ORDERS_FAILURE,
            payload:error.response && error.response.data.detail
                                    ? error.response.data.detail
                                    : error.message
        })
    }
}

export const delieverOrderAction=(order)=>async(dispatch,getState)=>{
    try{
        dispatch({
            type:DELIEVER_ORDER_REQUEST
        })
        const { loginUser:{userDetails}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userDetails.token}`
            }
        }
        console.log(config)
        const {data} = await axios.put(`/api/deliever/${order.id}/`,{},config)
        dispatch({
            type:DELIEVER_ORDER_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({
            type:DELIEVER_ORDER_FAILURE,
            payload:error.response && error.response.data.detail
                                    ? error.response.data.detail
                                    : error.message  
        })
    }
}