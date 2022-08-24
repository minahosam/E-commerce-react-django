import React from 'react'
import FormContainer from './FormContainer'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav,Row,Col } from 'react-bootstrap'

function CheckOutProcess({step1, step2, step3, step4,color, children}) {
  return (
    <div>
      <Nav className='justify-content-center mb-4' md={5} >
          <Nav.Item >
              {step1 ? (
                <LinkContainer to='/login' style={{color}}>
                    <Nav.Link >login</Nav.Link>
                </LinkContainer>
              ):(
                    <Nav.Link disabled>Login</Nav.Link>
              )}
          </Nav.Item>
          <Nav.Item>
              {step2 ? (
                <LinkContainer to='/shipping' style={{color}}>
                  <Nav.Link>shipping</Nav.Link>
                </LinkContainer>
              ):(
                  <Nav.Link disabled>Shipping</Nav.Link>
              )}
          </Nav.Item>
          <Nav.Item >
              {step3 ? (
                <LinkContainer to='/payment' style={{color}}>
                  <Nav.Link>payment</Nav.Link>
                </LinkContainer>
              ):(
                  <Nav.Link disabled>Payment</Nav.Link>
              )}
          </Nav.Item>
          <Nav.Item >
              {step4 ? (
                <LinkContainer to='/order'>
                  <Nav.Link>makeOrder</Nav.Link>
                </LinkContainer>
              ):(
                  <Nav.Link disabled>makeOrder</Nav.Link>
              )}
          </Nav.Item>
      </Nav>
    </div>
  )
}

export default CheckOutProcess
