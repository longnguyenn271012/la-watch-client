import axios from "axios";
import { createAction } from ".";
import { actionType } from "./type";

export const setUserAction = () => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:5000/users",
      });
      console.log("data users", res.data);

      dispatch(createAction(actionType.SET_USER, res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const setUserDetailAction = (dispatch, userDetail) => {
  dispatch(createAction(actionType.SET_USER_DETAIL, userDetail));
};

export const insertUserAction = async (data, props) => {
  console.log("data users insert", data);

  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:5000/users",
      data: data,
    });

    alert("Successfully Inserted Account: " + data.userName);
    props.history.push("/admin/users");
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const updateUserAction = async (_id, updateUser, callback) => {
  console.log("data users update", updateUser);
  try {
    const res = await axios({
      method: "POST",
      url: `http://localhost:5000/users/update/${_id}`,
      data: updateUser,
    });

    alert("Successfully Updated Account: " + updateUser.userName);
    callback()
  } catch (error) {
    alert(error.response.data.message);
    console.log(error);
  }
};

export const deleteUserAction = async (_id, props) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `http://localhost:5000/users/delete/${_id}`,
    });

    alert(res.data);
    props.history.push("/admin/users");
  } catch (error) {
    console.log(error);
  }
};
