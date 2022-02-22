import {
  PRODUCT_FAILED,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  USER_SUCCESS,
  USER_REQUEST,
  USER_FAILED,
  LOGOUT,
} from './ActionType'

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_FAILED:
      return { loading: false, products: [], error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: { review: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAILED:
      return { loading: false, ...state, error: action.payload }
    default:
      return state
  }
}

export const addCartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find((x) => x.product === item.product)
      //if item is already exist then update the item else add the item
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === item.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case REMOVE_CART_ITEM:
      console.log(action.payload)
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }
    default:
      return state
  }
}

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return { loading: true }
    case USER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_FAILED:
      return { loading: false, error: action.payload }
    case LOGOUT:
      return {}
    default:
      return state
  }
}
