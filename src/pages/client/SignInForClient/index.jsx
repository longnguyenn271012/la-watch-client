import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { signInAction } from "../../../store/action/auth";

const SignInForClient = (props) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("values sign in", values);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signInAction(formik.values, () => props.history.push("/")));
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="h-100" style={{ backgroundColor: "#9A616D" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
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
                          Sign in your account
                        </h5>
                        <div className="form-outline mb-4">
                          <input
                            name="userName"
                            onChange={formik.handleChange}
                            type="text"
                            placeholder="Username"
                            className="form-control form-control-lg"
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            name="password"
                            onChange={formik.handleChange}
                            type="password"
                            placeholder="Password"
                            className="form-control form-control-lg"
                          />
                        </div>
                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                        {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Don't have an account?{" "}
                          <NavLink to="/signup" style={{ color: "#393f81" }}>
                            Register here
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

export default SignInForClient;
