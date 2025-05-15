import {
  CART_ADD_ITEM,
  CART_CALCULATE_TOTALS,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_RESET,
} from "../constants/cartConstants";

export const cartReducer = (
  state = {
    cartItems: [],
    shippingAddress: {},
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
  action,
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x,
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_CALCULATE_TOTALS:
      return {
        ...state,
        itemsPrice: action.payload.itemsPrice,
        shippingPrice: action.payload.shippingPrice,
        taxPrice: action.payload.taxPrice,
        totalPrice: action.payload.totalPrice,
      };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case CART_RESET:
      return {
        cartItems: [],
        shippingAddress: {},
        itemsPrice: 0,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0,
      };

    default:
      return state;
  }
};
