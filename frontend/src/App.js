import Header from './Container/Header'
import Footer from './Container/Footer'
import { Container } from 'react-bootstrap'
import HomePage from './screens/HomePage'
import { BrowserRouter,Route,Switch } from 'react-router-dom'
import ProductPage from './screens/ProductPage'
import CartPage from './screens/CartPage'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import OrderScreen from './screens/OrderScreen'
import OrderPage from './screens/OrderPage'
import ListUserPage from './screens/ListUserPage' 
import UserEditPage from './screens/UserEditPage'
import ProductList from './screens/ProductList'
import ProductEditPage from './screens/ProductEditPage'
import AllOrdersScreen from './screens/AllOrdersScreen'


function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path='/cart/:id?' component={CartPage} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/order' component={OrderScreen} />
          <Route path='/orders/:id' component={OrderPage} />
          <Route path='/allUsers' component={ListUserPage} />
          <Route path='/admin/user/:id' component={UserEditPage}/>
          <Route path='/allProducts' component={ProductList} />
          <Route path='/:id/edit' component={ProductEditPage} />
          <Route path='/allOrders' component={AllOrdersScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;