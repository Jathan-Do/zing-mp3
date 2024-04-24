import { combineReducers } from "redux"; //combineReducers để gom các reducer lại
import appReducer from "./appReducer";

const rootReducer = combineReducers({
    app: appReducer,
});

export default rootReducer;
