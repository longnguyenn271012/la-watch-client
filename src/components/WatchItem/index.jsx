import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addToCart } from "../../store/action/cart";
import { setProductDetailAction } from "../../store/action/products";
// import Slider from "react-slick";

import "./index.css";

const WatchItem = (props) => {
  const item = props.item;

  const dispatch = useDispatch();

  const me = useSelector((state) => state.auth.auth);

  const handleProductDetail = (productDetail) => {
    setProductDetailAction(dispatch, productDetail);
  };

  const handleAddToCart = (userId, productId, quantity) => {
    // if (!me) props.history.push("/signin");
    dispatch(addToCart(userId, productId, quantity));
  };

  return (
    <div className="col-12 col-md-6 col-lg-3 p-3">
      <div className="card card-product" style={{ width: "18rem" }}>
        <img src={item.productImage} className="card-img-top" alt="item" />
        <div className="card-body">
          <h5 className="card-title text-center font-weight-bold  text-muted">
            {item.productName}
          </h5>
          <p className="card-text font-weight-bold text-center">
            {item.price} đ{" "}
            <span className="ml-3 font-weight-lighter">
              <del>3.268.000 đ</del>
            </span>
          </p>
        </div>
        <div className="d-flex justify-content-around mb-2">
          <NavLink to={`/product/${item._id}`}>
            <button
              onClick={() => handleProductDetail(item)}
              className="btn btn-primary"
            >
              Chi tiết
            </button>
          </NavLink>
          {me ? (
            <button
              onClick={() => handleAddToCart(me._id, item._id, 1)}
              className="btn btn-secondary"
            >
              Thêm vào giỏ
            </button>
          ) : (
            <NavLink to="/signin">
              <button
                // onClick={() => handleAddToCart(me._id, item._id, 1)}
                className="btn btn-secondary"
              >
                Thêm vào giỏ
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchItem;
