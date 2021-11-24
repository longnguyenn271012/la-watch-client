import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ExportCSV } from "../../../ExportCSV";
import LayoutAdminPage from "../../../HOCs/LayoutAdminPage";
import {
  setProductAction,
  setProductDetailAction,
} from "../../../store/action/products";
import { setProductTypeAction } from "../../../store/action/productTypes";

const Products = (props) => {
  const [keyword, setKeyword] = useState("");
  // const [pageNumber, setPageNumber] = useState(1);

  const me = useSelector((state) => state.auth.auth);
  const productList = useSelector((state) => state.products.productList) || [];
  const productTypeList =
    useSelector((state) => state.productTypes.productTypeList) || [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProductAction(keyword));
    setProductTypeAction(dispatch);
  }, [dispatch, keyword]);

  const { handleBlur, handleChange, values } = useFormik({
    initialValues: {
      keyword: "",
    },
    validateOnMount: true,
  });

  const searchProducts = () => {
    setKeyword(values.keyword);
    console.log(values.keyword, keyword);
  };

  const handleUpdateProduct = (item) => {
    setProductDetailAction(dispatch, item);
  };

  const handleSetProductType = (productTypeId) => {
    const foundedProductType =
      productTypeList.find((item) => {
        return item._id === productTypeId;
      }) || [];

    return <span>{foundedProductType.productTypeName}</span>;
  };

  const renderTableBody = () => {
    const tableBodyHTML = productList.map((item) => {
      // Them index vao max de xu ly phan trang
      return (
        <tr className="py-auto" style={{ fontSize: "16px" }}>
          <td style={{ width: "5%" }}>{productList.indexOf(item) + 1}</td>
          <td style={{ width: "10%" }}>
            <img src={item.productImage[0]} className="w-100"></img>
          </td>

          <td style={{ width: "30%" }}>
            <p className="fw-bold">{item.productName}</p>
          </td>
          <td style={{ width: "20%" }}>
            {handleSetProductType(item.productTypeId)}
          </td>

          <td style={{ width: "15%" }}>{item.price}</td>
          <td style={{ width: "10%" }}>{item.quantity}</td>
          <td style={{ width: "10%" }}>
            <div className="d-flex justify-content-center">
              <NavLink to={`/admin/products/${item._id}`}>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleUpdateProduct(item)}
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
            <span className="fs-2 fw-bolder">Products</span>
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
                type="button"
                className="btn btn-dark border border-warning border-2 ms-2"
                onClick={() => searchProducts()}
              >
                <i class="fa fa-search"></i>
              </button>
            </div>

            <div className="col-12 col-md-6 d-flex justify-content-end">
              <NavLink to="/admin/insertproduct">
                <button className="btn btn-dark border border-warning border-2 p-2">
                  INSERT PRODUCT
                  <i class="fa fa-plus text-warning fs-4 ps-2"></i>
                </button>
              </NavLink>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 mb-4 me-5 d-flex justify-content-end">
            <ExportCSV
              csvData={productList}
              fileName={`report-products-${Date()}`}
            />
          </div>
        </div>

        <div className="table-responsive col-12 container-fluid">
          <table className="w-100 table table-hover table-bordered ">
            <thead className="table-light text-warning">
              <tr>
                <th>NO.</th>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>TYPE</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th className="text-center">DETAIL</th>
              </tr>
            </thead>
            <tbody>{renderTableBody()}</tbody>
          </table>
        </div>

        {/* <div className="paging row mb-3">
          <div className="paging__bar col-12 d-flex justify-content-end">
            {pageNumber === 1 ? (
              <button disabled className="btn btn-dark px-3">
                <i class="fa fa-ban"></i>
              </button>
            ) : (
              <button
                onClick={() => setPageNumber(pageNumber - 1)}
                className="btn btn-dark px-3"
              >
                <i class="fa fa-angle-left"></i>
              </button>
            )}
            <button className="btn btn-dark border border-warning px-3">
              {pageNumber}
            </button>
            <button
              onClick={() => setPageNumber(pageNumber + 1)}
              className="btn btn-dark px-3"
            >
              <i class="fa fa-angle-right"></i>
            </button>
          </div>
        </div> */}
      </div>
    </LayoutAdminPage>
  );
};

export default Products;
