import React,{useState,useEffect} from 'react'
import { Form,Row,Col,Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../Container/Loader'
import Message from '../Container/Message'
import { userLoginAction } from '../actions/userActions'
import FormContainer from '../Container/FormContainer'
import { useDispatch,useSelector } from 'react-redux'
import CheckOutProcess from '../Container/CheckOutProcess'

function LoginScreen({location,history}) {
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const patch = useDispatch()
    const signInUser = useSelector( state => state.loginUser)
    const {loading,error,userDetails}=signInUser
    useEffect(()=>{
        if (userDetails){
            history.push(redirect)
        }
    },[userDetails,history,redirect])
    const buttonHandler =(e)=>{
        e.preventDefault();
        patch(userLoginAction(email, password))
    }

  return (
    <FormContainer>
        <h1>Sign In</h1>
        {error && <Message>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={buttonHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Enter Email</Form.Label>
                <Form.Control
                    placeholder="Enter Email"
                    onChange = {(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Enter Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Button variant='primary' type='submit' className="py-3">Sign In</Button>
        </Form>
        <Row>
            <Col className="py-3">
                New Customer <Link to={redirect ? `register?redirect=${redirect}` : 'register/'}>Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen