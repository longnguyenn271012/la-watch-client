import React from "react";
import { useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import { logOut } from "../../store/actions/auth";

const Sidebar = (props) => {
  const me = useSelector((state) => state.auth.auth);

  //   const dispatch = useDispatch();

  //   const handleLogOut = () => {
  //     logOut(dispatch);
  //   };

  return (
    <div className="p-3 vh-100 container-fluid">
      <div className="row">
        <div className="col-12 col-lg-12">
          <NavLink to="/admin" className="text-decoration-none">
            <div className="col-12 col-lg-12 fs-3 p-0 fw-bolder pb-4 text-center">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/watch-shop-57ae8.appspot.com/o/BRAND-LOGO%2Flogo-brand-remove-bg.png?alt=media&token=312a9782-9568-4d16-ac8a-316864b796dc"
                className="w-100"
              />
              {/* <span className="text-warning">Watch</span>
              <span>Shop</span> */}
            </div>
          </NavLink>

          <div className="col-12 col-lg-12 p-0 mb-5 d-flex justify-content-between">
            <i class="fa fa-user fs-4 p-2"></i>
            <div className="d-inline-block">
              <span className="d-block fs-6">Admin</span>
              {me ? (
                <span className="fw-bold text-warning">
                  {me.fullName.substr(0, 9) + " ..."}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className="">
              {me ? (
                <NavLink to="/admin/signin">
                  <button className="btn btn-dark border border-warning border-2 px-2">
                    <i class="fa fa-sign-in-alt"></i>
                  </button>
                </NavLink>
              ) : (
                <NavLink to="/admin/signin">
                  <button className="btn btn-dark border border-warning border-2 p-2">
                    <i class="fa fa-sign-in-alt"></i>
                  </button>
                </NavLink>
              )}
            </div>
          </div>
        </div>
        <div
          className="row col-12 col-lg-12 bg-transparent"
          style={{ fontSize: "16px" }}
        >
          <ul className="list-group p-0">
            <li className="col-4 col-lg-12 list-group-item bg-transparent">
              <NavLink to="/admin" className="text-white text-decoration-none">
                <i class="fa fa-th-list pe-2 text-warning fs-5 px-1"></i>
                DASHBOARD
              </NavLink>
            </li>
            <li className="col-4 col-lg-12  list-group-item bg-transparent">
              <NavLink
                to="/admin/users"
                className="text-white text-decoration-none"
              >
                <i class="fa fa-users pe-2 text-warning fs-5"></i>
                USERS
              </NavLink>
            </li>
            <li className="col-4 col-lg-12  list-group-item bg-transparent">
              <NavLink
                to="/admin/producttypes"
                className="text-white text-decoration-none"
              >
                <i class="fa fa-tasks pe-2 text-warning fs-5 px-1"></i>
                PRODUCT TYPES
              </NavLink>
            </li>
            <li className="col-4 col-lg-12  list-group-item bg-transparent">
              <NavLink
                to="/admin/products"
                className="text-white text-decoration-none"
              >
                <i class="fa fa-clock pe-2 text-warning fs-5 px-1"></i>
                PRODUCTS
              </NavLink>
            </li>

            <li className="col-4 col-lg-12  list-group-item bg-transparent">
              <NavLink
                to="/admin/orders"
                className="text-white text-decoration-none"
              >
                <i class="fa fa-shopping-cart pe-2 text-warning fs-5"></i>
                ORDERS
              </NavLink>
            </li>
            <li className="col-4 col-lg-12  list-group-item bg-transparent">
              <NavLink
                to="/admin/vouchers"
                className="text-white text-decoration-none"
              >
                <i class="fa fa-ticket-alt pe-2 text-warning fs-5"></i>
                VOUCHERS
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
