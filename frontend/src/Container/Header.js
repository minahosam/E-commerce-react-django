import React from 'react'
import { Container,Navbar,Nav,Form,FormControl,Button, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { userLogoutAction } from '../actions/userActions'
import SearchBox from './SearchBox'

function Header() {
  const patch = useDispatch()
  const loginUser = useSelector(state =>state.loginUser)
  const {userDetails}=loginUser

  const logoutHandler=()=>{
    patch(userLogoutAction())
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
        <Container fluid>
          <LinkContainer to='/'>
            <Navbar.Brand >ProShop</Navbar.Brand>
            </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              
            >
              <LinkContainer to='/cart'>
                <Nav.Link ><i className="fas fa-shopping-cart">Cart</i></Nav.Link>
                </LinkContainer>
                {userDetails ? (
                  <NavDropdown title={userDetails.name} id='userDetails'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ):(
                  <LinkContainer to='/login'>
                <Nav.Link ><i className="fas fa-user">Login</i></Nav.Link>
                </LinkContainer>
                )}
              {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link> */}

              { userDetails && userDetails.isAdmin && (
                <NavDropdown title='Admin' id='adminMenu'>
                  <LinkContainer to='/allUsers'>
                    <NavDropdown.Item>All Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/allProducts'>
                    <NavDropdown.Item>All Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/allOrders'>
                    <NavDropdown.Item>All Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
            {/* <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
            <SearchBox />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
