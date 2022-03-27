import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FormContainer from './FormContainer'
import { loginAction } from '../Redux/Action'
import Message from './Screen/Message'
import Loader from './Screen/Loader'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const location = useLocation()
  const history = useNavigate()
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  useEffect(() => {
    console.log(userInfo)
    if (userInfo) {
      // history(redirect)
    }
  }, [history, userInfo])
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(loginAction(email, password))
  }
  return (
    <FormContainer>
      {error && <Message>{error}</Message>}
      {loading && <Loader />}
      <h1>Sign in</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>
            {' '}
            Email Address
            <Form.Control
              type='email'
              placeholder='email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Label>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>
            {' '}
            Password
            <Form.Control
              type='password'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Label>
        </Form.Group>
        <Button type='button' variant='primary'></Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link
            to={redirect ? `/register/?redirect=${redirect}` : '/register'}
          />
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
