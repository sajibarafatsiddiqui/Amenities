import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from './Product'

import { productAction } from '../../Redux/Action'

const HomeScreen = () => {
  const dispatch = useDispatch()
  console.log('hello1')
  const productList = useSelector((state) => state.products)
  const { loading, products, error } = productList
  useEffect(() => {
    dispatch(productAction())
  }, [dispatch])
  return (
    <>
      {loading === 'false' ? (
        <h1>Loading...</h1>
      ) : error === 'true' ? (
        <h1>{error}</h1>
      ) : (
        <Row>
          {products.map((product, key) => (
            <Col sm={12} md={9} lg={4} xl={3}>
              <Product product={product} key={product._id} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
