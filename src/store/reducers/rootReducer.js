import { combineReducers } from "redux"; //combineReducers để gom các reducer lại
import appReducer from "./appReducer";
import { persistReducer } from "redux-persist"; //để lưu giữ các state mặc định
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import musicReducer from "./musicReducer";

const commonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};
const musicConfig = {
    ...commonConfig,
    key: "music",
    whitelist: ["curSongId", "curSongData", "curAlbumId"], //truyền các state cần lưu, mặc định không có whitelist thì persistReducer sẽ lưu hết các state của musicReducer
};
const rootReducer = combineReducers({
    app: appReducer, //một trong các công việc của bưu điện
    music: persistReducer(musicConfig, musicReducer), //một trong các công việc của bưu điện
});

export default rootReducer;
