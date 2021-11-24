import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import products from "./reducer/products";
import productTypes from "./reducer/productTypes";
import auth from "./reducer/auth";
import users from "./reducer/users";
import orders from "./reducer/orders";

import cart from "./reducer/cart";

import vouchers from "./reducer/vouchers";

const reducer = combineReducers({
  products,
  productTypes,
  auth,
  users,
  orders,
  cart,
  vouchers,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
