import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LayoutClientPage from "../../../HOCs/LayoutClientPage";
import moment from "moment";

import {
  decreaseQuantity,
  deleteCartAcTion,
  increaseQuantity,
} from "../../../store/action/cart";

const Cart = (props) => {
  const me = useSelector((state) => state.auth.auth) || {};
  const cart = me.cart || [];
  // const cart = useSelector((state) => state.auth.auth.cart) || {};

  const dispatch = useDispatch();

  const handleIncreaseQuantity = (userId, productId) => {
    dispatch(increaseQuantity(userId, productId));
  };

  const handleDecreaseQuantity = (userId, productId) => {
    dispatch(decreaseQuantity(userId, productId));
  };

  const handleDeleteProduct = (userId, productId) => {
    dispatch(deleteCartAcTion(userId, productId));
  };

  const renderCart = () => {
    return cart.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.product._id.substr(15, item.product._id.length)}</td>
          <td>{item.product.productName}</td>
          <td>
            <img src={item.product.productImage} width={50} alt="product" />
          </td>
          <td>
            <button
              onClick={() => handleDecreaseQuantity(me._id, item.product._id)}
              className="btn btn-info"
            >
              -
            </button>
            <span> {item.quantity} </span>
            <button
              onClick={() => handleIncreaseQuantity(me._id, item.product._id)}
              className="btn btn-info"
            >
              +
            </button>
          </td>
          <td>{item.product.price} đ</td>
          <td>{item.product.price * item.quantity} đ</td>
          <td>
            <button
              onClick={() => handleDeleteProduct(me._id, item.product._id)}
              className="btn btn-success"
            >
              Xóa
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <LayoutClientPage>
      <div className="container">
        <div>
          <div>
            <div className="p-5  text-center fs-1 font-weight-bold">
              <p>Giỏ Hàng</p>
            </div>
            <div className="">
              <table className="table">
                <thead>
                  <th>Mã sản phẩm</th>
                  <th>Tên sản phẩm</th>
                  <th>Hình ảnh</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
                  <th>Thao tác</th>
                </thead>
                <tbody>{renderCart()}</tbody>
              </table>
            </div>
            <div className="text-right pt-5">
              <NavLink to="/">
                <button type="button" className="btn btn-secondary">
                  Close
                </button>
              </NavLink>
              {cart.length !== 0 ? (
                <NavLink to="/checkout">
                  <button type="button" className="btn btn-success">
                    Thanh toán
                  </button>
                </NavLink>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </LayoutClientPage>
  );
};

export default Cart;
