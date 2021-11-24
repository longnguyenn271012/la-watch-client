import axios from "axios";
import { createAction } from ".";
import { actionType } from "./type";

export const setProductAction = (keyword = "", productTypeId = "") => {
  return async (dispatch) => {
    if (keyword === "" && productTypeId === "") {
      try {
        const res = await axios({
          method: "GET",
          url: "http://localhost:5000/products",
        });

        dispatch(createAction(actionType.SET_PRODUCT, res.data));
        // console.log("fetch alll");
      } catch (error) {
        console.log(error);
      }
    } else if (keyword !== "" && productTypeId === "") {
      try {
        const res = await axios({
          method: "POST",
          url: "http://localhost:5000/products/searchbyname",
          data: { keyword },
        });
        dispatch(createAction(actionType.SET_PRODUCT, res.data));
        console.log("fetch filter");
      } catch (error) {
        console.log(error);
      }
    } else if (keyword === "" && productTypeId !== "") {
      try {
        const res = await axios({
          method: "POST",
          url: "http://localhost:5000/products/searchbyproducttype",
          data: { _id: productTypeId },
        });
        dispatch(createAction(actionType.SET_PRODUCT, res.data));
        console.log("data searched by id product", res.data);
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };
};

export const setProductDetailAction = (dispatch, productDetail) => {
  dispatch(createAction(actionType.SET_PRODUCT_DETAIL, productDetail));
};

// export const searchByProductType = (productTypeId = "") => {
//   return async (dispatch) => {
//     if (productTypeId === "") {
//       try {
//         const res = await axios({
//           method: "GET",
//           url: "http://localhost:5000/products",
//         });

//         dispatch(createAction(actionType.SET_PRODUCT, res.data));
//         console.log("fetch alll");
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       try {
//         const res = await axios({
//           method: "POST",
//           url: "http://localhost:5000/products/searchbyproducttype",
//           data: { _id: productTypeId },
//         });
//         dispatch(createAction(actionType.SET_PRODUCT, res.data));
//         console.log("data searched by id product", res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };
// };

// export const searchByName = async (dispatch, keyword) => {
//   try {
//     const res = await axios({
//       method: "POST",
//       url: "http://localhost:5000/products/searchbyname",
//       data: { keyword },
//     });
//     dispatch(createAction(actionType.SET_PRODUCT, res.data));
//     console.log("data searched  product", res.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const insertProductAction = async (data, props) => {
  console.log("data products insert", data);

  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:5000/products",
      data: data,
    });

    alert("Successfully Inserted Product: " + data.productName);
    props.history.push("/admin/products");
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const updateProductAction = async (_id, updateProduct, props) => {
  console.log("data product update", updateProduct);
  try {
    const res = await axios({
      method: "POST",
      url: `http://localhost:5000/products/update/${_id}`,
      data: updateProduct,
    });

    alert("Successfully Updated Account: " + updateProduct.productName);
    console.log(res.data);
    props.history.push("/admin/products");
  } catch (error) {
    alert(error.response.data.message);
    console.log(error);
  }
};

export const deleteProductAction = async (_id, props) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `http://localhost:5000/products/delete/${_id}`,
    });

    alert(res.data);
    props.history.push("/admin/products");
  } catch (error) {
    console.log(error);
  }
};
