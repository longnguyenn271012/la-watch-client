import { actionType } from "../action/type";

const initialState = {
  productDetail: null,
  productList: [],
  productSearchedByTypeList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_PRODUCT: {
      state.productList = action.payload;
      return { ...state };
    }
    case actionType.SET_PRODUCT_DETAIL: {
      state.productDetail = action.payload;
      return { ...state };
    }
    case actionType.SET_PRODUCT_SEARCHED_BY_TYPE: {
      state.productSearchedByTypeList = action.payload;
      return { ...state };
    }

    default:
      return state;
  }
};

export default reducer;
