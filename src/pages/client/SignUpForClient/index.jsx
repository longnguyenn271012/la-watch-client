import React from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { signUpAction } from "../../../store/action/auth";

const SignUpForClient = (props) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      userName: "",
      password: "",
      phoneNumber: "",
      email: "",
      address: "",
    },
    onSubmit: (values) => {
      console.log("values sign up", values);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signUpAction(formik.values));
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="h-100" style={{ backgroundColor: "#9A616D" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5  d-none d-md-block">
                    <img
                      src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/img1.jpg"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <div>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          />
                          <span className="h1 fw-bold mb-0">Watch Shop</span>
                        </div>
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: 1 }}
                        >
                          Sign up an account
                        </h5>
                        <div className="form-outline mb-4">
                          <input
                            name="fullName"
                            onChange={formik.handleChange}
                            type="text"
                            placeholder="Full name"
                            className="form-control form-control-lg"
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            name="userName"
                            onChange={formik.handleChange}
                            type="text"
                            placeholder="UserName"
                            className="form-control form-control-lg"
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            name="password"
                            onChange={formik.handleChange}
                            type="password"
                            id="form2Example27"
                            placeholder="Password"
                            className="form-control form-control-lg"
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            name="phoneNumber"
                            onChange={formik.handleChange}
                            type="text"
                            placeholder="Phone number"
                            className="form-control form-control-lg"
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            name="email"
                            onChange={formik.handleChange}
                            type="email"
                            placeholder="Email"
                            className="form-control form-control-lg"
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            name="address"
                            onChange={formik.handleChange}
                            type="text"
                            placeholder="Adress"
                            className="form-control form-control-lg"
                          />
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                          >
                            Sign up
                          </button>
                        </div>

                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          You had an account?{" "}
                          <NavLink to="/signin" style={{ color: "#393f81" }}>
                            Sign in here
                          </NavLink>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
};

export default SignUpForClient;
