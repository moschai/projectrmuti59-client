const {
  AUTHORITY_LOGIN_LOADING,
  AUTHORITY_LOGIN_SUCCESS,
  AUTHORITY_LOGIN_FAILED,
  AUTHORITY_LOGOUT,
} = require("../types/AuthType");

const initialState = {
  isAuthentication: false,
  profile: {},
  isLoading: false,
  errorMessage: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHORITY_LOGIN_LOADING:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case AUTHORITY_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthentication: true,
        profile: action.payload.profile,
      };
    case AUTHORITY_LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
      };
    case AUTHORITY_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default authReducer;
