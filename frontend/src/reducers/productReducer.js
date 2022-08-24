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
    PRODUCT_CREATE_RESET,
    PRODUCT_EDIT_REQUEST,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_EDIT_FAILURE,
    PRODUCT_EDIT_RESET,
    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAILURE,
    PRODUCT_REVIEW_RESET,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAILURE,
 } from '../constants/productConstants'




export const productListReducer=(state={products:[]},action)=>{
    switch(action.type) {
        case PRODUCTS_LIST_REQUEST:
            return{loading:true,products:[]}
        case PRODUCTS_LIST_SUCCESS:
            return{loading:false,products:action.payload.products,page:action.payload.page,pages:action.payload.pages}
        case PRODUCTS_LIST_ERROR:
            return{loading:false,errors:action.payload}
        default:
            return state
    }
}

export const productDetailsReducer = (state={product:{reviews:[]}},action)=>{
    switch(action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return{loading:true,...state}
        case PRODUCT_DETAILS_SUCCESS:
            return{loading:false,product:action.payload}
        case PRODUCT_DETAILS_ERROR:
            return{loading:false,errors:action.payload}
        default:
            return state
    }
}

export const productDeleteReducer = (state={}, action) => {
    switch(action.type) {
        case PRODUCT_DELETE_REQUEST:
            return{loading:true}
        case PRODUCT_DELETE_SUCCESS:
            return{loading:false,success:true}
        case PRODUCT_DELETE_FAILURE:
            return{loading:false,error:action.payload}
        default:
            return state
    }
}

export const createProductsReducer=(state={}, action)=>{
    switch(action.type){
        case PRODUCT_CREATE_REQUEST:
            return{loading:true}
        case PRODUCT_CREATE_SUCCESS:
            return{loading:false,success:true,product:action.payload}
        case PRODUCT_CREATE_FAILURE:
            return{loading:false,error:action.payload}
        case PRODUCT_CREATE_RESET:
            return{}
        default:
            return state
    }
}

export const productEditReducer = (state={product:[]}, action)=>{
    switch(action.type){
        case PRODUCT_EDIT_REQUEST:
            return{...state,loading:true}
        case PRODUCT_EDIT_SUCCESS:
            return{loading:false,product:action.payload,success:true}
        case PRODUCT_EDIT_FAILURE:
            return{loading:false,error:action.payload}
        case PRODUCT_EDIT_RESET:
            return{ product:[]}
        default:
            return state
    }
}

export const productReviewReducer=(state={reviews:[]},action)=>{
    switch(action.type) {
        case PRODUCT_REVIEW_REQUEST:
            return{...state,loading:true}
        case PRODUCT_REVIEW_SUCCESS:
            return{loading:false,reviews:action.payload,success:true}
        case PRODUCT_REVIEW_FAILURE:
            return{loading:false,error:action.payload}
        case PRODUCT_REVIEW_RESET:
            return{reviews:[]}
        default:
            return state
    }
}

export const productTopReducer= (state={products:[]}, action)=>{
    switch(action.type) {
        case PRODUCT_TOP_REQUEST:
            return{loading:true,products:[]}
        case PRODUCT_TOP_SUCCESS:
            return{loading:false,products:action.payload}
        case PRODUCT_TOP_FAILURE:
            return{loading:false,error:action.payload}
        default:
            return state
    }
}