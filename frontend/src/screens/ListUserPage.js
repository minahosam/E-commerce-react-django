import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Table,Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { getUsersAction } from '../actions/userActions'
import Loader from '../Container/Loader'
import Message from '../Container/Message'
import { deleteUserAction } from '../actions/userActions'



function ListUserPage({history}) {
  const patch = useDispatch()
  const allUsers= useSelector( state => state.getAllUsers)
  const { loading,users,error }=allUsers
  const loginUser = useSelector(state =>state.loginUser)
  const {userDetails}=loginUser
  const userDeletion = useSelector(state => state.deleteUser)
  const {success:successDelete}=userDeletion

  useEffect(()=>{
    if (userDetails && userDetails.isAdmin) {
      patch(getUsersAction())      
    }else {
      history.push('/login')
    }
  },[patch,history,userDetails,successDelete])
  const deleteUser =(id)=> {
    if (window.confirm('Are you sure you want to delete this user?')) {
      patch(deleteUserAction(id))      
    }
  }
  return (
    <div>
          <h2>all users</h2>
          {loading && <Loader />}
          {error ? (
            <Message>{error}</Message>
          ):(
            <Table striped hover responsive bordered className='table-sm'>
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                  <td>Email</td>
                  <td>isAdmin</td>
                  <td></td>
                </tr>
              </thead>
              {users.map(user => (
                <tbody key={user.id}>
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? (
                      <i className="fas fa-check" style={{color:'green'}}></i>
                    ) : (
                      <i className="fas fa-times" style={{color:'red'}}></i>
                    )}</td>
                    <td>
                      <LinkContainer to={`/admin/user/${user.id}`}>
                        <Button variant='light' className='button-sm'>
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button variant='danger' className='button-sm' onClick={() => deleteUser(user.id)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          )}
    </div>
  )
}

export default ListUserPage