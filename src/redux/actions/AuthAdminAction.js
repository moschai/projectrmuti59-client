import AuthService from "../../services/AuthService";
import AdminService from "../../services/AdminService";

import {
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_LOADING,
  ADMIN_LOGIN_FAILED,
  ADMIN_LOGOUT,
} from "../types/AuthAdminType";

export const adminLoginAction = (values) => async (dispatch) => {
  dispatch({
    type: ADMIN_LOGIN_LOADING,
  });
  try {
    const resp = await AuthService.adminLogin(values);
    AuthService.adminSaveToken(resp.data.accessToken);
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: {
        profile: resp.data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAILED,
      payload: {
        errorMessage: error.message,
      },
    });
  }
};

export const AdminProfileAction = () => async (dispatch) => {
  return new Promise(async (resolve) => {
    dispatch({
      type: ADMIN_LOGIN_LOADING,
    });
    try {
      const resp = await AdminService.getProfile();
      console.log(resp);
      // AuthService.saveToken(resp.data.accessToken);
      dispatch({
        type: ADMIN_LOGIN_SUCCESS,
        payload: {
          profile: resp.data,
        },
      });
    } catch (error) {
      console.log(error);
      AuthService.adminRemoveToken();
      dispatch({
        type: ADMIN_LOGIN_FAILED,
        payload: {
          errorMessage: error.message,
        },
      });
    }
    resolve();
  });
};
export const adminLogoutAction = () => async (dispatch) => {
  AuthService.adminRemoveToken();
  dispatch({
    type: ADMIN_LOGOUT,
  });
};
