import React from 'react'
import { Row, Col, ListGroup, Image, Form, Button } from 'react-bootstrap'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import { addCartItem, removeCartItem } from '../../Redux/Action'

const CartScreen = () => {
  const params = useParams()
  const product = params.cartId
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useNavigate()
  const qty = location.search ? location.search.split('=')[1] : 0

  useEffect(() => {
    if (product) {
      dispatch(addCartItem(product, qty))
    }
  }, [dispatch, product, qty])
  const removeItemHandler = (id) => {
    dispatch(removeCartItem(id))
    history('/cart')
  }
  const checkoutHandler = () => {
    history('/login?redirect=shipping')
  }
  const { cartItems } = useSelector((state) => state.cart)

  return (
    <Row>
      <Col md={8}>
        <ListGroup variant='flush'>
          {cartItems.length > 0 &&
            cartItems.map((x) => (
              <ListGroup.Item>
                <Row>
                  <Col md={2}>
                    <Image src={x.image} alt={x.name} fluid rounded />
                  </Col>
                  <Col
                    md={3}
                    style={{ fontSize: '0.8rem', padding: '1.5rem 0' }}
                  >
                    <Link to={`/product/${x.product}`}> {x.name} </Link>
                  </Col>
                  <Col
                    md={2}
                    style={{ fontSize: '0.8rem', padding: '1.5rem 0' }}
                  >
                    ${x.price}
                  </Col>
                  <Col
                    md={2}
                    style={{ fontSize: '0.8rem', padding: '1.5rem 0' }}
                  >
                    <Form.Select
                      size='sm'
                      value={x.qty}
                      onChange={(e) =>
                        dispatch(addCartItem(x.product, Number(e.target.value)))
                      }
                    >
                      {[...Array(x.countInStock).keys()].map((y) => (
                        <option key={y + 1} value={y + 1}>
                          {y + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={3} style={{ margin: '1.5rem 0' }}>
                    <Button
                      size='sm'
                      type='button'
                      variant='light'
                      onClick={() => removeItemHandler(x.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
      {cartItems.length > 0 && (
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
                items and total price is{' '}
                {cartItems
                  .reduce(
                    (acc, item) => acc + Number(item.qty) * Number(item.price),
                    0
                  )
                  .toFixed(2)}
              </h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant='dark' onClick={checkoutHandler}>
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      )}
    </Row>
  )
}

export default CartScreen
