import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Form,Button } from 'react-bootstrap'
import FormContainer from '../Container/FormContainer'
import { productEditAction,detailProduct } from '../actions/productActions'
import Loader from '../Container/Loader'
import Message from '../Container/Message'
import { PRODUCT_EDIT_RESET } from '../constants/productConstants'
import axios from 'axios'

function ProductEditPage({history,match}) {
  const productId = match.params.id
  const[name,setName]= useState('')
  const[image,setImage]= useState('')
  const[description,setDescription] = useState('')
  const[countInStock,setCountInStock] = useState(0)
  const[brand,setBrand] = useState('')
  const[category,setCategory]= useState('')
  const[price,setPrice]= useState(0)
  const [upload,setUpload] = useState(false)
  const patch = useDispatch()
  const productDetail = useSelector( state => state.productDetail)
  const {loading,product,errors} = productDetail
  const productEdit = useSelector( state => state.productEdit)
  const {loading:loadingEdit,success:successUpdate,error:errorEdit} = productEdit
  useEffect(() => {
    if (successUpdate){
      patch({ type:PRODUCT_EDIT_RESET })
      history.push('/allproducts')
    }else{
      if (!product.name || product.id  !== Number(productId)) {
        patch(detailProduct(productId)) 
      } else {
        setName(product.name)
        setImage(product.image)
        setDescription(product.description)
        setCountInStock(product.countInStock)
        setBrand(product.brand)
        setPrice(product.price)
        setCategory(product.category)
      }
    }
  },[history,productId,patch,product,successUpdate])
  const editHandler = (e) =>{
    e.preventDefault()
    patch(productEditAction({
      id: productId,name,description,category,countInStock,brand,price
    }))
  }
  const uploadImageHandler = async (e) =>{
    console.log('upload')
    const image = e.target.files[0]
    console.log(image)
    const formData = new FormData()
    console.log(formData)
    formData.append('image',image)
    formData.append('product_id',productId)
    console.log(formData)
    let pair
    for (pair of formData.entries()) {
      console.log(pair[0]+pair[1])
      
    }
    setUpload(true)
    try {
      const config ={
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      console.log(formData)
      const{data} = await axios.post('/api/upload/',formData, config)
      setImage(data)
      setUpload(false)
    }catch(error) {
      setUpload(false)
    }
  }
  return (
    <FormContainer>
      <Form onSubmit={editHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            placeholder='Name'
            onChange={(e) =>setName(e.target.value)}
            type='text'
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='image'>
          <Form.Label>Image</Form.Label>
          <Form.Control
            value={image}
            type='text'
            onChange={(e) => setImage(e.target.value)}
          ></Form.Control>
          <Form.File
            id='image'
            label='Choose Image'
            onChange={uploadImageHandler}
            custom
          ></Form.File>
          {upload && <Loader />}
        </Form.Group>
        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            type='text'
            placeholder='Description'
            onChange={(e) =>setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='countInStock'>
          <Form.Label>countInStock</Form.Label>
          <Form.Control
            value={countInStock}
            type='number'
            placeholder='Count in Stock'
            onChange={(e) =>setCountInStock(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='brand'>
          <Form.Label>brand</Form.Label>
          <Form.Control
            value={brand}
            type='text'
            placeholder='Brand'
            onChange={(e) => setBrand(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='category'>
          <Form.Label>category</Form.Label>
          <Form.Control
            value={category}
            type='text'
            placeholder='Category'
            onChange={(e) => setCategory(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='price'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={price}
            type='number'
            placeholder='Price'
            onChange={(e) =>setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button variant='primary' type='submit'>Edit</Button>
      </Form>
    </FormContainer>
  )
}

export default ProductEditPage