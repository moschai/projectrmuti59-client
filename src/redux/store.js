import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./reducers/AuthReducer";

const rootState = combineReducers({
  authState: authReducer,
});

const store = createStore(
  rootState,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
