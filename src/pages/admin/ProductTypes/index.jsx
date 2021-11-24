import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LayoutAdminPage from "../../../HOCs/LayoutAdminPage";
import {
  setProductTypeAction,
  setProductTypeDetail,
} from "../../../store/action/productTypes";

const ProductTypes = () => {
  const [keyword, setKeyword] = useState("");

  const me = useSelector((state) => state.auth.auth);
  const productTypeList = useSelector(
    (state) => state.productTypes.productTypeList
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setProductTypeAction(dispatch, keyword);
  }, [dispatch, keyword]);

  const { handleBlur, handleChange, values } = useFormik({
    initialValues: {
      keyword: "",
    },
    validateOnMount: true,
  });

  const searchProductTypes = () => {
    setKeyword(values.keyword);
    console.log(values.keyword, keyword);
  };

  const handleUpdateProductType = (item) => {
    setProductTypeDetail(dispatch, item);
  };

  const renderTableBody = () => {
    const tableBodyHTML = productTypeList.map((item) => {
      return (
        <tr className="py-auto" style={{ fontSize: "16px" }}>
          <td className="text-center" style={{ width: "5%" }}>
            {productTypeList.indexOf(item) + 1}
          </td>
          <td style={{ width: "20%" }}>
            <p className="fw-bold">{item.productTypeName}</p>
          </td>
          <td style={{ width: "55%" }}>{item.description}</td>

          <td style={{ width: "10%" }}>
            <div className="d-flex justify-content-center">
              <NavLink to={`/admin/producttypes/${item._id}`}>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleUpdateProductType(item)}
                >
                  <i class="fa fa-edit"></i>
                </button>
              </NavLink>
            </div>
          </td>
        </tr>
      );
    });

    return tableBodyHTML;
  };
  return (
    <LayoutAdminPage>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-3 py-3">
            <span className="fs-2 fw-bolder">Product Types</span>
          </div>
          <div className="col-9 row py-3 ">
            <div className="col-12 col-md-6 d-flex justify-content-end">
              <input
                id="keyword"
                className="w-100 text-dark bg-light border border-warning border-2 px-2"
                placeholder="Enter Keyword"
                value={values.keyword}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              <button
                className="btn btn-dark border border-warning border-2 ms-2"
                onClick={() => searchProductTypes()}
              >
                <i class="fa fa-search"></i>
              </button>
            </div>

            <div className="col-12 col-md-6 d-flex justify-content-end">
              <NavLink to="/admin/insertproducttype">
                <button className="btn btn-dark border border-warning border-2 p-2">
                  INSERT PRODUCT TYPE
                  <i class="fa fa-plus text-warning fs-4 ps-2"></i>
                </button>
              </NavLink>
            </div>
          </div>
        </div>

        <div className="table-responsive col-12 container-fluid">
          <table className="w-100 table table-hover table-bordered ">
            <thead className="table-light text-warning">
              <tr>
                <th>NO.</th>
                <th>PRODUCT TYPE NAME</th>
                <th>DESCRIPTION</th>
                <th className="text-center">DETAIL</th>
              </tr>
            </thead>
            <tbody>{renderTableBody()}</tbody>
          </table>
        </div>
      </div>
    </LayoutAdminPage>
  );
};

export default ProductTypes;
