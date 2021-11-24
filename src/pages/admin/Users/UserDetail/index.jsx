import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import LayoutAdminPage from "../../../../HOCs/LayoutAdminPage";
import {
  deleteUserAction,
  updateUserAction,
} from "../../../../store/action/users";

const schema = yup.object().shape({
  userName: yup.string().required("Enter username !"),
  password: yup.string().required("Enter password !"),
  email: yup.string().required("Enter email !").email("Enter email !"),
  phoneNumber: yup
    .string()
    .required("Enter phone number !")
    .matches(/^[0-9]+$/g, "Enter phone number !"),
  address: yup.string().required("Enter address !"),
  userType: yup.string().required("Enter type of user !"),
  fullName: yup.string().required("Enter fullname !"),
});

const UserDetail = (props) => {
  const userDetail = useSelector((state) => state.users.userDetail) || {};

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
      // _id: userDetail._id,
      userName: userDetail.userName,
      password: userDetail.password,
      email: userDetail.email,
      phoneNumber: userDetail.phoneNumber,
      address: userDetail.address,
      userType: userDetail.userType,
      fullName: userDetail.fullName,
    },
    validationSchema: schema,
    validateOnMount: true,
  });

  const handleUpdateUser = (event) => {
    event.preventDefault();

    setTouched({
      // _id: true,
      userName: true,
      password: true,
      email: true,
      phoneNumber: true,
      address: true,
      userType: true,
      fullName: true,
    });

    if (!isValid) return;

    const updateUser = { ...values };

    updateUserAction(_id, updateUser, () => props.history.push("/admin/users"));
  };

  const handleDeleteUser = () => {
    deleteUserAction(_id, props);
  };

  return (
    <LayoutAdminPage>
      <div className="container-fluid">
        <div className="row py-3">
          <span className="fs-2 fw-bolder">Update user</span>
        </div>
        <div className="row my-3">
          <form className="col-12 row">
            <div className="col-12 col-md-6 my-2">
              <label className=" mb-2">User Id: </label>
              <input
                id="_id"
                className="w-100  border border-warning p-2 "
                value={_id}
                disabled
              ></input>
            </div>
            <div className="col-12 col-md-6 my-2">
              <label className=" mb-2">Fullname: </label>
              <input
                id="fullName"
                className="w-100  border border-warning p-2 "
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.fullName && (
                <p className="text-danger m-auto">{errors.fullName}</p>
              )}
            </div>
            <div className="col-12 col-md-6 my-2">
              <label className=" mb-2">Username: </label>
              <input
                id="userName"
                className="w-100  border border-warning p-2 "
                value={values.userName}
                disabled
              ></input>
              {touched.userName && (
                <p className="text-danger m-auto">{errors.userName}</p>
              )}
            </div>
            <div className="col-12 col-md-6 my-2">
              <label className=" mb-2">Password: </label>
              <input
                id="password"
                className="w-100  border border-warning p-2 "
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.password && (
                <p className="text-danger">{errors.password}</p>
              )}
            </div>

            <div className="col-12 col-md-6 my-2">
              <label className=" mb-2">Phone Number: </label>
              <input
                id="phoneNumber"
                className=" w-100  border border-warning p-2 "
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.phoneNumber && (
                <p className="text-danger">{errors.phoneNumber}</p>
              )}
            </div>
            <div className="col-12 col-md-6 my-2">
              <label className=" mb-2">Email: </label>
              <input
                id="email"
                className=" w-100  border border-warning p-2 "
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.email && <p className="text-danger">{errors.email}</p>}
            </div>
            <div className="col-12 col-md-6 my-2">
              <label className=" mb-2">Address: </label>
              <input
                id="address"
                className=" w-100  border border-warning p-2 "
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.address && (
                <p className="text-danger">{errors.address}</p>
              )}
            </div>
            <div className="col-12 col-md-6 my-2 ">
              <label className="">Type Of User: </label>
              <select
                id="userType"
                value={values.userType}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-100 p-2 border border-warning"
              >
                <option value="Customer">Customer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="row">
              <button
                onClick={handleUpdateUser}
                className="col-3 btn btn-primary  border-2 p-2 mx-2 my-5"
              >
                Update User
                <i class="ms-4 fa fa-edit"></i>
              </button>
              <button
                type="button"
                className=" btn btn-danger  border-2 col-3 p-2 mx-2 my-5"
                onClick={() => handleDeleteUser()}
              >
                Delete User
                <i class="ms-4 fa fa-trash"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutAdminPage>
  );
};

export default UserDetail;
