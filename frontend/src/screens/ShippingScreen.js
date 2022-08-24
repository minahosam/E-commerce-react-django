import React,{useState,useEffect} from 'react'
import { Form,Button } from 'react-bootstrap'
import CheckOutProcess from '../Container/CheckOutProcess'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../Container/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen({history}) {

    const patch = useDispatch()
    const shippingAddreeFromCart= useSelector( state => state.cartItem)
    const { shipping } = shippingAddreeFromCart
    //console.log(shipping)

    const [address,setAddress] = useState(shipping.address)
    const [city,setCity] = useState(shipping.city)
    const [country,setCountry] = useState(shipping.country)
    const [postalCode,setPostalCode] = useState(shipping.postalCode)


    const clickHandler=(e) => {
        e.preventDefault()
        //console.log('Click')
        patch(saveShippingAddress({address,city,country,postalCode}))
        history.push('/payment')
    }
    
  return (
    <FormContainer>
        <CheckOutProcess step1 step2 color='blue'></CheckOutProcess>
        <h1>Shipping Page</h1>
        <Form onSubmit={clickHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    placeholder="Enter Address"
                    type="text"
                    value={address ? address : ''}
                    onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    value={city ? city : ''}
                    placeholder="Enter City"
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                    placeholder="Enter Country"
                    value={country ? country : ''}
                    onChange={(e) => setCountry(e.target.value)}
                    type="text"
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    placeholder="Enter Postal Code"
                    value={postalCode ? postalCode : ''}
                    type="number"
                    onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>Submit</Button>
        </Form>    
    </FormContainer>
  )
}

export default ShippingScreen