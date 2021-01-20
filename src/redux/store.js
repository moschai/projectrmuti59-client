import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./reducers/AuthReducer";
import authAdminReducer from "./reducers/AuthAdminReducer";

const rootState = combineReducers({
  authState: authReducer,
  authAdminState: authAdminReducer,
});

const store = createStore(
  rootState,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
