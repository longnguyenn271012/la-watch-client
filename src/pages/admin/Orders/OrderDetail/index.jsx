import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import LayoutAdminPage from "../../../../HOCs/LayoutAdminPage";
import {
  deleteUserAction,
  updateUserAction,
} from "../../../../store/action/users";
import {
  confirmOrderAction,
  deleteOrderAction,
} from "../../../../store/action/orders";

const OrderDetail = (props) => {
  const orderDetail = useSelector((state) => state.orders.orderDetail) || {};

  const _id = props.match.params._id;

  const handleConfirmOrder = () => {
    confirmOrderAction(_id, props);
  };

  const handleDeleteOrder = () => {
    deleteOrderAction(_id, props);
  };

  return (
    <LayoutAdminPage>
      <div className="container-fluid">
        <div className="row">
          <div className="col-6 py-3">
            <span className="fs-2 fw-bolder">Order Detail</span>
          </div>
          <div className="col-6 row py-3 ">
            <div className="col-12">
              {orderDetail.orderStatus === "Confirmed" ? (
                <p className="w-50 text-center text-success border border-success border-2 fs-4 fw-bolder p-2">
                  {orderDetail.orderStatus}
                </p>
              ) : (
                <p className="w-50 text-center text-danger border border-danger border-2 fs-4 fw-bolder p-2">
                  {orderDetail.orderStatus}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="row my-3">
          <form className="col-12 row">
            <div className="col-12 col-md-6">
              <div className="col-12 my-2">
                <label className=" mb-2">Order Id: </label>
                <input
                  id="_id"
                  className="w-100  border border-warning p-2 "
                  value={_id}
                  disabled
                ></input>
              </div>
              <div className="col-12 my-2">
                <label className=" mb-2">Recipient: </label>
                <input
                  id="recipient"
                  className="w-100  border border-warning p-2 "
                  value={orderDetail.recipient}
                ></input>
              </div>
              <div className="col-12 my-2">
                <label className=" mb-2">Recipient Address: </label>
                <input
                  id="recipientAddress"
                  className="w-100  border border-warning p-2 "
                  value={orderDetail.recipientAddress}
                ></input>
              </div>
              <div className="col-12 my-2">
                <label className=" mb-2">Recipient Phone Number: </label>
                <input
                  id="recipientPhoneNumber"
                  className=" w-100  border border-warning p-2 "
                  value={orderDetail.recipientPhoneNumber}
                ></input>
              </div>
              <div className="col-12 my-2">
                <label className=" mb-2">Created At: </label>
                <input
                  id="createdAt"
                  className=" w-100  border border-warning p-2 "
                  value={orderDetail.createdAt.substr(0, 10)}
                ></input>
              </div>
              <div className="col-12 my-2">
                <label className=" mb-2">Total Price: </label>
                <input
                  id="totalPrice"
                  className=" w-100  border border-warning p-2 "
                  value={orderDetail.totalPrice}
                ></input>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label className="fw-bolder fs-2 mb-2">Order Cart: </label>
              {orderDetail.cart.map((item) => {
                return (
                  <div className="col-12 my-2 mb-4">
                    <img
                      id="productImage"
                      className="w-100 col-2 border border-warning p-2 me-2"
                      src={item.product.productImage}
                    ></img>
                    <input
                      id="productName"
                      className="w-100 col-6 border border-warning p-2 me-2"
                      value={item.product.productName}
                    ></input>
                    <input
                      id="quantity"
                      className="w-100 col-3 border border-warning p-2 me-2"
                      value={item.quantity}
                    ></input>
                  </div>
                );
              })}
            </div>
          </form>
        </div>

        <div className="row">
          {orderDetail.orderStatus === "Waiting confirmation" ? (
            <button
              type="button"
              onClick={handleConfirmOrder}
              className="col-3 btn btn-primary  border-2 p-2 mx-2 my-5"
            >
              Confirm Order
              <i class="ms-4 fa fa-edit"></i>
            </button>
          ) : (
            <></>
          )}
          <button
            type="button"
            className="col-3 btn btn-danger  border-2 p-2 mx-2 my-5"
            onClick={() => handleDeleteOrder()}
          >
            Delete Order
            <i class="ms-4 fa fa-trash"></i>
          </button>
        </div>
      </div>
    </LayoutAdminPage>
  );
};

export default OrderDetail;
