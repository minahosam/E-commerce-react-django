import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Row,Col,ListGroup,Button,Form,Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CartActions,removeItemFromCart } from '../actions/cartActions'
import Message from '../Container/Message'

function CartPage({match,location,history}) {

  const productId = match.params.id
  console.log(productId)
  const qty=location.search ? Number(location.search.split('=')[1]) : 1
  console.log(qty)
  const patch=useDispatch()
  const itemsOnCart = useSelector( state => state.cartItem)
  const {cartItems}=itemsOnCart
  useEffect(() => {
    if (productId) {
      patch(CartActions(productId,qty))
    }
  },[patch,productId,qty])

  const removedFromCart=(id) => {
     patch(removeItemFromCart(id))
  }
  const clickHandler = () => {
    history.push('/shipping')
  }
  return (
    <Row >
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>No Item on Cart <Link to={'/'}>HomePage</Link></Message>
        ):(
          <ListGroup variant='flush'>
            {cartItems.map(singleItem =>(
              <ListGroup.Item key={singleItem.product}>
                <Row>
                  <Col md={2}>
                    <Image src={singleItem.image} alt={singleItem.name} fluid='true' rounded='true'/>
                  </Col>
                  <Col md={3}>
                    <Link to={`/api/product/${singleItem.product}`}>{singleItem.name}</Link>
                  </Col>
                  <Col md={2}>
                    <h3>{singleItem.price}$</h3>
                  </Col>
                  <Col md={2}>
                    <Form.Control 
                      as='select'
                      value={singleItem.qty}
                      onChange={(e) => patch(CartActions(singleItem.product,e.target.value))}
                    >
                      {
                      [ ...Array(singleItem.countInStock).keys()].map((x) => (
                        <option key={x+1}>{x+1}</option>
                      ))
                      }
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removedFromCart(singleItem.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc,singleItem) => acc + singleItem.qty,0)}) items</h2>
              <h4>pproduct:{cartItems.map((item) =>(item.name,'=',item.qty*item.price).toFixed(2))}</h4>
              <h4>Total : ({cartItems.reduce((previousValue,singleItem) => previousValue+singleItem.qty*singleItem.price,0).toFixed(2)}) $</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                onClick={clickHandler}
              >PROCEED TO PAYMENT</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>

    </Row>
  )
}

export default CartPage