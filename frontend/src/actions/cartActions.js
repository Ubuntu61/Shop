import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CALCULATE_TOTALS, 
} from "../constants/cartConstants";

// add to the cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
      shippingFee: 5, 
    },
  });

  dispatch(calculateTotals());

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  dispatch(calculateTotals());

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const calculateTotals = () => (dispatch, getState) => {
  const { cartItems } = getState().cart;

  // calculate the price
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  // calculate the shipping fee
  const shippingPrice = cartItems.reduce(
    (acc, item) => acc + item.shippingFee * item.qty,
    0,
  );

  // calculate the tax
  const taxPrice = itemsPrice * 0.1;

  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  dispatch({
    type: CART_CALCULATE_TOTALS,
    payload: {
      itemsPrice: Number(itemsPrice.toFixed(2)),
      shippingPrice: Number(shippingPrice.toFixed(2)),
      taxPrice: Number(taxPrice.toFixed(2)),
      totalPrice: Number(totalPrice.toFixed(2)),
    },
  });
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
