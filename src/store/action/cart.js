import axios from "axios";
import { createAction } from ".";
import { fetchMe } from "./auth";
import { actionType } from "./type";

export const deleteProductAction = (dispatch, id) => {
  dispatch(createAction(actionType.DELETE_PRODUCT, id));
};

export const addToCart = (userId, productId, quantity) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/users/cart/add",
        data: {
          userId,
          productId,
          quantity,
        },
      });
      console.log("add to cart", res.data);

      dispatch(fetchMe(userId));
      //   dispatch(createAction(actionType.SET_ME, res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const increaseQuantity = (userId, productId) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/users/cart/increasequantity",
        data: {
          userId,
          productId,
        },
      });
      dispatch(fetchMe(userId));
    } catch (error) {
      console.log(error);
    }
  };
};

export const decreaseQuantity = (userId, productId) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/users/cart/decreasequantity",
        data: {
          userId,
          productId,
        },
      });
      dispatch(fetchMe(userId));
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteCartAcTion = (userId, productId) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/users/cart/deletecart",
        data: {
          userId,
          productId,
        },
      });
      dispatch(fetchMe(userId));
    } catch (error) {
      console.log(error);
    }
  };
};

export const orderProductAction = (userId, order, callback) => {
  return async (dispatch) => {
    const { recipientAddress, recipient, recipientPhoneNumber, payment } =
      order;

    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/orders",
        data: {
          userId,
          recipientAddress,
          recipient,
          recipientPhoneNumber,
          payment,
        },
      });
      console.log("orderProduct", res.data);
      dispatch(createAction(actionType.SET_ORDER_PRODUCT, res.data));
      callback();
    } catch (error) {
      console.log(error);
    }
  };
};

export const orderDetailProductAction = (_id) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:5000/orders/detail?",
        params: {
          _id,
        },
      });
      console.log("orderProduct Detail", res.data);
    } catch (error) {
      console.log(error);
    }
  };
};
export const orderHistoryAction = (_id) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/orders/history",
        data: {
          _id,
        },
      });
      console.log("orderProduct History", res.data);
      dispatch(createAction(actionType.SET_ORDER_HISTORY, res.data));
    } catch (error) {
      console.log(error);
    }
  };
};
