import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Form,Button } from 'react-bootstrap'
import FormContainer from '../Container/FormContainer'
import Loader from '../Container/Loader'
import Message from '../Container/Message'
import { adminGetUserAction,adminUpdateUserAction } from '../actions/userActions'
import { Link } from 'react-router-dom'
import { ADMIN_UPDATE_USER_RESET } from '../constants/userConstants'


function UserEditPage({match,history}) {
  const userId= match.params.id
  console.log(userId)
  const patch = useDispatch()
  const [name,setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin,setIsAdmin] = useState('')
  const loginUser = useSelector(state =>state.loginUser)
  const {userDetails}=loginUser
  const adminGetUser=useSelector( state => state.adminGetUser)
  const { loading,user,error } = adminGetUser
  const adminUpdateUser= useSelector( state => state.adminUpdateUser)
  const {loading:loadingUpdate,success:successUpdate,error:errorUpdate} = adminUpdateUser
  useEffect(() => {
    if (successUpdate) {
      patch({type:ADMIN_UPDATE_USER_RESET})
      history.push('/allusers')
    } else {
      if (userDetails && userDetails.isAdmin) {
        if ( !user.name || user.id !== Number(userId) ) {
          patch(adminGetUserAction(userId))      
        } else {
          setName(user.name)
          setEmail(user.email)
          setIsAdmin(user.isAdmin)
        }        
      } else {
        history.push('/login')
      }  
    }
  },[patch,userId,user,userDetails,history,successUpdate])
  const formHandler = (e) => {
    e.preventDefault()
    console.log('updated')
    patch(adminUpdateUserAction({'id': user.id,'name':name,'email':email,'isAdmin':isAdmin}))
  }
  return (
    <div>
      <Link to={'/allusers'}>Go Back</Link>
      <FormContainer>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message>{errorUpdate}</Message>}
        {loading && <Loader />}
        {error && <Message>{error}</Message>}
        <Form onSubmit={formHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='isadmin'>
            <Form.Check
              label='is admin'
              type='checkbox'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>
          <Button variant='primary' type='submit'>Update</Button>
        </Form>
      </FormContainer>
    </div>
  )
}

export default UserEditPage