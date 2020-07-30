import AuthService from "../../services/AuthService";
import AuthorityService from "../../services/AuthorityService";

import {
  AUTHORITY_LOGIN_SUCCESS,
  AUTHORITY_LOGIN_LOADING,
  AUTHORITY_LOGIN_FAILED,
  AUTHORITY_LOGOUT,
} from "../types/AuthType";

export const authorityLoginAction = (values) => async (dispatch) => {
  dispatch({
    type: AUTHORITY_LOGIN_LOADING,
  });
  try {
    const resp = await AuthService.authorityLogin(values);
    AuthService.saveToken(resp.data.accessToken);
    dispatch({
      type: AUTHORITY_LOGIN_SUCCESS,
      payload: {
        profile: resp.data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: AUTHORITY_LOGIN_FAILED,
      payload: {
        errorMessage: error.message,
      },
    });
  }
};

export const authorityProfileAction = () => async (dispatch) => {
  return new Promise(async (resolve) => {
    dispatch({
      type: AUTHORITY_LOGIN_LOADING,
    });
    try {
      const resp = await AuthorityService.getProfile();
      // AuthService.saveToken(resp.data.accessToken);
      dispatch({
        type: AUTHORITY_LOGIN_SUCCESS,
        payload: {
          profile: resp.data,
        },
      });
    } catch (error) {
      AuthService.removeToken();
      dispatch({
        type: AUTHORITY_LOGIN_FAILED,
        payload: {
          errorMessage: error.message,
        },
      });
    }
    resolve();
  });
};
export const authorityLogoutAction = () => async (dispatch) => {
  AuthService.removeToken();
  dispatch({
    type: AUTHORITY_LOGOUT,
  });
};
