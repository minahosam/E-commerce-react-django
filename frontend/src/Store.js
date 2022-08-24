import { createStore,combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer,productDetailsReducer,productDeleteReducer,createProductsReducer,productEditReducer,productReviewReducer,productTopReducer } from './reducers/productReducer'
import { CartItemReducer } from './reducers/cartReducers'
import { userLoginReducer,userRegisterReducer,userProfileReducer,userUpdateProfileReducer,getAllUsersReducer,deleteUserReducer,adminGetUserReducer,adminUpdateUserReducer } from './reducers/userReducer'
import { orderReducer,getOrderReducer,listMyOrderReducer,payReducer,getAllOrdersReducer,delieverReducer } from './reducers/orderReducer'

const reducer=combineReducers({
    productList:productListReducer,
    productDetail:productDetailsReducer,
    cartItem:CartItemReducer,
    loginUser:userLoginReducer,
    registerUser:userRegisterReducer,
    profileUser:userProfileReducer,
    updateUserProfile:userUpdateProfileReducer,
    createOrder:orderReducer,
    orderDetail:getOrderReducer,
    listMyOrders:listMyOrderReducer,
    payMyOrder:payReducer,
    getAllUsers:getAllUsersReducer,
    deleteUser:deleteUserReducer,
    adminGetUser:adminGetUserReducer,
    adminUpdateUser:adminUpdateUserReducer,
    productDelete:productDeleteReducer,
    createProduct:createProductsReducer,
    productEdit:productEditReducer,
    getAllOrders:getAllOrdersReducer,
    delieverOrder:delieverReducer,
    productReview:productReviewReducer,
    productTop:productTopReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : []

const loginUserFromStorage=localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage=localStorage.getItem('addressShipping') ?
    JSON.parse(localStorage.getItem('addressShipping')) : {}

const paymentMethodFromStorage=localStorage.getItem('paymentMethod') ?
    JSON.parse(localStorage.getItem('paymentMethod')) : {}

const initialState = {
    cartItem:{cartItems: cartItemsFromStorage,shipping:shippingAddressFromStorage,payment:paymentMethodFromStorage},
    loginUser:{userInfo: loginUserFromStorage}
}

const middleware= [thunk]

const Store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default Store