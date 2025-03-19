import { combineReducers } from "redux";
import authReducer from "./reducerLogin";
import reducerProductDS from "./reducerProductDS";
import reducerUser from "./reducerUser";
const rootReducer = combineReducers({
    auth: authReducer,
    product: reducerProductDS,
});
export default rootReducer;
