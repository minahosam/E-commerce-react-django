import React,{useState,useEffect} from 'react'
import { Container,Row,Col, Alert } from 'react-bootstrap'
//import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Product from '../Container/Product'
import Message from '../Container/Message'
import Loader from '../Container/Loader'
import Paginator from '../Container/Paginator'
import ProductCarousel from '../Container/ProductCarousel'

function HomePage({history}) {
  // **this is the methof to get all products using useState and useEffect**
  // const [products,setProducts]=useState([])
  // useEffect(() => {
  //   async function fetchProducts(){
  //     const {data} = await axios.get('/api')
  //     console.log(data)
  //     setProducts(data)  
  //   }
  //   fetchProducts();
  // },[])
  // getallProducts using redux
  const patch = useDispatch()
  const productListItems = useSelector(state => state.productList)
  const {error,loading,products,page,pages} =productListItems
  // console.log(pages)
  // console.log(page)
  let key = history.location.search
  // console.log(key)
  useEffect(() => {
    patch(listProducts(key))
  },[patch,key])
  
  return (
    <Container>
      <h1>Newest products</h1>
      {loading ? <Loader />
                : error ? <Message>{error}</Message>
                  :
                  <div>
                    <ProductCarousel />
                    <Row >
                      {products.map(product => (
                          <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                              <Product product={product} />
                          </Col>
                          ))}
                    </Row>
                    <Paginator page={page} pages={pages} keyword={key}/>
                  </div>
      }
    </Container>
  )
}

export default HomePage