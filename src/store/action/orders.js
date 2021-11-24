import axios from "axios";
import { createAction } from ".";
import { fetchMe } from "./auth";
import { actionType } from "./type";

export const setOrderAction = () => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:5000/orders",
      });
      console.log("data orders", res.data);

      dispatch(createAction(actionType.SET_ORDER, res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const setOrderDetailAction = (dispatch, orderDetail) => {
  dispatch(createAction(actionType.SET_ORDER_DETAIL, orderDetail));
};

export const confirmOrderAction = async (_id, props) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:5000/orders/confirmorder/",
      data: { _id },
    });

    alert("Successfully Confirmed Order: " + res.data._id);
    props.history.push("/admin/orders");
  } catch (error) {
    alert(error.response.data);
  }
};

export const deleteOrderAction = async (_id, userId, dispatch) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `http://localhost:5000/orders/delete/${_id}`,
    });

    alert(res.data);
    dispatch(fetchMe(userId));
  } catch (error) {
    console.log(error);
  }
};
