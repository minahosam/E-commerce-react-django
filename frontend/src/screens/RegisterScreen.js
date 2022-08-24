import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { Row,Col,Button,Form,FormGroup } from 'react-bootstrap'
import Loader from '../Container/Loader'
import Message from '../Container/Message'
import { userRegisterAction } from '../actions/userActions'
import FormContainer from '../Container/FormContainer'

function RegisterScreen({location,history}) {
    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[confirmPassword,setConfirmPassword] = useState('')
    const[message,setMessage] = useState('')
    const redirect = location.search ? location.search.split('=')[1] : '/'
    console.log(redirect)
    const patch=useDispatch()
    const registeredUser = useSelector( state => state.registerUser)
    const{error,loading,userDetails}=registeredUser

    useEffect(()=>{
      if (userDetails) {
        history.push(redirect)  
      }
      
    })

    const registerUserHandler=(e)=>{
      e.preventDefault()
      if (password != confirmPassword) {
        setMessage("password don't match")
      }else{
        patch(userRegisterAction(name,email,password))
      }
    }
  return (
    <FormContainer>
      {message && <Message>{message}</Message>}
      {error && <Message>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={registerUserHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Enter Name</Form.Label>
          <Form.Control
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter Name'
            type='name'
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Enter Email</Form.Label>
          <Form.Control
            placeholder='Enter Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            placeholder='Enter Password'
            value={password}
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Retype Password</Form.Label>
          <Form.Control
            placeholder='Confirm Password'
            value={confirmPassword}
            type='password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>Register User</Button>
      </Form>
      <Row>
        <Col>
        Have a account? <Link to={redirect ? `register?redirect=${redirect}` : 'register/'}>Sign In</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}


export default RegisterScreen