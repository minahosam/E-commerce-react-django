import React,{useEffect} from 'react'
import { Carousel,Image } from 'react-bootstrap'
import { productTopAction } from '../actions/productActions'
import { Link } from 'react-router-dom'
import Loader from '../Container/Loader'
import Message from '../Container/Message'
import { useDispatch,useSelector } from 'react-redux'

function ProductCarousel() {
    const patch = useDispatch()
    const productTop = useSelector(state => state.productTop)
    const {loading,products,error}= productTop
    useEffect(() => {
        patch(productTopAction())
    },[patch])
  return (
    <div>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      <Carousel pause='hover' className='bg-dark'>
        {products.map(product =>(
            <Carousel.Item key={product.id}>
                <Link to={`/product/${product.id}`}>
                    <Image src={product.image} alt={product.name} fluid/>
                    <Carousel.Caption className="carousel-caption">
                        <h4>{product.name} ({product.price})</h4>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}
export default ProductCarousel
