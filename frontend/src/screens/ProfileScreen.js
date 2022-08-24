import React,{useState,useEffect} from 'react'
import { Row,Col,Button,Form,Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { userProfileAction,userUpdateProfileAction } from '../actions/userActions'
import Message from '../Container/Message'
import Loader from '../Container/Loader'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrderAction } from '../actions/orderActions'

function ProfileScreen({history}) {
    const [name,setName]= useState('')
    const[email, setEmail]= useState('')
    const[password, setPassword]= useState('')
    const[confirmPassword, setConfirmPassword]= useState('')
    const[message,setMessage]= useState('')
    const patch = useDispatch()
    const userProfile= useSelector( state => state.profileUser)
    const {loading,errors,user}=userProfile
    const userLogin = useSelector( state => state.loginUser)
    const {userDetails} = userLogin
    const userUpdteProfile=useSelector( state => state.updateUserProfile)
    const{success} = userUpdteProfile
    const ordersList = useSelector( state => state.listMyOrders)
    const {loading:loadingOrder,error:errorOrder,allOrder} = ordersList

    useEffect(() => {
        if (!userDetails) {
            history.push('/login')
        } else {
            if (!user || !user.name || success ) {
                patch({type:USER_UPDATE_PROFILE_RESET })
                patch(userProfileAction('profile'))
                patch(listMyOrderAction())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[patch,user,history,userDetails,success])

    const formHandler=(e)=> {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('password not same as password')
        } else {
            patch(userUpdateProfileAction({
                'name': name,
                'email': email, 
                'password':password
            }))
        }
    }

  return (
    <Row>
        {errors && <Message>{errors}</Message>}
        {message && <Message>{message}</Message>}
        {loading && <Loader />}
        <Col md={4}>
            <h1>Profile</h1>
            <Form onSubmit={formHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        value={name}
                        onChange={e=>setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='cofirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        value={confirmPassword}
                        onChange={e=>setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button variant='primary' type='submit'>update profile</Button>
            </Form>
        </Col>
        <Col md={8}>
            <h1>Orders</h1>
            {loadingOrder ? (
                <Loader />
            ): errorOrder ? (
                <Message>{errorOrder}</Message>
            ) : (
                <Table striped responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid Status</th>
                            <th>Delivery</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOrder.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.created_at.substring(0,10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0,10) : (
                                    <i className="fas fa-times" style={{color:'red'}}></i>
                                )}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : (
                                    <i className="fas fa-times" style={{color:'green'}}></i>
                                )}</td>
                                <td><LinkContainer to={`/orders/${order.id}`}>
                                        <Button>Details</Button>
                                    </LinkContainer></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
  )
}

export default ProfileScreen