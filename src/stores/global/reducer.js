import { UPDATE_USER_STATE, UPDATE_AUTH_TOKEN } from "./constants";

// @Initial State
const initialState = {
  user: null,
  tokenPayload: null,
};

const globalReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_USER_STATE:
      return {
        ...state,
        user: action.payload,
      };

    case UPDATE_AUTH_TOKEN:
      return {
        ...state,
        tokenPayload: action.payload,
      };
    default:
      return state;
  }
};

export default globalReducer;
