import { createStore } from "redux";

const initialState = {
  frnlist: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_FRNLIST":
      return { ...state, frnlist: !state.frnlist };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
