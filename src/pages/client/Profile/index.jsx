import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutClientPage from "../../../HOCs/LayoutClientPage";
import { orderHistoryAction } from "../../../store/action/cart";
import { deleteOrderAction } from "../../../store/action/orders";
import "./index.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { updateUserAction } from "../../../store/action/users";

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

const Profile = (props) => {
  const [isOpenEditedPage, setIsOpenEditedPage] = useState(false);

  const me = useSelector((state) => state.auth.auth) || {};

  const orderHistory = useSelector((state) => state.cart.orderHistory);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderHistoryAction(me._id));
  }, [dispatch]);

  const handleDeleteOrder = (_id) => {
    deleteOrderAction(_id, me._id, dispatch);
  };

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
      userName: me.userName,
      password: me.password,
      email: me.email,
      phoneNumber: me.phoneNumber,
      address: me.address,
      userType: me.userType,
      fullName: me.fullName,
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

    updateUserAction(me._id, updateUser, () => props.history.push("/"));
  };

  return (
    <LayoutClientPage>
      <div className="container">
        <div className="row pt-5">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar6.png"
                    alt="Admin"
                    className="rounded-circle p-1 bg-primary"
                    width={110}
                  />
                  <div className="mt-3">
                    <h4>{me.fullName}</h4>
                    <p className="text-secondary mb-1">
                      User Name: {me.userName}
                    </p>
                    <p className="text-secondary mb-1">
                      Phone Number: {me.phoneNumber}
                    </p>
                    <p className="text-muted font-size-sm">
                      Address: {me.address}
                    </p>
                    <button
                      className="btn btn-outline-primary mx-2"
                      onClick={() => setIsOpenEditedPage(true)}
                    >
                      EDIT
                    </button>
                    <button
                      className="btn btn-outline-danger mx-2"
                      onClick={() => setIsOpenEditedPage(false)}
                    >
                      ORDERS
                    </button>
                  </div>
                </div>
                <hr className="my-4" />
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-globe me-2 icon-inline"
                      >
                        <circle cx={12} cy={12} r={10} />
                        <line x1={2} y1={12} x2={22} y2={12} />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      Email
                    </h6>
                    <span className="text-secondary">{me.email}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-github me-2 icon-inline"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                      Github
                    </h6>
                    <span className="text-secondary">bootdey</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-twitter me-2 icon-inline text-info"
                      >
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                      </svg>
                      Twitter
                    </h6>
                    <span className="text-secondary">@bootdey</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-instagram me-2 icon-inline text-danger"
                      >
                        <rect
                          x={2}
                          y={2}
                          width={20}
                          height={20}
                          rx={5}
                          ry={5}
                        />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                      Instagram
                    </h6>
                    <span className="text-secondary">bootdey</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-facebook me-2 icon-inline text-primary"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                      Facebook
                    </h6>
                    <span className="text-secondary">bootdey</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-8">
            {isOpenEditedPage ? (
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar6.png"
                    alt="Admin"
                    className="rounded-circle p-1 bg-primary"
                    width={110}
                  />
                </div>
                <hr className="my-4" />
                <form className="col-12 row">
                  <div className="col-12 col-md-6 my-2">
                    <label className=" mb-2">User Id: </label>
                    <input
                      id="_id"
                      className="w-100  border border-primary p-2 "
                      value={me._id}
                      disabled
                    ></input>
                  </div>
                  <div className="col-12 col-md-6 my-2">
                    <label className=" mb-2">Fullname: </label>
                    <input
                      id="fullName"
                      className="w-100  border border-primary p-2 "
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
                      className="w-100  border border-primary p-2 "
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
                      className="w-100  border border-primary p-2 "
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
                      className=" w-100  border border-primary p-2 "
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
                      className=" w-100  border border-primary p-2 "
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></input>
                    {touched.email && (
                      <p className="text-danger">{errors.email}</p>
                    )}
                  </div>
                  <div className="col-12 my-2">
                    <label className=" mb-2">Address: </label>
                    <input
                      id="address"
                      className=" w-100  border border-primary p-2 "
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></input>
                    {touched.address && (
                      <p className="text-danger">{errors.address}</p>
                    )}
                  </div>
                  <div className="row">
                    <button
                      onClick={handleUpdateUser}
                      className="col-3 btn btn-primary  border-2 p-2 mx-2 my-5"
                    >
                      Update User
                      <i class="ms-4 fa fa-edit"></i>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <h2>LICH SU DON HANG</h2>
                <div className="row p-3">
                  {orderHistory.map((item, index) => {
                    return (
                      <div
                        className=" row order-history-item my-2 p-2"
                        key={index}
                      >
                        <div className="col-4 ">
                          <p>Mã đơn : {item._id}</p>

                          <p className="text-danger">
                            Trạng thái : {item.orderStatus}
                          </p>
                          <p>Người nhận : {item.recipient} </p>
                          <p>Số điện thoại : {item.recipientPhoneNumber}</p>
                          <p>Địa chỉ người nhận : {item.recipientAddress}</p>
                          <div className="">
                            {item.orderStatus === "Confirmed" ? (
                              <button
                                type="button"
                                className="btn btn-danger"
                                disabled
                              >
                                CHỜ NHẬN HÀNG
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleDeleteOrder(item._id)}
                              >
                                HỦY ĐƠN HÀNG
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="col-8">
                          {item.cart.map((item, index) => {
                            return (
                              <div className="" key={index}>
                                <div className="row p-3 ">
                                  <div className="col-3">
                                    <img
                                      src={item.product.productImage}
                                      width="100mw"
                                      alt=""
                                    />
                                  </div>
                                  <div className="col-4">
                                    <p>{item.product.productName}</p>
                                    <span className="mx-2">
                                      {item.quantity}
                                    </span>
                                  </div>
                                  <div className="col-3">
                                    <p>
                                      {item.product.price * item.quantity} ₫
                                    </p>
                                    <p className="text-decoration-line-through">
                                      {item.product.price *
                                        item.quantity *
                                        1.25}
                                      ₫
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutClientPage>
  );
};

export default Profile;
