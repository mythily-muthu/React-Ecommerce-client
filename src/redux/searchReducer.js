let initialState = {
  searchValue: "",
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "addValue": {
      state.searchValue = action.value; //assignining search value
      return state;
    }
    default:
      return state;
  }
};
