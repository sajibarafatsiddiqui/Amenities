import axios from 'axios'
import { STATES } from 'mongoose'
import {
  PRODUCT_FAILED,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  USER_FAILED,
  USER_REQUEST,
  USER_SUCCESS,
  LOGOUT,
} from './ActionType'

export const productAction = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REQUEST })
    const { data } = await axios.get('/api/products')
    dispatch({ type: PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const productDetailAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addCartItem = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: ADD_CART_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      brand: data.brand,
      category: data.category,
      countInStock: data.countInStock,
      price: data.price,
      description: data.description,
      qty,
    },
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeCartItem = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  })
  console.log('hi')
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      '/api/user/login',
      { email, password },
      config
    )
    dispatch({ type: USER_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
