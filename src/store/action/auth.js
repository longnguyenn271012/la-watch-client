import axios from "axios";
import { createAction } from ".";
import { actionType } from "./type";

export const signUpAction = (userSignup) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/users/signup",
        data: userSignup,
      });
      dispatch(createAction(res.data));
      console.log("data sign up", res.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
};

export const signInAction = (userSignin, callback) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/users/signin",
        data: userSignin,
      });
      dispatch(createAction(actionType.SET_ME, res.data.data));
      callback();
      localStorage.setItem("USERID", res.data.data._id);
      console.log("Signin data", res.data.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
};

export const signInForAdminAction = (userSignin, callback) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/users/admin/signin",
        data: userSignin,
      });
      dispatch(createAction(actionType.SET_ME, res.data.data));
      localStorage.setItem("USERID", res.data.data._id);
      callback();
    } catch (error) {
      alert(error.response.data.message); // Sửa chỗ này
    }
  };
};

export const fetchMe = (_id) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/users/userdetail",
        data: { _id },
      });
      dispatch(createAction(actionType.SET_ME, res.data));
    } catch (error) {
      console.log(error);
    }
  };
};
