import React from "react";
import { useSelector } from "react-redux";

import * as yup from "yup";
import { useFormik } from "formik";
import LayoutAdminPage from "../../../../HOCs/LayoutAdminPage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../../../firebase";
import {
  deleteProductAction,
  updateProductAction,
} from "../../../../store/action/products";

const schema = yup.object().shape({
  productName: yup.string().required("Enter product name !"),
  //   productImage: yup.string().required("Enter product Image !"),
  productTypeId: yup.string().required("Enter product Type Id !"),
  price: yup
    .string()
    .required("Enter price !")
    .matches(/^[0-9]*$/, "Enter number only !"),
  warrantyTime: yup
    .string()
    .required("Enter warranty Time !")
    .matches(/^[0-9]*$/, "Enter number only !"),
  faceSize: yup
    .string()
    .required("Enter face size !")
    .matches(/^[0-9]*$/, "Enter number only !"),
  thickness: yup
    .string()
    .required("Enter thickness !")
    .matches(/^\d*\.?\d*$/, "Enter number only !"),
  faceColor: yup.string().required("Enter face color !"),
  machineType: yup.string().required("Enter machine type !"),
  wireSize: yup
    .string()
    .required("Enter wire size !")
    .matches(/^[0-9]*$/, "Enter number only !"),
  glassSurface: yup.string().required("Enter glass surface !"),
  ropeMaterial: yup.string().required("Enter rope material !"),
  quantity: yup
    .string()
    .required("Enter quantity !")
    .matches(/^[0-9]*$/, "Enter number only !"),
});

const ProductDetailAdmin = (props) => {
  const productDetail =
    useSelector((state) => state.products.productDetail) || {};
  const productTypeList =
    useSelector((state) => state.productTypes.productTypeList) || [];

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
      _id: _id,
      productName: productDetail.productName,
      productImage: productDetail.productImage,
      productTypeId: productDetail.productTypeId,
      price: productDetail.price,
      warrantyTime: productDetail.warrantyTime,
      faceSize: productDetail.faceSize,
      thickness: productDetail.thickness,
      faceColor: productDetail.faceColor,
      machineType: productDetail.machineType,
      wireSize: productDetail.wireSize,
      glassSurface: productDetail.glassSurface,
      ropeMaterial: productDetail.ropeMaterial,
      quantity: productDetail.quantity,
    },
    validationSchema: schema,
    validateOnMount: true,
  });

  const handleUpdateProduct = (event) => {
    event.preventDefault();

    setTouched({
      _id: true,
      productName: true,
      productImage: true,
      productTypeId: true,
      price: true,
      warrantyTime: true,
      faceSize: true,
      thickness: true,
      faceColor: true,
      machineType: true,
      wireSize: true,
      glassSurface: true,
      ropeMaterial: true,
      quantity: true,
    });

    if (!isValid) return;

    const updateProduct = { ...values };

    updateProductAction(_id, updateProduct, props);
  };

  const handleDeleteProduct = () => {
    deleteProductAction(_id, props);
  };

  //Them hinh len firebase
  const handleChangeFile = () => {
    const file = document.querySelector(`#productImage`).files[0];
    const metadata = {
      contentType: file.type,
    };
    const storageRef = ref(storage, `${values.productTypeId}/` + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          values.productImage = downloadURL;
        });
      }
    );
  };

  return (
    <LayoutAdminPage>
      <div className="container-fluid">
        <div className="row py-3">
          <span className="fs-2 fw-bolder">Update product</span>
        </div>
        <div className="row my-3">
          <form className="col-12 row">
            <div className="col-12 col-md-6 my-2">
              <label className=" mb-2">Product Id: </label>
              <input
                id="_id"
                className="w-100  border border-warning p-2 "
                value={_id}
                disabled
              ></input>
            </div>

            <div className="col-12 col-md-6 my-2">
              <label className=" mb-2">Product Type Id: </label>
              <select
                id="productTypeId"
                className="w-100  border border-warning p-2 "
                value={values.productTypeId}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {productTypeList.map((item) => {
                  return (
                    <option value={item._id}>{item.productTypeName}</option>
                  );
                })}
              </select>
            </div>
            <div className="col-12 col-md-6 my-2">
              <label className=" mb-2">Product Name: </label>
              <input
                id="productName"
                className="w-100  border border-warning p-2 "
                value={values.productName}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.productName && (
                <p className="text-danger m-auto">{errors.productName}</p>
              )}
            </div>
            <div className="col-12 col-md-6 my-2">
              <label className=" mb-2">Product Main Image: </label>
              <input
                id="productImage"
                className="w-100  border border-warning p-2 "
                onChange={handleChangeFile}
                type="file"
              ></input>
            </div>

            <div className="col-6 col-md-3 my-2">
              <label className=" mb-2">Product Sub Image 1: </label>
              <input
                id="productImageSub1"
                className="w-100  border border-warning p-2 "
                onChange={handleChangeFile}
                type="file"
              ></input>
            </div>
            <div className="col-6 col-md-3 my-2">
              <label className=" mb-2">Product Sub Image 2: </label>
              <input
                id="productImageSub2"
                className="w-100  border border-warning p-2 "
                onChange={handleChangeFile}
                type="file"
              ></input>
            </div>
            <div className="col-6 col-md-3 my-2">
              <label className=" mb-2">Price (vnd): </label>
              <input
                id="price"
                className=" w-100  border border-warning p-2 "
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.price && <p className="text-danger">{errors.price}</p>}
            </div>

            <div className="col-6 col-md-3 my-2">
              <label className=" mb-2">Warranty Time (month): </label>
              <input
                id="warrantyTime"
                className=" w-100  border border-warning p-2 "
                value={values.warrantyTime}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.warrantyTime && (
                <p className="text-danger">{errors.warrantyTime}</p>
              )}
            </div>
            <div className="col-6 col-md-3 my-2">
              <label className=" mb-2">Quantity: </label>
              <input
                id="quantity"
                className=" w-100  border border-warning p-2 "
                value={values.quantity}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.quantity && (
                <p className="text-danger">{errors.quantity}</p>
              )}
            </div>
            <div className="col-6 col-md-3 my-2">
              <label className=" mb-2">Face Size (mm): </label>
              <input
                id="faceSize"
                className=" w-100  border border-warning p-2 "
                value={values.faceSize}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.faceSize && (
                <p className="text-danger">{errors.faceSize}</p>
              )}
            </div>
            <div className="col-6 col-md-3 my-2">
              <label className=" mb-2">Thickness (mm): </label>
              <input
                id="thickness"
                className=" w-100  border border-warning p-2 "
                value={values.thickness}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.thickness && (
                <p className="text-danger">{errors.thickness}</p>
              )}
            </div>
            <div className="col-6 col-md-3 my-2">
              <label className=" mb-2">Wire Size (mm): </label>
              <input
                id="wireSize"
                className=" w-100  border border-warning p-2 "
                value={values.wireSize}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.wireSize && (
                <p className="text-danger">{errors.wireSize}</p>
              )}
            </div>
            <div className="col-6 col-md-3 my-2">
              <label className=" mb-2">Face Color: </label>
              <input
                id="faceColor"
                className=" w-100  border border-warning p-2 "
                value={values.faceColor}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.faceColor && (
                <p className="text-danger">{errors.faceColor}</p>
              )}
            </div>
            <div className="col-6 col-md-3 my-2">
              <label className=" mb-2">Machine Type: </label>
              <input
                id="machineType"
                className=" w-100  border border-warning p-2 "
                value={values.machineType}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.machineType && (
                <p className="text-danger">{errors.machineType}</p>
              )}
            </div>
            <div className="col-6 col-md-3 my-2">
              <label className=" mb-2">Glass Surface: </label>
              <input
                id="glassSurface"
                className=" w-100  border border-warning p-2 "
                value={values.glassSurface}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.glassSurface && (
                <p className="text-danger">{errors.glassSurface}</p>
              )}
            </div>
            <div className="col-6 col-md-3 my-2">
              <label className=" mb-2">Rope Material: </label>
              <input
                id="ropeMaterial"
                className=" w-100  border border-warning p-2 "
                value={values.ropeMaterial}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.ropeMaterial && (
                <p className="text-danger">{errors.ropeMaterial}</p>
              )}
            </div>

            <div className="row">
              <button
                type="button"
                onClick={handleUpdateProduct}
                className="col-3 btn btn-primary  border-2 p-2 mx-2 my-5"
              >
                Update Product
                <i class="ms-4 fa fa-edit"></i>
              </button>
              <button
                type="button"
                className="col-3 btn btn-danger  border-2 p-2 mx-2 my-5"
                onClick={() => handleDeleteProduct()}
              >
                Delete Product
                <i class="ms-4 fa fa-trash"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutAdminPage>
  );
};

export default ProductDetailAdmin;
