import { actionType } from "../action/type";

const initialState = {
  voucherList: [],
  voucherDetail: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_VOUCHER: {
      state.voucherList = action.payload;
      return { ...state };
    }
    case actionType.SET_VOUCHER_DETAIL: {
      state.voucherDetail = action.payload;
      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
