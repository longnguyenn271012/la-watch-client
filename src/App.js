import React, { useEffect } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import SignInForAdmin from "./pages/admin/SignInForAdmin";
import Users from "./pages/admin/Users";
import Cart from "./pages/client/Cart";
import Home from "./pages/client/Home";
import SignInForClient from "./pages/client/SignInForClient";
import SignUpForClient from "./pages/client/SignUpForClient";
import ProductDetail from "./pages/client/ProductDetail";
import InsertUser from "./pages/admin/Users/InsertUser";
import ProductDetailAdmin from "./pages/admin/Products/ProductDetailAdmin";
import InsertProduct from "./pages/admin/Products/InsertProduct";

import Checkout from "./pages/client/Checkout";

import UserDetail from "./pages/admin/Users/UserDetail";
import Vouchers from "./pages/admin/Vouchers";
import VoucherDetail from "./pages/admin/Vouchers/VoucherDetail";
import InsertVoucher from "./pages/admin/Vouchers/InsertVoucher";
import { useDispatch } from "react-redux";
import { fetchMe } from "./store/action/auth";
import { AuthRoute, PrivateRoute } from "./HOCs/Route";
import Result from "./pages/client/Result";
import Profile from "./pages/client/Profile";

import Orders from "./pages/admin/Orders";
import ProductTypes from "./pages/admin/ProductTypes";
import InsertProductType from "./pages/admin/ProductTypes/InsertProductType";
import ProductTypeDetail from "./pages/admin/ProductTypes/ProductTypeDetail";
import OrderDetail from "./pages/admin/Orders/OrderDetail";

const App = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const userId = localStorage.getItem("USERID");
  //   if (userId) dispatch(fetchMe(userId));
  // }, [dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        {/* Client Route */}
        <Route exact path="/" component={Home} />
        <Route path="/product/:id" component={ProductDetail} />
        {/* <Route path="/signin" component={SignInForClient} />
        <Route path="/signup" component={SignUpForClient} /> */}
        <AuthRoute
          path="/signin"
          component={SignInForClient}
          redirectPath="/"
        />
        <AuthRoute
          path="/signup"
          component={SignUpForClient}
          redirectPath="/"
        />

        {/* <Route path="/cart" component={Cart} /> */}
        <PrivateRoute path="/cart" component={Cart} redirectPath="/signin" />
        <PrivateRoute
          path="/checkout/result"
          component={Result}
          redirectPath="/signin"
        />
        {/* <Route path="/checkout" component={Checkout}/> */}
        {/* <PrivateRoute path="/checkout" component={Checkout} redirectPath="/signin" /> */}
        <PrivateRoute
          path="/profile"
          component={Profile}
          redirectPath="/signin"
        />
        <PrivateRoute
          path="/checkout"
          component={Checkout}
          redirectPath="/signin"
        />
        {/* Admin Route */}
        <PrivateRoute
          exact
          path="/admin"
          component={Dashboard}
          redirectPath="/admin/signin"
        />
        <AuthRoute
          path="/admin/signin"
          component={SignInForAdmin}
          redirectPath="/admin"
        />
        {/* <Route path="/admin/signin" component={SignInForAdmin} /> */}
        <PrivateRoute
          exact
          path="/admin/users"
          component={Users}
          redirectPath="/admin/signin"
        />
        <PrivateRoute
          path="/admin/users/:_id"
          component={UserDetail}
          redirectPath="/admin/signin"
        />
        <PrivateRoute
          path="/admin/insertuser"
          component={InsertUser}
          redirectPath="/admin/signin"
        />

        <PrivateRoute
          exact
          path="/admin/producttypes"
          component={ProductTypes}
          redirectPath="/admin/signin"
        />
        <PrivateRoute
          path="/admin/producttypes/:_id"
          component={ProductTypeDetail}
          redirectPath="/admin/signin"
        />
        <PrivateRoute
          path="/admin/insertproducttype"
          component={InsertProductType}
          redirectPath="/admin/signin"
        />

        <PrivateRoute
          exact
          path="/admin/products"
          component={Products}
          redirectPath="/admin/signin"
        />
        <PrivateRoute
          path="/admin/products/:_id"
          component={ProductDetailAdmin}
          redirectPath="/admin/signin"
        />
        <PrivateRoute
          path="/admin/insertproduct"
          component={InsertProduct}
          redirectPath="/admin/signin"
        />

        <PrivateRoute
          exact
          path="/admin/orders"
          component={Orders}
          redirectPath="/admin/signin"
        />
        <PrivateRoute
          path="/admin/orders/:_id"
          component={OrderDetail}
          redirectPath="/admin/signin"
        />
        {/* <Route path="/admin/insertproduct" component={InsertProduct} /> */}

        <PrivateRoute
          exact
          path="/admin/vouchers"
          component={Vouchers}
          redirectPath="/admin/signin"
        />
        <PrivateRoute
          path="/admin/vouchers/:_id"
          component={VoucherDetail}
          redirectPath="/admin/signin"
        />
        <PrivateRoute
          path="/admin/insertvoucher"
          component={InsertVoucher}
          redirectPath="/admin/signin"
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
