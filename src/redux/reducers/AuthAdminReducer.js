import {
  ADMIN_LOGIN_LOADING,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILED,
  ADMIN_LOGOUT,
} from "../types/AuthAdminType";

const initialState = {
  isAuthentication: false,
  profile: {},
  isLoading: false,
  errorMessage: "",
};

const authAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_LOADING:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthentication: true,
        profile: action.payload.profile,
      };
    case ADMIN_LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
      };
    case ADMIN_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default authAdminReducer;
