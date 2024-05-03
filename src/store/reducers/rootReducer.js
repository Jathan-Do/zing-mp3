import { combineReducers } from "redux"; //combineReducers để gom các reducer lại
import appReducer from "./appReducer";

const rootReducer = combineReducers({
    app: appReducer,//một trong các công việc của bưu điện
});

export default rootReducer;
