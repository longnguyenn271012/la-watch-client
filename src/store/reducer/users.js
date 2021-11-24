import { actionType } from "../action/type";

const initialState = {
  userList: [],
  userDetail: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_USER: {
      state.userList = action.payload;
      return { ...state };
    }
    case actionType.SET_USER_DETAIL: {
      state.userDetail = action.payload;
      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
