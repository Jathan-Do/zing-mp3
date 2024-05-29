import actionTypes from "../actions/actionTypes";

const initState = {
    curSongId: null,
    isPlaying: false,
    isInAlbum: false,
    songs: null,
};
const musicReducer = (state = initState, action) => {
    //action sẽ cái mà dispatch mang tới
    switch (action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.songId || null,
            };
        case actionTypes.PLAY_MUSIC:
            return {
                ...state,
                isPlaying: action.flag,
            };
        case actionTypes.SET_ALBUM:
            return {
                ...state,
                isInAlbum: action.flag,
            };
        case actionTypes.PLAYLIST:
            return {
                ...state,
                songs: action.songs || null,
            };
        default:
            return state;
    }
};

export default musicReducer;
