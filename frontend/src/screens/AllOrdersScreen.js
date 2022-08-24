import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getAllOrdersAction } from '../actions/orderActions'
import { Table,Button } from 'react-bootstrap'
import Loader from '../Container/Loader'
import Message from '../Container/Message'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

function AllOrdersScreen({history}) {
  const patch = useDispatch()
  const getAllOrders = useSelector( state => state.getAllOrders)
  const { loading,orders,errors } = getAllOrders
  const loginUser = useSelector(state =>state.loginUser)
  const {userDetails}=loginUser
  useEffect(() => {
      if (userDetails && userDetails.isAdmin) {
        patch(getAllOrdersAction())          
      }else {
          history.push('/login')
      }
  },[patch,userDetails,history])
  return (
    <div>
        {loading && <Loader />}
        {errors && <Message>{errors}</Message>}
        {orders && <div>
                <h2>all orders</h2>
                <Table striped hover bordered responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>Total</th>
                            <th>PAID</th>
                            <th>DELIVER</th>
                            <th></th>
                        </tr>
                    </thead>
                    {orders.map(order => (
                        <tbody key={order.id}>
                            <tr>
                                <td>{order.id}</td>
                                <td>{order.user.name}</td>
                                <td>{order.created_at.substring(0,10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? (order.paidAt.substring(0,10)) : (<i className="fas fa-check" style={{color:'red'}}></i>)}</td>
                                <td>{order.isDelivered ? (order.deliveredAt.substring(0,10)) : (<i className="fas fa-check" style={{color:'red'}}></i>)}</td>
                                <td>
                                    <LinkContainer to={`/orders/${order.id}`}>
                                        <Button variant='light' className='button-sm'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </Table>
            </div>}
    </div>
  )
}

export default AllOrdersScreen