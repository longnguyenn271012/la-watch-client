import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import LayoutAdminPage from "../../../../HOCs/LayoutAdminPage";
import { useSelector } from "react-redux";
import {
  deleteProductType,
  updateProductType,
} from "../../../../store/action/productTypes";

const schema = yup.object().shape({
  productTypeName: yup.string().required("Enter product type name !"),
  description: yup.string().required("Enter description !"),
});

const ProductTypeDetail = (props) => {
  const productTypeDetail =
    useSelector((state) => state.productTypes.productTypeDetail) || {};

  const _id = props.match.params._id;

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
      productTypeName: productTypeDetail.productTypeName,
      description: productTypeDetail.description,
    },
    validationSchema: schema,
    validateOnMount: true,
  });

  const handleUpdateProductType = (event) => {
    event.preventDefault();

    setTouched({
      productTypeName: true,
      description: true,
    });

    if (!isValid) return;

    const data = { ...values };

    updateProductType(_id, data, () =>
      props.history.push("/admin/producttypes")
    );
  };

  const handleDeleteProductType = () => {
    deleteProductType(_id, props);
  };

  return (
    <LayoutAdminPage>
      <div className="container-fluid">
        <div className="row py-3">
          <span className="fs-2 fw-bolder">Product Type Detail</span>
        </div>
        <div className="row my-3">
          <form className="col-12 row">
            <div className="row col-12 col-md-6">
              <div className="col-12 my-2">
                <label className=" mb-2">Product Type Id: </label>
                <input
                  id="_id"
                  className="w-100  border border-warning p-2 "
                  value={_id}
                  disabled
                ></input>
              </div>
              <div className="col-12 my-2">
                <label className=" mb-2">Product Type Name: </label>
                <input
                  id="productTypeName"
                  className="w-100  border border-warning p-2 "
                  value={values.productTypeName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></input>
                {touched.productTypeName && (
                  <p className="text-danger m-auto">{errors.productTypeName}</p>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6 my-2">
              <label className=" mb-2">Description: </label>
              <textarea
                rows="5"
                cols="10"
                id="description"
                className="w-100  border border-warning p-2 "
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              ></textarea>
              {touched.description && (
                <p className="text-danger m-auto">{errors.description}</p>
              )}
            </div>

            <div className="row">
              <button
                type="button"
                onClick={handleUpdateProductType}
                className="col-3 btn btn-primary  border-2 p-2 mx-2 my-5"
              >
                Update ProductType
                <i class="ms-4 fa fa-edit"></i>
              </button>
              <button
                type="button"
                className="col-3 btn btn-danger  border-2 p-2 mx-2 my-5"
                onClick={() => handleDeleteProductType()}
              >
                Delete Product Type
                <i class="ms-4 fa fa-trash"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutAdminPage>
  );
};

export default ProductTypeDetail;
