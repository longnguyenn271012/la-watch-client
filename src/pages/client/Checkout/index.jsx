import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseQuantity,
  deleteCartAcTion,
  increaseQuantity,
  orderProductAction,
} from "../../../store/action/cart";

import "./index.css";

const schema = yup.object().shape({
  recipientAddress: yup.string().required("Enter address !"),
  recipient: yup.string().required("Enter recipient !"),
  recipientPhoneNumber: yup
    .string()
    .required("Enter phone number !")
    .matches(/^[0-9]+$/g, "Enter phone number !"),
  payment: yup.string().required("Enter payment  !"),
});

const Checkout = (props) => {
  const cart = useSelector((state) => state.auth.auth.cart);
  const me = useSelector((state) => state.auth.auth);
  //Tinh tong tien
  var totalPrice = 0;
  cart.map((item) => {
    totalPrice += item.product.price * item.quantity;
  });

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
      recipientAddress: "",
      recipient: "",
      recipientPhoneNumber: "",
      payment: "",
    },
    validationSchema: schema,
    validateOnMount: true,
  });

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

  const handleSubmit = (event) => {
    event.preventDefault();

    setTouched({
      recipient: true,
      recipientAddress: true,
      recipientPhoneNumber: true,
      payment: true,
    });

    if (!isValid) {
      console.log("erroor");
      return;
    }

    const data = { ...values };
    console.log("dataaaa", data);

    dispatch(
      orderProductAction(me._id, data, () => {
        props.history.push(`/checkout/result`);
      })
    );
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6 pt-5 bg-light">
            <div className="text-center">
              <span className="fs-3 font-weight-bolder ">????N HA??NG</span>
              <hr />
            </div>
            <div className="row p-3">
              {cart.map((item, index) => {
                return (
                  <div className="row p-3 " key={index}>
                    <div className="col-2">
                      <img
                        src={item.product.productImage}
                        width="100mw"
                        alt=""
                      />
                    </div>
                    <div className="col-7">
                      <p>{item.product.productName}</p>
                      <button
                        onClick={() =>
                          handleDecreaseQuantity(me._id, item.product._id)
                        }
                        className="btn btn-info"
                      >
                        {" "}
                        -{" "}
                      </button>
                      <span className="mx-2"> {item.quantity} </span>
                      <button
                        onClick={() =>
                          handleIncreaseQuantity(me._id, item.product._id)
                        }
                        className="btn btn-info"
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>
                    <div className="col-3">
                      <p className="fs-5  fw-bolder">
                        {item.product.price * item.quantity} ???
                      </p>
                      <p className="text-decoration-line-through">
                        {item.product.price * item.quantity * 1.25} ???
                      </p>
                      <button
                        onClick={() =>
                          handleDeleteProduct(me._id, item.product._id)
                        }
                        className="btn btn-danger"
                      >
                        Xo??a
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <hr />
            {/* <div className="couponCode_root__3LEAg p-3 ">
              <div
                className="couponCode_mainRoot__1n0y3 row"
                autoComplete="off"
              >
                <input
                  className="coupon-code-input col-8"
                  type="text"
                  name="coupon_code"
                  placeholder="Nh???p m?? khuy???n m??i..."
                  autoComplete="false"
                  defaultValue
                />
                <button className="button-coupon col-4">??P D???NG</button>
              </div>
            </div> */}
            <hr />
            <div className="p-3">
              <div className="d-flex justify-content-between">
                <p>Tha??nh ti????n</p>
                <p className="fw-bolder">{totalPrice} ??</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Gia??m gia??</p>
                <p className="text-danger">0 ??</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Phi?? ship</p>
                <p>25.000 ??</p>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between p-3">
              <p className="fs-4 font-weight-bold">T????ng thanh toa??n</p>
              <p className="fs-4 fw-bolder">{totalPrice} ??</p>
            </div>
          </div>
          <div className="col-12 col-lg-6 text-center pt-5">
            <NavLink to="/" className="go-to-home ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={38}
                height={38}
                fill="currentColor"
                className="bi bi-house-door"
                viewBox="0 0 16 16"
              >
                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
              </svg>
            </NavLink>
            <p className="font-weight-bold fs-3 pt-4">TH??NG TIN KH??CH H??NG</p>
            <div>
              <div>
                <form>
                  <div className="editForm_formInputWrapper__pqlYx">
                    <span className="editForm_error__1wTqs">&nbsp;</span>
                    <input
                      id="email"
                      className="editForm_formInput__2Phfa"
                      type="email"
                      placeholder="Email"
                      required
                      value={me.email}
                    />
                  </div>
                  <div className="editForm_boxFormInput__2u-ad ">
                    <div className="editForm_formInputWrapper__pqlYx">
                      <span className="editForm_error__1wTqs">&nbsp;</span>
                      <input
                        id="recipient"
                        placeholder="Ng?????i nh???n"
                        value={values.recipient}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="editForm_formInput__2Phfa"
                      />
                      {touched.recipient && (
                        <p className="text-danger m-auto">{errors.recipient}</p>
                      )}
                    </div>
                    <div className="editForm_formInputWrapper__pqlYx">
                      <span className="editForm_error__1wTqs">&nbsp;</span>
                      <input
                        id="recipientPhoneNumber"
                        placeholder="S??? ??i???n tho???i ng?????i nh???n"
                        value={values.recipientPhoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="editForm_formInput__2Phfa"
                      />
                      {touched.recipientPhoneNumber && (
                        <p className="text-danger m-auto">
                          {errors.recipientPhoneNumber}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="editForm_formInputWrapper__pqlYx">
                    <span className="editForm_error__1wTqs">&nbsp;</span>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.recipientAddress}
                      id="recipientAddress"
                      placeholder="?????a ch??? ng?????i nh???n"
                      className="editForm_formInput__2Phfa"
                    />
                    {touched.recipientAddress && (
                      <p className="text-danger m-auto">
                        {errors.recipientAddress}
                      </p>
                    )}
                  </div>
                  <div className="editForm_formInputWrapper__pqlYx">
                    <span className="editForm_error__1wTqs">&nbsp;</span>
                    <select
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.payment}
                      id="payment"
                      className="editForm_formInput__2Phfa"
                    >
                      <option value="" disabled>
                        L????a cho??n
                      </option>
                      <option value="COD">COD</option>
                      <option value="BANKING">BANKING</option>
                    </select>
                  </div>
                  {/* Hi???n th??ng tin th??? ng??n h??ng n???u ch???n banking */}
                  {values.payment === "BANKING" ? (
                    <div className="editForm_formInputWrapper__pqlYx">
                      <hr />
                      <div className="p-3">
                        <div className="d-flex justify-content-between">
                          <p>Ng??n h??ng</p>
                          <p className="fw-bolder">Ti??n Phong Bank (TPB)</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p>Ch??? th???</p>
                          <p className="text-info">Nguy???n Th??nh Long</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p>S??? t??i kho???n</p>
                          <p>0413 2146 001</p>
                        </div>
                        <p className="p-3 sup-button">
                          *L??u ??: ????n h??ng c???a b???n s??? ???????c x??c nh???n khi Qu???n tr???
                          vi??n nh???n ???????c thanh to??n.
                        </p>
                      </div>

                      <hr />
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="mt-4">
                    <button
                      onClick={handleSubmit}
                      className="button-checkout btn btn-success"
                    >
                      ??????T HA??NG NGAY
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <p className="p-3 sup-button">
              *L??u ??: Curnon s??? li??n l???c l???i v???i b???n trong 24h (tr??? th??? 7, ch???
              nh???t v?? c??c ng??y l???) ????? x??c nh???n ????n h??ng.
            </p>
            <hr />
            <p className="copyright-checkout text-secondary font-weight-600">
              ?? 2021 - B???n quy???n c???a CTCP PH??T TRI???N S???N PH???M S??NG T???O VI???T
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
