import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { detailProduct,productReviewAction } from '../actions/productActions'
import { Row,Col,ListGroup,Form,Card,Button } from 'react-bootstrap'
import Product from '../Container/Product'
import Rating from '../Container/Rating'
import axios from 'axios'
import Message from '../Container/Message'
import Loader from '../Container/Loader'
import { PRODUCT_REVIEW_RESET } from '../constants/productConstants'

function ProductPage({match,history}) {
  // **this method to get product using useState and useEffect**
  // const [product,setProduct]=useState([])
  // useEffect(() => {
  //   async function fetchProduct(){
  //     const {data}=await axios.get(`/api/product/${match.params.id}/`)
  //     setProduct(data)
  //   }
  //   fetchProduct();
  // })

  //**this method using Redux.

  const[qty,setQty] =useState(1)
  const[rating,setRating] =useState(0)
  const[title,setTitle] =useState('')
  const[comment,setComment] =useState('')


  // const setToCartHandler=()=>{
  //   console.log(match.params.id)
  //   history.push(`/cart/${match.params.id}?qty=${qty}`)
  // }

  const patch = useDispatch()
  const productDetailItem =useSelector( state => state.productDetail)
  //console.log(productDetailItem)
  const {error,loading,product} =productDetailItem
  //console.log(product)
  const productReview= useSelector( state => state.productReview)
  const {loading:loadingReviews,error:errorReviews,reviews,success:successReviews} = productReview
  const loginUser = useSelector(state =>state.loginUser)
  const {userDetails}=loginUser

  useEffect(() => {
    if (successReviews) {
      setRating(0)
      setTitle('')
      setComment('')
      patch({ type: PRODUCT_REVIEW_RESET})
    }
    patch(detailProduct(match.params.id))
  },[patch,match,userDetails,successReviews])

  const setToCartHandler=()=>{
    console.log(match.params.id)
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitReviewHandler = (e)=>{
    e.preventDefault()
    patch(productReviewAction(product.id,{rating,title,comment}))
  }

  // const product={}
  return (
    <div>
      <Card >
        <Link to="/" className="btn btn-light py-3">Go Back</Link>
        <Row>
          <Col md={6} >
            <img src={product.image} alt={product.name} fluid='true' rounded='true'/>
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating rate={product.rating} reviews={`${product.numReviews} reviews`} color='black' />
              </ListGroup.Item>
              <ListGroup.Item>
                price: ${product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                description: {product.description}
              </ListGroup.Item>
            </ListGroup>       
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      Price :
                    </Col>
                    <Col>
                      <strong>{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      Status :
                    </Col>
                    <Col>
                      <strong>{product.countInStock > 0 ? 'In Stock':'outStock'}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col xs='auto' className='my-1'>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e)=>setQty(e.target.value)}>
                              {
                                [...Array(product.countInStock).keys()].map((x)=>(
                                  <option value={x+1} key={x+1}>{x+1}</option>
                                ))
                              }
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                </ListGroup.Item>
                <ListGroup.Item >
                  <Button onClick={setToCartHandler} className="btn-block" type="button" disabled={product.countInStock === 0}>Add to basket</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Card>
      <Card>
        <Row>
          <Col md={6}>
            <h4>Reviews</h4>
            {product.reviews.length === 0 && <Message>no comment</Message>}
            <ListGroup variant='flush' >
              {product.reviews.map((review) =>(
                <ListGroup.Item key={review.id}>
                  <strong>{review.name}</strong>
                  <Rating rate={review.rating} color='#f8e825'></Rating>
                  <p>{review.createdAt.substring(0,10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                {loadingReviews && <Loader />}
                {errorReviews && <Message>{errorReviews}</Message>}
                {userDetails ? (
                  <Form onSubmit={submitReviewHandler}>
                    <Form.Group controlId='rating'>
                      <Form.Label>rating</Form.Label>
                      <Form.Control
                        as='select'
                        value={rating}
                        onChange={(e)=>setRating(e.target.value)}
                      >
                        <option value=''>select</option>
                        <option value='1'>1 - poor</option>
                        <option value='2'>2 - fair</option>
                        <option value='3'>3 - good</option>
                        <option value='4'>4 - veryGood</option>
                        <option value='5'>5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='title'>
                      <Form.Label>title</Form.Label>
                      <Form.Control
                        type='text'
                        value={title}
                        placeholder='write title'
                        onChange={(e)=>setTitle(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment'>
                      <Form.Label>comment</Form.Label>
                      <Form.Control
                        as='textarea'
                        type='text'
                        value={comment}
                        placeholder='write comment'
                        onChange={(e) => setComment(e.target.value)}
                        row='5'
                      ></Form.Control>
                    </Form.Group>
                    <Button variant='primary' type='submit' disabled={loadingReviews}>submit</Button>
                  </Form>
                ):(
                  <Message>please <Link to='/login'>login</Link> to write review</Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default ProductPage