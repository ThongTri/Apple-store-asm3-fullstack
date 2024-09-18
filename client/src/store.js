import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
const initialPopupState = {
  show: false,
  popupProduct: {},
  isLogin: false,
  curUser: {},
  cart: [],
  total: 0,
  category: "",
};
function popupReducer(state = initialPopupState, action) {
  if (action.type === "SHOW_POPUP")
    return { ...state, show: true, popupProduct: action.payload };
  if (action.type === "HIDE_POPUP") return { ...state, show: false };
  if (action.type === "SIGNUP_SUCCESS")
    return { ...state, isLogin: true, curUser: action.payload };
  if (action.type === "ON_LOGIN")
    return { ...state, isLogin: true, curUser: action.payload };
  if (action.type === "ON_LOGOUT")
    return { ...state, isLogin: false, curUser: {} };
  if (action.type === "GET_CATEGORY")
    return { ...state, category: action.payload };
  // if (action.type === "GET_CART") {
  //   // get cart from localstorage
  //   return { ...state, cart: action.payload.cart };
  // }
  // if (action.type === "ADD_CART") {
  //   // add new cart at detailPage
  //   let newCart = [...state.cart];
  //   const newItem = {
  //     product: action.payload.product,
  //     quantity: action.payload.quantity,
  //   };
  //   const itemIndex = newCart.findIndex(
  //     (item) => item.product._id === newItem.product._id
  //   );
  //   if (itemIndex === -1) newCart.push(newItem);
  //   else newCart[itemIndex].quantity += action.payload.quantity;
  //   const newTotal = newCart.reduce(
  //     (acc, item) => acc + Number(item.product.price) * item.quantity,
  //     0
  //   );
  //   return { ...state, cart: newCart, total: newTotal };
  // }
  if (action.type === "GET_CART_FROM_SERVER") {
    return { ...state, cart: action.payload.cart, total: action.payload.total };
  }
  if (action.type === "UPDATE_CART") {
    // update cart at CartPage
    let newCart = [...state.cart];
    const newItem = {
      product: action.payload.product,
      quantity: action.payload.quantity,
    };
    const itemIndex = newCart.findIndex(
      (item) => item.product._id === newItem.product._id
    );

    if (itemIndex === -1) newCart.push(newItem);
    else {
      newCart[itemIndex].qty += action.payload.quantity;
      if (newCart[itemIndex].qty < 0) newCart[itemIndex].qty = 0;
    }

    const newTotal = newCart.reduce(
      (acc, item) => acc + Number(item.product.price) * item.qty,
      0
    );

    return { ...state, cart: newCart, total: newTotal };
  }
  if (action.type === "DELETE_CART") {
    let newCart = [...state.cart];
    const deleteItem = action.payload;
    let resultCart = newCart.filter(
      (item) => item.product._id.toString() !== deleteItem._id.toString()
    );
    const newTotal = resultCart.reduce(
      (acc, item) => acc + Number(item.product.price) * item.quantity,
      0
    );
    return { ...state, cart: resultCart, total: newTotal };
  }
  return state;
}
const popupStore = createStore(
  popupReducer,

  composeWithDevTools(applyMiddleware(thunk))
);

export function showPopup(product) {
  return { type: "SHOW_POPUP", payload: product };
}
export function hidePopup() {
  return { type: "HIDE_POPUP" };
}
export function signupSuccess(newUser) {
  return { type: "SIGNUP_SUCCESS", payload: newUser };
}
export function onLogin(curUser) {
  return { type: "ON_LOGIN", payload: curUser };
}
export function onLogout() {
  return { type: "ON_LOGOUT" };
}
export function getCategory(category) {
  return { type: "GET_CATEGORY", payload: category };
}
// export function addCart(product, quantity) {
//   return { type: "ADD_CART", payload: { product, quantity } };
// }
export function updateCart(product, quantity) {
  return { type: "UPDATE_CART", payload: { product, quantity } };
}

export function deleteCart(product) {
  return { type: "DELETE_CART", payload: product };
}
export function getCartFromServer(cart, total) {
  return { type: "GET_CART_FROM_SERVER", payload: { cart, total } };
}
export { popupStore };
