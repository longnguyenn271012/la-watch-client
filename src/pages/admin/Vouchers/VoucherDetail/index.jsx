import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import LayoutAdminPage from "../../../../HOCs/LayoutAdminPage";
import {  useSelector } from "react-redux";
import {
  deleteVoucherAction,
  updateVoucherAction,
} from "../../../../store/action/vouchers";

const schema = yup.object().shape({
  voucherName: yup.string().required("Enter voucher name !"),
  description: yup.string().required("Enter description !"),
  saleOff: yup
    .string()
    .required("Enter sale off number !")
    .matches(/^[1-9]$|^[1-9][0-9]$|^(100)$/g, "Enter sale off from 1-100 !"),
});

const VoucherDetail = (props) => {
  // const voucherDetail = { voucherName: "", description: "", saleOff: 0 };
  const voucherDetail =
    useSelector((state) => state.vouchers.voucherDetail) || {};

  const _id = props.match.params._id;

  const {
    isValid,
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    setTouched,
  } = useFormik({
    initialValues: {
      voucherName: voucherDetail.voucherName,
      description: voucherDetail.description,
      saleOff: voucherDetail.saleOff,
    },
    validationSchema: schema,
    validateOnMount: true,
  });

  const handleUpdateVoucher = (event) => {
    event.preventDefault();

    setTouched({
      voucherName: true,
      description: true,
      saleOff: true,
    });

    if (!isValid) return;

    const data = { ...values };

    updateVoucherAction(_id, data, () => props.history.push("/admin/vouchers"));
  };

  const handleDeleteVoucher = () => {
    deleteVoucherAction(_id, () => props.history.push("/admin/vouchers"));
  };

  return (
    <LayoutAdminPage>
      <div className="container-fluid">
        <div className="row py-3">
          <span className="fs-2 fw-bolder">Voucher Detail</span>
        </div>
        <div className="row my-3">
          <form className="col-12 row">
            <div className="row col-12 col-md-6">
              <div className="col-12 my-2">
                <label className=" mb-2">Voucher Id: </label>
                <input
                  id="_id"
                  className="w-100  border border-warning p-2 "
                  value={_id}
                  disabled
                ></input>
              </div>
              <div className="col-12 my-2">
                <label className=" mb-2">Voucher Name: </label>
                <input
                  id="voucherName"
                  className="w-100  border border-warning p-2 "
                  value={values.voucherName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></input>
                {touched.voucherName && (
                  <p className="text-danger m-auto">{errors.voucherName}</p>
                )}
              </div>

              <div className="col-12  my-2">
                <label className=" mb-2">Sale Off: </label>
                <input
                  id="saleOff"
                  className="w-100  border border-warning p-2 "
                  value={values.saleOff}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></input>
                {touched.saleOff && (
                  <p className="text-danger">{errors.saleOff}</p>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6 my-2">
              <label className=" mb-2">Description: </label>
              <textarea
                rows="10"
                cols="10"
                id="description"
                className="w-100  border border-warning p-2 "
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              ></textarea>
              {touched.description && (
                <p className="text-danger m-auto">{errors.description}</p>
              )}
            </div>

            <div className="row">
              <button
                type="button"
                onClick={handleUpdateVoucher}
                className="col-3 btn btn-primary  border-2 p-2 mx-2 my-5"
              >
                Update Voucher
                <i class="ms-4 fa fa-edit"></i>
              </button>
              <button
                type="button"
                className="col-3 btn btn-danger  border-2 p-2 mx-2 my-5"
                onClick={() => handleDeleteVoucher()}
              >
                Delete Voucher
                <i class="ms-4 fa fa-trash"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutAdminPage>
  );
};

export default VoucherDetail;
