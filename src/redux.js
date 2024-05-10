import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { thunk } from "redux-thunk";
import { persistStore } from "redux-persist";

const reduxConfig = () => {
    const store = createStore(rootReducer, applyMiddleware(thunk)); //lưu giữ các reducer đã tạo và render ra web thông qua Middleware
    const persistor = persistStore(store); //lưu giữ các reducer đã lưu dưới local storage
    return { store, persistor };
};
export default reduxConfig;
