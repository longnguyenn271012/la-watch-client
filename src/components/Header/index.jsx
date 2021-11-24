import React from "react";
import { useSelector } from "react-redux";
// import {Navbar, Nav, Form, FormControl, Button} from "react-bootstrap"
import { NavLink } from "react-router-dom";
import Cart from "../../pages/client/Cart";
import "./header.css";

const Header = (props) => {
  const me = useSelector((state) => state.auth.auth);

  // const cart = me.cart || [];

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        zIndex: 99,
        marginBottom: 100,
      }}
      className="header-full"
    >
      <nav className="navbar navbar-expand-lg navbar-light py-3 container">
        <NavLink to="/">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/watch-shop-57ae8.appspot.com/o/BRAND-LOGO%2Flogo-brand-remove-bg.png?alt=media&token=312a9782-9568-4d16-ac8a-316864b796dc"
            className="w-25"
            alt="logo"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto ">
            <li className="nav-item active">
              <NavLink to="/" className="nav-link text-light">
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/" className="nav-link text-light">
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/" className="nav-link text-light">
                News
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center ml-3">
          <NavLink to="/cart">
            <p className="text-white mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={32}
                fill="currentColor"
                className="bi bi-cart-check ml-2 "
                viewBox="0 0 16 16"
              >
                <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
            </p>
          </NavLink>
          {me ? (
            <div>
              <span className="text-white ml-3">
                Hello, <NavLink to="/profile">{me.fullName}</NavLink>
              </span>

              <NavLink to="/">
                <button
                  onClick={() => {
                    localStorage.removeItem("USERID");
                    window.location.reload();
                  }}
                  className="ml-5 bg-blue-500 p-2"
                >
                  Đăng xuất
                </button>
              </NavLink>
            </div>
          ) : (
            <div className="d-flex">
              <NavLink
                to="/signin"
                className="nav-link text-light"
                activeClassName="active"
              >
                Sign in
              </NavLink>
              <NavLink
                to="/signup"
                className="nav-link text-light"
                activeClassName="active"
              >
                Sign up
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
