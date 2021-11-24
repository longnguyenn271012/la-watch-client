import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";


const createRoute = (condition) => {
  return class extends Component {
    render() {
      const { path, component: RouteComp, redirectPath } = this.props;
      return (
        <Route
          path={path}
          render={(routerProps) => {
            if (condition()) {
              return <RouteComp {...routerProps} />;
            }
            return <Redirect to={redirectPath} />;
          }}
        />
      );
    }
  };
};
// khi đăng nhập rồi thì chuyển về home
export const AuthRoute = createRoute(() => !localStorage.getItem("USERID"));
//khi chưa đăng nhập thì không cho truy cập tới path=""
export const PrivateRoute = createRoute(() => localStorage.getItem("USERID"));
