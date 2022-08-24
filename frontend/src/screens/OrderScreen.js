import React,{useState,useEffect} from 'react'
import { Row,Col,Button,Card,ListGroup,Image } from 'react-bootstrap'
import CheckOutProcess from '../Container/CheckOutProcess'
import Message from '../Container/Message'
import { Link } from 'react-router-dom'    
import { useDispatch,useSelector } from 'react-redux'
import { createOrderAction } from '../actions/orderActions'
import { CLEAR_ORDER_SUCCESS } from '../constants/orderConstants'

function OrderScreen({history}) {
    const createOrder = useSelector( state => state.createOrder)
    console.log(createOrder)
    const { order, success, error}=createOrder
    const patch = useDispatch()
    const cart = useSelector( state => state.cartItem)
    cart.itemPrice = cart.cartItems.reduce((acc, item) =>acc + item.price * item.qty ,0)
    cart.taxPrice = cart.itemPrice.length === 0 ? 0 : ((.2)*cart.itemPrice).toFixed(2)
    cart.shippingPrice = cart.itemPrice > 100 ? 0 : ((.8)*cart.itemPrice).toFixed(2)
    cart.totalPrice = (Number(cart.taxPrice) + Number(cart.shippingPrice)+Number(cart.itemPrice)).toFixed(2)

    useEffect(() => {
        if(success){
            history.push(`/orders/${order.id}`)
            patch({type:CLEAR_ORDER_SUCCESS})
        }
    },[success,history,patch,order])

    const placeHandler =()=>{
        console.log('placed')
        patch(createOrderAction({
            orderItems:cart.cartItems,
            shippingAddress:cart.shipping,
            itemPrice:cart.itemPrice,
            paymentMethod:cart.payment,
            taxPrice:cart.taxPrice,
            shippingPrice:cart.shippingPrice,
            totalPrice:cart.totalPrice
        }))
        console.log({
            orderItems:cart.cartItems,
            shippingAddress:cart.shipping,
            itemPrice:cart.itemPrice,
            paymentMethod:cart.paymentMethod,
            taxPrice:cart.taxPrice,
            shippingPrice:cart.shippingPrice,
            totalPrice:cart.totalPrice
    })
    }

  return (
    <div>
        <CheckOutProcess step1 step2 step3 step4 color='black' />
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping Address</h2>
                        <p>
                            Address:{cart.shipping.address},{cart.shipping.city}
                            {'   '}{cart.shipping.country}{'    '}{cart.shipping.postalCode}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            payment method:{cart.PaymentMethod}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Item</h2>
                        {cart.cartItems.length === 0 ?
                            <Message>No Items in Cart</Message>
                        :(
                            <ListGroup variant='flush'>
                            {cart.cartItems.map((item,index)=>(
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
                                <Col>{cart.itemPrice}$</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items Tax</Col>
                                <Col>{ cart.taxPrice}$</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping Price</Col>
                                <Col>{cart.shippingPrice}$</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total Price</Col>
                                <Col>{cart.totalPrice}$</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>{error && <Message>{error}</Message>}</ListGroup.Item>
                        <ListGroup.Item><Button variant='btn-block primary' type='button' onClick={placeHandler}>placed Order</Button></ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default OrderScreen