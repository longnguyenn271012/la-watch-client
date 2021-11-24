import React from "react";
import Sidebar from "../../components/Sidebar";

const LayoutAdminPage = (props) => {
  return (
    <div className="container-fluid h-100">
      <div className="row">
        <div className="col-12 col-lg-2 text-white bg-dark">
          <Sidebar />
        </div>
        <div className="col-12 col-lg-10 bg-white">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default LayoutAdminPage;
