import axios from "axios";
import { createAction } from ".";
import { actionType } from "./type";

export const setProductTypeAction = async (dispatch, keyword = "") => {
  if (keyword === "") {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:5000/productType",
      });
      dispatch(createAction(actionType.SET_PRODUCT_TYPE, res.data));
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/productType/searchbyname",
        data: { keyword },
      });
      dispatch(createAction(actionType.SET_PRODUCT_TYPE, res.data));
    } catch (error) {
      console.log(error);
    }
  }
};

export const setProductTypeDetail = (dispatch, productTypeDetail) => {
  dispatch(createAction(actionType.SET_PRODUCT_TYPE_DETAIL, productTypeDetail));
};

export const insertProductType = async (data, props) => {
  console.log("data ptype insert", data);

  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:5000/productType",
      data: data,
    });

    alert("Successfully Inserted Product Type: " + data.productTypeName);
    props.history.push("/admin/productTypes");
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const updateProductType = async (_id, updateProductType, callback) => {
  console.log("data ptype update", updateProductType);
  try {
    const res = await axios({
      method: "POST",
      url: `http://localhost:5000/productType/update/${_id}`,
      data: updateProductType,
    });

    alert(
      "Successfully Updated Product Type: " + updateProductType.productTypeName
    );
    callback();
  } catch (error) {
    alert(error.response.data.message);
    console.log(error);
  }
};

export const deleteProductType = async (_id, props) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `http://localhost:5000/productType/delete/${_id}`,
    });

    alert(res.data);
    props.history.push("/admin/producttypes");
  } catch (error) {
    console.log(error);
  }
};
