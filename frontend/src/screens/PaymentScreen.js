import React,{useState,useEffect} from 'react'
import CheckOutProcess from '../Container/CheckOutProcess'
import FormContainer from '../Container/FormContainer'
import { useDispatch,useSelector } from 'react-redux'
import { Form,Col,Button } from 'react-bootstrap'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen({history}) {
    const patch= useDispatch()
    const shippingAddreeFromCart = useSelector( state => state.cartItem)
    const { shipping } = shippingAddreeFromCart
    const [paymentMethod,setPaymentMethod] = useState('PayPal')
    const paymentMethodFromCart= useSelector( state => state.cartItem)
    const { payment } = paymentMethodFromCart
    console.log(payment)
    if(!shipping) {
        history.push('/shipping')
    }
    const clickHandler=(e) => {
        e.preventDefault()
        patch(savePaymentMethod(paymentMethod))
        history.push('/order')
    }

  return (
    <FormContainer>
      <CheckOutProcess step1 step2 step3 color="orange" />
      <h1>Payment Page</h1>
      <Form onSubmit={clickHandler}>
          <Form.Group>
              <Form.Label as='legend'>Select Method</Form.Label>
              <Col>
                <Form.Check
                    type="radio"
                    label='PayPal'
                    id='paypal'
                    name='paymentMethod'
                    onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
          </Form.Group>
          <Button variant='primary' type='submit'>Summary</Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
