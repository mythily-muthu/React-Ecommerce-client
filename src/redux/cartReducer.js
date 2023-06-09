//initial state

let initialState = {
  products: [],
  quantity: 0,
  total: 0,
  stripeData: {}
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "addProduct": {
      state.products.push(action.payload);
      return {
        ...state,
        quantity: state.quantity + 1,
        total: state.total + action.payload.price * action.payload.quantity,
      };
    }
    case "emptyCart": {
      return {
        ...state,
        proudcts: [],
        quantity: 0,
        total: 0,
        stripeData: action.payload,
      };
    }
    case "removeItem": {
      let tempProd = [...state.products];
      tempProd.splice(action.itemNo, 1);
      return {
        state,
        products: [...tempProd],
        quantity: state.quantity - 1,
        total: state.total - action.product.price * action.product.quantity,
      };
    }
    // case "createOrder": {
    //   return {
    //     ...state,
    //     stripeData: action.payload,
    //   }
    // }

    default:
      return state;
  }
};
