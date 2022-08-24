import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT,
    USER_REGIISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAILURE,
    USER_PROFILE_RESET,
    USER_UPDATE_PROFILE_RESET,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_FAILURE,
    GET_ALL_USERS_REQUEST,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAILURE,
    GET_ALL_USERS_RESET,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    ADMIN_GET_USER_REQUEST,
    ADMIN_GET_USER_SUCCESS,
    ADMIN_GET_USER_FAILURE,
    ADMIN_UPDATE_USER_REQUEST,
    ADMIN_UPDATE_USER_SUCCESS,
    ADMIN_UPDATE_USER_FAILURE,
    ADMIN_UPDATE_USER_RESET,
 } from '../constants/userConstants'


 export const userLoginReducer = (state={}, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading:true
            }
        case USER_LOGIN_SUCCESS:
            return {
                loading:false,
                userDetails: action.payload
            }
        case USER_LOGIN_FAILURE:
            return {
                loading:false,
                error: action.payload
            }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
 }


export const userRegisterReducer = (state={}, action) =>{
    switch(action.type) {
        case USER_REGIISTER_REQUEST:
            return {loading:true}
        case USER_REGISTER_SUCCESS:
            return {loading:false,userDetails:action.payload}
        case USER_REGISTER_FAILURE:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}


export const userProfileReducer = (state={user:{}}, action) =>{
    switch(action.type) {
        case USER_PROFILE_REQUEST:
            return {...state,loading:true}
        case USER_PROFILE_SUCCESS:
            return{loading:false,user:action.payload}
        case USER_PROFILE_FAILURE:
            return{loading:false,errors:action.payload}
        case USER_PROFILE_RESET:
            return { usere:{} }
        default:
            return state
    }
}


export const userUpdateProfileReducer=(state={}, action)=>{
    switch(action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return{loading:true}
        case USER_UPDATE_PROFILE_SUCCESS:
            return{loading:false,success:true,userDetails:action.payload}
        case USER_UPDATE_PROFILE_FAILURE:
            return{loading:false,errors:action.payload}
        case USER_UPDATE_PROFILE_RESET:
            return{}
        default:
            return state
    }
}

export const getAllUsersReducer = (state={users:[]}, action) =>{
    switch(action.type) {
        case GET_ALL_USERS_REQUEST:
            return{ ...state,loading:true}
        case GET_ALL_USERS_SUCCESS:
            return{loading:false,users:action.payload}
        case GET_ALL_USERS_FAILURE:
            return{loading:false,error: action.payload}
        case GET_ALL_USERS_RESET:
            return{users:[]}
        default:
            return state
    }
}

export const deleteUserReducer = (state={}, action) => {
    switch(action.type) {
        case DELETE_USER_REQUEST:
            return{loading:true}
        case DELETE_USER_SUCCESS:
            return{loading:false,success:true}
        case DELETE_USER_FAILURE:
            return{loading:false,error: action.payload}
        default:
            return state
    }
}

export const adminGetUserReducer= (state={user:[]}, action)=>{
    switch(action.type) {
        case ADMIN_GET_USER_REQUEST:
            return{...state,loading:true}
        case ADMIN_GET_USER_SUCCESS:
            return{loading:false,user:action.payload}
        case ADMIN_GET_USER_FAILURE:
            return{loading:false,error: action.payload}
        default:
            return state
    }
}

export const adminUpdateUserReducer=(state={user:{}}, action)=>{
    switch(action.type) {
        case ADMIN_UPDATE_USER_REQUEST:
            return{loading:true}
        case ADMIN_UPDATE_USER_SUCCESS:
            return{loading:false,success:true,user:action.payload}
        case ADMIN_UPDATE_USER_FAILURE:
            return{loading:false,error:action.payload}
        case ADMIN_UPDATE_USER_RESET:
            return{user:{}}
        default:
            return state
    }
}

