import { 
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    CLEAR_ORDER_SUCCESS,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILURE,
    LIST_MY_ORDERS_REQUEST,
    LIST_MY_ORDERS_FAILURE,
    LIST_MY_ORDERS_SUCCESS,
    LIST_MY_ORDERS_RESET,
    PAY_ORDER_REQUEST,
    PAY_ORDER_SUCCESS,
    PAY_ORDER_FAILURE,
    PAY_ORDER_RESET,
    GET_ALL_ORDERS_REQUEST,
    GET_ALL_ORDERS_SUCCESS,
    GET_ALL_ORDERS_FAILURE,
    DELIEVER_ORDER_REQUEST,
    DELIEVER_ORDER_SUCCESS,
    DELIEVER_ORDER_FAILURE,
    DELIEVER_ORDER_RESET,
 } from '../constants/orderConstants'



export const orderReducer=(state={}, action)=>{
    switch(action.type) {
        case CREATE_ORDER_REQUEST:
            return{loading:true}
        case CREATE_ORDER_SUCCESS:
            return{loading:false,success:true,order:action.payload}
        case CREATE_ORDER_FAILURE:
            return{loading:false,error:action.payload}
        case CLEAR_ORDER_SUCCESS:
            return{}
        default:
            return state
    }
}

export const getOrderReducer=(state={loading:true,orderItems:[],shippingAddress:{}}, action)=>{
    switch(action.type) {
        case GET_ORDER_REQUEST:
            return{...state,loading:true}
        case GET_ORDER_SUCCESS:
            return{loading:false,orderDetails:action.payload}
        case GET_ORDER_FAILURE:
            return{loading:false,error:action.payload}
        default:
            return state
    }
}

export const listMyOrderReducer = (state={allOrder:[]}, action)=>{
    switch(action.type){
        case LIST_MY_ORDERS_REQUEST:
            return{loading:true}
        case LIST_MY_ORDERS_SUCCESS:
            return{loading:false,allOrder:action.payload}
        case LIST_MY_ORDERS_FAILURE:
            return{loading:false,error:action.payload}
        case LIST_MY_ORDERS_RESET:
            return{}
        default:
            return state
    }
}

export const payReducer = (state={}, action) =>{
    switch(action.type){
        case PAY_ORDER_REQUEST:
            return{loading:true}
        case PAY_ORDER_SUCCESS:
            return{loading:false,success:true}
        case PAY_ORDER_FAILURE:
            return{loading:false,error:action.payload}
        case PAY_ORDER_RESET:
            return {}
        default:
            return state
    }
}

export const getAllOrdersReducer = (state={orders:[]}, action) =>{
    switch(action.type) {
        case GET_ALL_ORDERS_REQUEST:
            return{loading:true}
        case GET_ALL_ORDERS_SUCCESS:
            return{loading:false,orders:action.payload}
        case GET_ALL_ORDERS_FAILURE:
            return{loading:false,errors:action.payload}
        default:
            return state
    }
}

export const delieverReducer = (state={}, action) =>{
    switch(action.type){
        case DELIEVER_ORDER_REQUEST:
            return{loading:true}
        case DELIEVER_ORDER_SUCCESS:
            return{loading:false,success:true}
        case DELIEVER_ORDER_FAILURE:
            return{loading:false,error:action.payload}
        case DELIEVER_ORDER_RESET:
            return {}
        default:
            return state
    }
}