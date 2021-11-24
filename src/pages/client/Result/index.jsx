import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { orderDetailProductAction } from "../../../store/action/cart";
import moment from "moment";
import "./index.css";

const Result = (props) => {
  const order = useSelector((state) => state.cart.order);

  const dispatch = useDispatch();

  // useEffect(() => {
  //     dispatch(orderDetailProductAction(props.match.params._id));
  // },[dispatch,props.match.params._id ])

  return (
    <div className="container pt-5">
      <div className="result-check">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={36}
            height={36}
            fill="currentColor"
            className="bi bi-check2 text-white"
            viewBox="0 0 16 16"
          >
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
          </svg>
        </span>
      </div>
      <div className="text-center">
        <p className="py-4 font-weight-bold fs-3 text-center">
          ĐẶT HÀNG THÀNH CÔNG
        </p>
        <p className=" result-note">
          *Lưu ý: Curnon sẽ liên lạc lại với bạn trong 24h (trừ thứ 7, chủ nhật
          và các ngày lễ) để xác nhận đơn hàng.
        </p>
        <p className="py-3">
          Mã đơn hàng: <span className="font-weight-bold">{order._id}</span>{" "}
        </p>
      </div>
      <div className="result-info">
        <h3>Thông tin khách hàng</h3>
        <p>Người nhận : {order.recipient}</p>
        <p>Số điện thoại : {order.recipientPhoneNumber}</p>
        <p>Địa chỉ nhận hàng: {order.recipientAddress}</p>
        <p>
          Ngày đặt hàng: {moment(order.createdAt).format("YYYY-MM-DD HH:mm:ss")}
        </p>
      </div>
      <div className="button-result py-3">
        <NavLink to="/">
          <button className="result-button">TIẾP TỤC MUA SẮM</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Result;
