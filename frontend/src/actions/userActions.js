import axios from 'axios'
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
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
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
 } from '../constants/userConstants'
 import { LIST_MY_ORDERS_RESET } from '../constants/orderConstants'


export const userLoginAction = (email,password) => async(dispatch)=>{
    try{
        dispatch({
            type : USER_LOGIN_REQUEST
        })

        const config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/login/',
                                        {'username':email, 'password':password},
                                        config
        )
        dispatch({
            type : USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch(e){
        dispatch({
            type: USER_LOGIN_FAILURE,
            payload: e.response && e.response.data.detail
            ? e.response.data.detail
            : e.message
        })
    }
} 


export const userLogoutAction = () =>(dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT
    })
    dispatch({
        type:USER_PROFILE_RESET
    })
    dispatch({
        type:LIST_MY_ORDERS_RESET
    })
    dispatch({
        type:GET_ALL_USERS_RESET
    })
}

export const userRegisterAction = (name,email,password) =>async(dispatch)=>{
    try {
        dispatch({
            type: USER_REGIISTER_REQUEST
        })
        const config = {
            headers: { 'Content-Type':'application/json'}
        }
        const { data }= await axios.post('/api/register/',
                        {'name':name, 'email':email, 'password':password},
                        config)
        dispatch({
            type: USER_REGISTER_SUCCESS ,
            payload: data
        })

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(e) {
        dispatch({
            type:USER_REGISTER_FAILURE,
            payload: e.response&&e.response.data.detail
                        ? e.response.data.detail
                        : e.response
                })
    }
}


export const userProfileAction=(id)=>async(dispatch,getState)=>{
    try{
        dispatch({
            type:USER_PROFILE_REQUEST
        })
        
        const { loginUser:{userDetails}} = getState()
        const config = {
            headers: {'Content-Type': 'application/json',Authorization: `Bearer ${userDetails.token}`}
        }
        const {data} = await axios.get(`/api/user/${id}/`,config)
        console.log(`/api/user/${id}/`)
        console.log(data)
        dispatch({
            type:USER_PROFILE_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({
            type:USER_PROFILE_FAILURE,
            payload: error.response && error.response.data.detail
                        ?   error.response.data.detail
                        :   error.response
        })
    }

}


export const userUpdateProfileAction = (user) => async(dispatch,getState)=>{
    try{
        dispatch({
            type:USER_UPDATE_PROFILE_REQUEST
        })
        // const { loginUser:{userDetails}} = getState()
        // const config = {
        //     headers: {'Content-Type': 'application/json',Authorization: `Bearer ${userDetails.token}`}
        // }
        const { loginUser:{userDetails}}=getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userDetails.token}`
            }
        }
        const {data} = await axios.put('/api/user/profile/update/',user,config)
        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error){
        dispatch({
            type:USER_UPDATE_PROFILE_FAILURE,
            payload:error.response && error.response.data.detail
                                    ?   error.response.data.detail
                                    :  error.response
        })
    }
}

export const getUsersAction = ()=> async(dispatch,getState) => {
    try {
        dispatch({
            type:GET_ALL_USERS_REQUEST
        })
        const { loginUser:{userDetails}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userDetails.token}`
            }
        }
        const {data} = await axios.get('/api/users',config)
        dispatch({
            type:GET_ALL_USERS_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({
            type:GET_ALL_USERS_FAILURE,
            payload:error.response && error.response.data.detail
                                   ?  error.response.data.detail
                                   :  error.message
        })
    }
}

export const deleteUserAction = (id) => async(dispatch,getState) =>{
    try{
        dispatch({
            type:DELETE_USER_REQUEST
        })
        const { loginUser:{userDetails} } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userDetails.token}`
            }
        }
        console.log(config)
        const {data} = await axios.delete(`/api/delete/${id}/`,config)
        dispatch({
            type:DELETE_USER_SUCCESS,
            payload:data
        })
    } catch(error){
        dispatch({
            type:DELETE_USER_FAILURE,
            payload:error.response&&error.response.data.detail
                                   ?   error.response.data.detail
                                   :   error.message
        })
    }
}

export const adminGetUserAction=(id) => async(dispatch,getState)=>{
    try{
        dispatch({
            type:ADMIN_GET_USER_REQUEST
        })
        const { loginUser:{userDetails} }= getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userDetails.token}`
            }
        }
        const {data} = await axios.get(`/api/user/${id}`,config)
        dispatch({
            type:ADMIN_GET_USER_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:ADMIN_GET_USER_FAILURE,
            payload:error.response&&error.response.data.detail
                                   ?error.response.data.detail
                                   : error.message
        })
    }
}

export const adminUpdateUserAction = (user) => async(dispatch,getState)=>{
    try{
        dispatch({
            type: ADMIN_UPDATE_USER_REQUEST
        })
        const { loginUser:{userDetails}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userDetails.token}`
            }
        }
        const {data} = await axios.put(`/api/updated/${user.id}/`,user,config)
        console.log(data)
        console.log(user)
        console.log(config)
        console.log(`/api/update/${user.id}`)
        dispatch({
            type:ADMIN_UPDATE_USER_SUCCESS,
            payload:data
        })
        dispatch({
            type:USER_PROFILE_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type:ADMIN_UPDATE_USER_FAILURE,
            payload:error.response && error.response.data
                                    ?   error.response.data.detail
                                    : error.message
        })
    }
}