import logo from './logo.svg'
import './App.css'
import { Container } from 'react-bootstrap'
import Header from './component/Header'
import Footer from './component/Footer'
import HomeScreen from './component/Screen/HomeScreen'
import ProductScreen from './component/Screen/ProductScreen'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CartScreen from './component/Screen/CartScreen'
const App = () => {
  return (
    <Router>
      <div className='App'>
        <Header />
        <main>
          <Container className='my-3'>
            <Routes>
              <Route exact path='/' element={<HomeScreen />} />
              <Route path='/product/:id' element={<ProductScreen />} />
              <Route path='cart' element={<CartScreen />}>
                <Route path=':cartId' element={<CartScreen />} />
              </Route>
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
