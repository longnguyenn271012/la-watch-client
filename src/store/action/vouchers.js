import axios from "axios";
import { createAction } from ".";
import { actionType } from "./type";

export const setVoucherAction = () => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:5000/vouchers",
      });
      console.log("data vouchers", res.data);

      dispatch(createAction(actionType.SET_VOUCHER, res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const setVoucherDetailAction = (dispatch, voucherDetail) => {
  dispatch(createAction(actionType.SET_VOUCHER_DETAIL, voucherDetail));
};

export const insertVoucherAction = async (data, props) => {
  console.log("data vouchers insert", data);

  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:5000/vouchers",
      data: data,
    });

    alert("Successfully Inserted Voucher: " + data.voucherName);
    props.history.push("/admin/vouchers");
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const updateVoucherAction = async (_id, updateVoucher, callback) => {
  console.log("data voucher update", updateVoucher);
  try {
    const res = await axios({
      method: "POST",
      url: `http://localhost:5000/vouchers/update/${_id}`,
      data: updateVoucher,
    });

    alert("Successfully Updated Voucher: " + updateVoucher.voucherName);
    callback();
  } catch (error) {
    alert(error.response.data.message);
    console.log(error);
  }
};

export const deleteVoucherAction = async (_id, callback) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `http://localhost:5000/vouchers/delete/${_id}`,
    });

    alert(res.data);
    callback();
  } catch (error) {
    console.log(error);
  }
};
