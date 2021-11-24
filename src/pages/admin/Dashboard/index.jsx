import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LayoutAdminPage from "../../../HOCs/LayoutAdminPage";
import { setOrderAction } from "../../../store/action/orders";
import { setProductAction } from "../../../store/action/products";
import { setProductTypeAction } from "../../../store/action/productTypes";
import { setUserAction } from "../../../store/action/users";
import { setVoucherAction } from "../../../store/action/vouchers";

const Dashboard = (props) => {
  const me = useSelector((state) => state.auth.auth);
  const users = useSelector((state) => state.users.userList);
  const products = useSelector((state) => state.products.productList);
  const productTypes = useSelector(
    (state) => state.productTypes.productTypeList
  );
  const orders = useSelector((state) => state.orders.orderList);
  const vouchers = useSelector((state) => state.vouchers.voucherList);

  const dispatch = useDispatch();

  useEffect(() => {
    // if (!me) props.history.push("/admin/signin");
    dispatch(setUserAction());
    dispatch(setProductAction());
    setProductTypeAction(dispatch);
    dispatch(setOrderAction());
    dispatch(setVoucherAction());
  }, [dispatch]);

  //Tinh tong tien
  const calculateRevenue = () => {
    let revenue = 0;
    orders.map((item) => {
      revenue += item.totalPrice;
    });
    return revenue;
  };

  return (
    <LayoutAdminPage>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-3 py-3">
            <span className="fs-2 fw-bolder">Dashboard</span>
          </div>
        </div>

        <div className="row">
          <NavLink
            to="/admin/orders"
            className="text-decoration-none py-4 col-12 col-sm-6"
          >
            <div className="row bg-info bg-gradient rounded mx-auto px-4 py-2">
              <div className="col-12 col-sm-9 text-center">
                <span className="fs-3 fw-bolder text-danger">
                  Total Revenue
                </span>
                <br />
                <span className="text-white fw-bolder fs-2">
                  {calculateRevenue()} VND
                </span>
              </div>
              <div className="col-12 col-sm-3 text-center text-dark m-auto">
                <i class="fa fa-coins fs-1 fw-bolder"></i>
              </div>
            </div>
          </NavLink>
          <NavLink
            to="/admin/users"
            className="text-decoration-none py-4 col-12 col-sm-6"
          >
            <div className="row bg-warning bg-gradient rounded mx-auto px-4 py-2">
              <div className="col-12 col-sm-9 text-center">
                <span className="fs-3 fw-bolder text-white">Users Total</span>
                <br />
                <span className="text-danger fw-bolder fs-2">
                  {users.length}
                </span>
              </div>
              <div className="col-12 col-sm-3 text-center text-dark m-auto">
                <i class="fa fa-users fs-1 fw-bolder"></i>
              </div>
            </div>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className="text-decoration-none py-4 col-12 col-sm-6"
          >
            <div className="row bg-warning bg-gradient rounded mx-auto px-4 py-2">
              <div className="col-12 col-sm-9 text-center">
                <span className="fs-3 fw-bolder text-white">Orders Total</span>
                <br />
                <span className="text-danger fw-bolder fs-2">
                  {orders.length}
                </span>
              </div>
              <div className="col-12 col-sm-3 text-center text-dark m-auto">
                <i class="fa fa-shopping-cart fs-1 fw-bolder"></i>
              </div>
            </div>
          </NavLink>

          <NavLink
            to="/admin/products"
            className="text-decoration-none py-4 col-12 col-sm-6"
          >
            <div className="row bg-warning bg-gradient rounded mx-auto px-4 py-2">
              <div className="col-12 col-sm-9 text-center">
                <span className="fs-3 fw-bolder text-white">
                  Products Total
                </span>
                <br />
                <span className="text-danger fw-bolder fs-2">
                  {products.length}
                </span>
              </div>
              <div className="col-12 col-sm-3 text-center text-dark m-auto">
                <i class="fa fa-clock fs-1 fw-bolder"></i>
              </div>
            </div>
          </NavLink>

          <NavLink
            to="/admin/producttypes"
            className="text-decoration-none py-4 col-12 col-sm-6"
          >
            <div className="row bg-warning bg-gradient rounded mx-auto px-4 py-2">
              <div className="col-12 col-sm-9 text-center">
                <span className="fs-3 fw-bolder text-white">
                  Product Types Total
                </span>
                <br />
                <span className="text-danger fw-bolder fs-2">
                  {productTypes.length}
                </span>
              </div>
              <div className="col-12 col-sm-3 text-center text-dark m-auto">
                <i class="fa fa-tasks fs-1 fw-bolder"></i>
              </div>
            </div>
          </NavLink>

          <NavLink
            to="/admin/vouchers"
            className="text-decoration-none py-4 col-12 col-sm-6"
          >
            <div className="row bg-warning bg-gradient rounded mx-auto px-4 py-2">
              <div className="col-12 col-sm-9 text-center">
                <span className="fs-3 fw-bolder text-white">
                  Vouchers Total
                </span>
                <br />
                <span className="text-danger fw-bolder fs-2">
                  {vouchers.length}
                </span>
              </div>
              <div className="col-12 col-sm-3 text-center text-dark m-auto">
                <i class="fa fa-ticket-alt fs-1 fw-bolder"></i>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </LayoutAdminPage>
  );
};

export default Dashboard;
