import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Table,Button,Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../Container/Loader'
import Message from '../Container/Message'
import { listProducts,deleteProductAction,createProductAction } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'


function ProductList({history}) {
    const patch = useDispatch()
    const productList=useSelector( state => state.productList)
    const {loading,products,errors}=productList
    const loginUser = useSelector(state =>state.loginUser)
    const {userDetails}=loginUser
    const productDelete = useSelector( state => state.productDelete)
    const {loading:loadingDelete,success:successDelete, error:errorDelete}=productDelete
    const createProduct = useSelector( state => state.createProduct)
    const {loading:loadingCreate,success:successCreate, error:errorCreate,product:productCreate} = createProduct
    useEffect(() => {
        patch({type: PRODUCT_CREATE_RESET})
        if (!userDetails||!userDetails.isAdmin) {
            history.push('/login')            
        }
        if (successCreate){
            history.push(`${productCreate.id}/edit`)
        }else{
            patch(listProducts())
        }
    },[patch,successDelete,userDetails,history,successCreate,productCreate])
    const deleteProduct=(id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            patch(deleteProductAction(id))
        }
    }
    const createNewProduct=() => {
        patch(createProductAction())
    }
  return (
    <div>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createNewProduct}>
                    <i className='fas fa-plus'></i>Create Product
                </Button>
            </Col>
        </Row>
        {loading && <Loader />}
        {errors && <Message>{errors}</Message>}
        {loadingDelete && <Loader />}
        {errorDelete && <Message>{errorDelete}</Message>}
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>PRODUCT NAME</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Brand</th>
                    <th></th>
                </tr>
            </thead>
            {products.map( product =>(
                <tbody key={product.id}>
                    <tr>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.countInStock}</td>
                        <td>{product.brand}</td>
                        <td>
                            <LinkContainer to={`/${product.id}/edit/`}>
                                <Button className='btn-sm' variant='primary'>
                                    <i className='fas fa-edit'></i>
                                </Button>
                            </LinkContainer>
                            <Button className='btn-sm' variant='danger' onClick={() =>{deleteProduct(product.id)}}>
                                <i className='fas fa-trash'></i>
                            </Button>
                        </td>
                    </tr>
                </tbody>
            ))}
        </Table>
    </div>
  )
}

export default ProductList