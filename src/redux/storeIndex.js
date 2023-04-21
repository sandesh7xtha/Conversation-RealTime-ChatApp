import { createStore } from "redux";

const initialState = {
  frnlist: false,
  scrollPosition: 1,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_FRNLIST":
      return { ...state, frnlist: !state.frnlist };
    case "SCROLL_UP":
      return { ...state, frnlist: action.scrollValue };

    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
