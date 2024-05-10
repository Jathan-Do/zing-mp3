import actionTypes from "../actions/actionTypes";

const initState = {
    curSongId: null,
};
const musicReducer = (state = initState, action) => {
    //action sẽ cái mà dispatch mang tới
    switch (action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.songId || null,
            };
        default:
            return state;
    }
};

export default musicReducer;
