import { actionType } from "../action/type";

const initialState = {
  productTypeList: [],
  productTypeDetail: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_PRODUCT_TYPE: {
      state.productTypeList = action.payload;
      return { ...state };
    }
    case actionType.SET_PRODUCT_TYPE_DETAIL: {
      state.productTypeDetail = action.payload;
      return { ...state };
    }

    default:
      return state;
  }
};

export default reducer;
