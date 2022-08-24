import { 
    ADD_CART_ITEMS,
    REMOVE_CART_ITEMS,
    SAVE_SHIPPING_ADDRESS,
    SAVE_PAYMENT_METHOD,
    CLEAR_CART,
 } from '../constants/cartConstants'

 export const CartItemReducer = (state={cartItems:[],shippingAdress:{}},action)=>{
     switch(action.type){
        case ADD_CART_ITEMS:
            const newItem = action.payload
            const existItem = state.cartItems.find((x)=>
                x.product === newItem.product
            )

            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map((x)=>
                    x.product === existItem.product ? newItem : x
                    )
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems,newItem]
                }
            }

        case REMOVE_CART_ITEMS:
            return {
                ...state,
                cartItems:state.cartItems.filter((x)=> x.product !== action.payload)
            }

        case SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress:action.payload
            }

        case SAVE_PAYMENT_METHOD:
            return {
                ...state,
                PaymentMethod:action.payload
            }
        
        case CLEAR_CART:
            return {
                ...state,
                cartItems:[]
            }



        default:
            return state
     }
 }