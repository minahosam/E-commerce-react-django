import axios from 'axios'
import { 
    ADD_CART_ITEMS,
    REMOVE_CART_ITEMS,
    SAVE_SHIPPING_ADDRESS,
    SAVE_PAYMENT_METHOD
 } from '../constants/cartConstants'


export const CartActions=(id,qty)=> async(dispatch,getState) => {
    const { data } = await axios.get(`/api/product/${id}`)
    console.log(data)
    dispatch({
        type: ADD_CART_ITEMS,
        payload:{
            product:data.id,
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            qty
        }
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cartItem.cartItems))
}


export const removeItemFromCart = (id) =>(dispatch,getState)=>{
    dispatch({
        type:REMOVE_CART_ITEMS,
        payload:id
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cartItem.cartItems))
}

export const saveShippingAddress=(data)=>(dispatch)=>{
    dispatch({
        type:SAVE_SHIPPING_ADDRESS,
        payload:data
    })
    localStorage.setItem('addressShipping',JSON.stringify(data))
}

export const savePaymentMethod=(data)=>(dispatch)=>{
    dispatch({
        type:SAVE_PAYMENT_METHOD,
        payload:data
    })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}