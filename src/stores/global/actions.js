import { UPDATE_USER_STATE, UPDATE_AUTH_TOKEN } from "./constants";

export const updateUserState = (payload, dispatch) =>
  dispatch({ type: UPDATE_USER_STATE, payload });

export const updateAuthToken = (payload, dispatch) =>
  dispatch({ type: UPDATE_AUTH_TOKEN, payload });
