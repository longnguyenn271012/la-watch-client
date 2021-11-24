import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LayoutAdminPage from "../../../HOCs/LayoutAdminPage";
import {
  setVoucherAction,
  setVoucherDetailAction,
} from "../../../store/action/vouchers";

const Vouchers = (props) => {
  // const me = useSelector((state) => state.auth.auth);
  const voucherList = useSelector((state) => state.vouchers.voucherList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setVoucherAction());
  }, [dispatch]);

  const handleUpdateVoucher = (item) => {
    setVoucherDetailAction(dispatch, item);
  };

  const renderTableBody = () => {
    const tableBodyHTML = voucherList.map((item) => {
      return (
        <tr className="py-auto" style={{ fontSize: "16px" }}>
          <td className="text-center" style={{ width: "5%" }}>
            {voucherList.indexOf(item) + 1}
          </td>
          <td style={{ width: "20%" }}>
            <p className="fw-bold">{item.voucherName}</p>
          </td>
          <td style={{ width: "55%" }}>{item.description}</td>

          <td className="text-center fw-bolder" style={{ width: "10%" }}>
            {item.saleOff} %
          </td>
          <td style={{ width: "10%" }}>
            <div className="d-flex justify-content-center">
              <NavLink to={`/admin/vouchers/${item._id}`}>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleUpdateVoucher(item)}
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
            <span className="fs-2 fw-bolder">Vouchers</span>
          </div>
          <div className="col-9 row py-3 ">
            <div className="col-12 col-md-6 d-flex justify-content-end"></div>

            <div className="col-12 col-md-6 d-flex justify-content-end">
              <NavLink to="/admin/insertvoucher">
                <button className="btn btn-dark border border-warning border-2 p-2">
                  INSERT VOUCHER{" "}
                  <i class="fa fa-plus text-warning fs-4 ps-2"></i>
                </button>
              </NavLink>
            </div>
          </div>
        </div>

        <div className="table-responsive col-12 container-fluid">
          <table className="w-100 table table-hover table-bordered ">
            <thead className="table-light text-warning">
              <tr>
                <th>NO.</th>
                <th>VOUCHER NAME</th>
                <th>DESCRIPTION</th>
                <th>SALE OFF</th>
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

export default Vouchers;
