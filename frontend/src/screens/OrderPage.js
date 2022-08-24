import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'    
import { getOrderAction,payAction,delieverOrderAction } from '../actions/orderActions'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Row,Col,Button,Card,ListGroup,Image } from 'react-bootstrap'
import Message from '../Container/Message'
import Loader from '../Container/Loader'
import { Link } from 'react-router-dom'
import { PAY_ORDER_RESET,DELIEVER_ORDER_RESET } from '../constants/orderConstants'


function OrderPage({match,history}) {
    const orderId = match.params.id
    console.log(orderId)
    const patch= useDispatch()
    const [sdkReady,setSdkReady]= useState(false)
    const orderDetail = useSelector( state => state.orderDetail)
    console.log(orderDetail)
    const { loading,success,orderDetails,error } = orderDetail
    const orderPay = useSelector( state => state.payMyOrder)
    const {loading:loadingPay,success:successPay,error:errorPay} = orderPay
    const delieverOrder = useSelector( state => state.delieverOrder)
    const {loading:loadingDeliver,success:successDeliver,error:errorDeliver} = delieverOrder
    const loginUser = useSelector(state =>state.loginUser)
    const {userDetails}=loginUser
    if (!loading && !error) {
        orderDetails.itemPrice=orderDetails.orderItems.reduce((acc,item) => acc + item.price*item.qty,0).toFixed(2)
    }

    const addPaypalButton = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AV9z3HSQeDw9hj3dl7tqG41w0c2GPOlGSM95_ToQ6QeabI_O1RLYLISWz6Z-OO6PfScXRXylPguxhEBA'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    if (!userDetails) {
        history.push('/login')
    }

    useEffect(() => {
        if (!orderDetails || successPay || orderDetails.id !== Number(orderId) || successDeliver) {
            patch({ type : PAY_ORDER_RESET })
            patch({ type : DELIEVER_ORDER_RESET})
            patch(getOrderAction(orderId))
        } else if (!orderDetails.isPaid){
            addPaypalButton()
        }else{
            setSdkReady(false)
        }
    },[patch,orderId,orderDetails,successPay,successDeliver])

    const paymentHandler = (paymentResult) => {
        patch(payAction(orderId, paymentResult))
        console.log(paymentResult)
    }

    const deliveryHandler = () => {
        patch(delieverOrderAction(orderDetails))
    }
    
  return loading ? (<Loader />)
        : error ? (<Message>{error}</Message>)
  :(
    <div>
        <h2>OrderId : {orderId}</h2>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping Address</h2>
                        <p>Name:{'   '}{orderDetails.user.name}</p>
                        <p>Email:{'   '}<a href={`mailto${orderDetails.user.email}`}>{orderDetails.user.email}</a></p>
                        <p>
                            Address:{orderDetails.shippingAddress.address},{orderDetails.shippingAddress.city}
                            {'   '}{orderDetails.shippingAddress.country}{'    '}{orderDetails.shippingAddress.postalCode}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            payment method:{orderDetails.paymentMethod}
                        </p>
                        {orderDetails.isPaid ? (
                            <Message>Paid on {orderDetails.paidAt}</Message>
                        ):(
                            <Message>not paid</Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Item</h2>
                        {orderDetails.orderItems.length === 0 ?
                            <Message>No Items in Cart</Message>
                        :(
                            <ListGroup variant='flush'>
                            {orderDetails.orderItems.map((item,index)=>(
                                    <ListGroup.Item key={ index }>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid='true' rounded='true'/>
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col>
                                                <p>{item.qty}{'  '} x {item.price} {' $ '}={' $ '}{item.qty * item.price}</p>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                        ))}
                        </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item className='justify-content-center mb-4'>Order Summary</ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items Price</Col>
                                <Col>{orderDetails.itemPrice}$</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items Tax</Col>
                                <Col>{ orderDetails.taxPrice}$</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping Price</Col>
                                <Col>{orderDetails.shippingPrice}$</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total Price</Col>
                                <Col>{orderDetails.totalPrice}$</Col>
                            </Row>
                        </ListGroup.Item>

                        { !orderDetails.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader/>}
                                {!sdkReady ?(
                                    <Loader/>
                                ):(
                                    <PayPalScriptProvider >
                                        <PayPalButtons amount={orderDetails.totalPrice} onSuccess={paymentHandler} />
                                    </PayPalScriptProvider>
                                )}
                            </ListGroup.Item>
                        ) }
                    </ListGroup>
                    {loadingDeliver && <Loader />}
                    {userDetails && userDetails.isAdmin && orderDetails.isPaid && !orderDetails.isDelivered && (
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn btn-block'
                                onClick={deliveryHandler}
                            >
                                Mark As Delivered
                            </Button>
                        </ListGroup.Item>
                    )}
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default OrderPage