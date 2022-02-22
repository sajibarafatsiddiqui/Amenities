import { getOverlayDirection } from 'react-bootstrap/esm/helpers'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {
  productReducer,
  productDetailsReducer,
  addCartReducer,
  userLoginReducer,
} from './ProductListReducer'

const reducer = combineReducers({
  products: productReducer,
  product: productDetailsReducer,
  cart: addCartReducer,
  userLogin: userLoginReducer,
})

const getCartItemFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const getLoginInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : []

const middleware = [thunk]
const initialState = {
  cart: { cartItems: getCartItemFromStorage },
  userLogin: { userInfo: getLoginInfo },
}

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
