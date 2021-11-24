import { actionType } from "../action/type";

const initialState = {
  orderList: [],
  orderDetail: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_ORDER: {
      state.orderList = action.payload;
      return { ...state };
    }
    case actionType.SET_ORDER_DETAIL: {
      state.orderDetail = action.payload;
      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
