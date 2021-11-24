import { actionType } from "../action/type";

const initialState = {
    listInCart : [],
    order : [],
    orderHistory : [],
}

const reducer = (state = initialState, {type, payload}) => {
    switch(type){
        case actionType.SET_ORDER_PRODUCT  :{
            state.order = payload
            return {...state};
        }
        case actionType.SET_ORDER_HISTORY  :{
            state.orderHistory = payload
            return {...state};
        }

        // case actionType.ADD_TO_CART : {
        //     const cloneCart = [...state.listInCart];
        //     const foundIndex = cloneCart.findIndex((item) => item.newProduct._id === payload._id);
        //     if(foundIndex === -1) {
        //         let cartItem = { newProduct: payload, quantity: 1 }
        //         cloneCart.push(cartItem);
        //     } else {
        //         cloneCart[foundIndex].quantity++;
        //     }
        //     state.listInCart = cloneCart;
        //     return {...state};
        // }
        // case actionType.INCREASE_QUANTITY : {
        //     const cloneCart = [...state.listInCart]
        //     const foundIndex = cloneCart.findIndex(item => item.newProduct._id === payload)
        //     cloneCart[foundIndex].quantity++;

        //     state.listInCart = cloneCart;
        //     return { ...state };
        // }
        // case actionType.DECREASE_QUANTITY : {
        //     const cloneCart = [...state.listInCart]
        //     const foundIndex = cloneCart.findIndex(item => item.newProduct._id === payload)
        //     cloneCart[foundIndex].quantity--;

        //     state.listInCart = cloneCart;
        //     return { ...state };
        // }

        // case actionType.DELETE_PRODUCT: {
        //     const cloneCart = [...state.listInCart];
        //     const foundIndex = cloneCart.findIndex(item => item.newProduct._id === payload);
        //     cloneCart.splice(foundIndex, 1);

        //     state.listInCart = cloneCart;
        //     return { ...state };
        // }

        default : return state;
    }
}

export default reducer;