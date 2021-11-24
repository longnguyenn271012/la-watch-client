import { actionType } from "../action/type";

const initialState = {
  auth: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_ME: {
      state.auth = action.payload;
      return { ...state };
    }
    // case actionType.SET_USER_LOGIN : {
    //   state.auth = action
    // }
    default:
      return state;
  }
};

export default reducer;
