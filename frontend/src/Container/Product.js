import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating';
import { Link } from 'react-router-dom';

function Product({product}) {
  return (
    <Card style={{ width: '18rem' }} className="my-3 p-3 rounded" flush='true'>
        <Link to={`/product/${product.id}`} >
            <Card.Img src={product.image} />
        </Link>
        <Card.Body>
            <Link to={`/product/${product.id}`}>
                <Card.Title as='div'>
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as="div">
                <Rating rate={product.rating} reviews={`${product.numReviews} reviews`} color='red'/>
            </Card.Text>
            <Card.Text as='div'>
                <div>${product.price}</div>
            </Card.Text>
        </Card.Body>
    </Card>
  )
}


export default Product
