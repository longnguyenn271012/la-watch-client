import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ExportCSV } from "../../../ExportCSV";
import LayoutAdminPage from "../../../HOCs/LayoutAdminPage";
import {
  setOrderAction,
  setOrderDetailAction,
} from "../../../store/action/orders";

const Orders = () => {
  const me = useSelector((state) => state.auth.auth);
  const orderList = useSelector((state) => state.orders.orderList);

  const dispatch = useDispatch();

  useEffect(() => {
    // if (!me) props.history.push("/admin/signin");
    dispatch(setOrderAction());
  }, [dispatch]);

  const handleUpdateOrder = (item) => {
    setOrderDetailAction(dispatch, item);
  };

  const renderTableBody = () => {
    const tableBodyHTML = orderList.map((item) => {
      return (
        <tr className="py-auto" style={{ fontSize: "16px" }}>
          <td style={{ width: "5%" }}>{orderList.indexOf(item) + 1}</td>
          <td style={{ width: "10%" }}>
            <p className="fw-bold">{item.recipient}</p>
          </td>
          <td style={{ width: "10%" }}>{item.recipient}</td>

          <td style={{ width: "20%" }}>{item.recipientAddress}</td>
          <td style={{ width: "10%" }}>{item.recipientPhoneNumber}</td>
          <td style={{ width: "10%" }}>{item.createdAt.substr(0, 10)}</td>
          <td style={{ width: "10%" }}>{item.payment}</td>
          <td className="fw-bolder" style={{ width: "10%" }}>
            {item.totalPrice}
          </td>
          {item.orderStatus === "Confirmed" ? (
            <td className="text-success" style={{ width: "10%" }}>
              {item.orderStatus}
            </td>
          ) : (
            <td className="text-danger" style={{ width: "10%" }}>
              {item.orderStatus}
            </td>
          )}
          <td style={{ width: "5%" }}>
            <div className="d-flex justify-content-center">
              <NavLink to={`/admin/orders/${item._id}`}>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleUpdateOrder(item)}
                >
                  <i class="fa fa-edit"></i>
                </button>
              </NavLink>
            </div>
          </td>
        </tr>
      );
    });

    return tableBodyHTML;
  };
  return (
    <LayoutAdminPage>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-3 py-3">
            <span className="fs-2 fw-bolder">Orders</span>
          </div>
          <div className="col-9 row py-3 ">
            <div className="col-12 col-md-6 d-flex justify-content-end">
              {/* <input
              id="keyword"
              className="w-100 text-white bg-dark border border-warning border-2 px-2"
              placeholder="Enter Keyword"
              value={values.keyword}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>

            <button
              className="btn btn-dark border border-warning border-2 ms-2"
              onClick={() => searchUsers()}
            >
              <i class="fa fa-search"></i>
            </button> */}
            </div>

            <div className="col-12 col-md-6 d-flex justify-content-end">
              <ExportCSV
                csvData={orderList}
                fileName={`report-orders-${Date()}`}
              />
            </div>
          </div>
        </div>

        <div className="table-responsive col-12 container-fluid">
          <table className="w-100 table table-hover table-bordered ">
            <thead className="table-light text-warning">
              <tr>
                <th>NO.</th>
                <th>USERNAME</th>
                <th>RECIPIENT</th>
                <th>RECIPIENT ADDRESS</th>
                <th>RECIPIENT PHONE</th>
                <th>CREATE AT</th>
                <th>PAYMENT</th>
                <th>TOTAL PRICE</th>
                <th>STATUS</th>
                <th className="text-center">DETAIL</th>
              </tr>
            </thead>
            <tbody>{renderTableBody()}</tbody>
          </table>
        </div>
      </div>
    </LayoutAdminPage>
  );
};

export default Orders;
