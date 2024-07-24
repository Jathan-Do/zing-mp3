import actionTypes from "../actions/actionTypes";

const initState = {
    curSongId: null,
    curSongData: null,
    curAlbumId: null,
    isPlaying: false,
    isInAlbum: false,
    songs: null,
    isLoading: false,
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
        case actionTypes.LOADING:
            return {
                ...state,
                isLoading: action.flag,
            };
        case actionTypes.SET_CUR_SONG_DATA:
            return {
                ...state,
                curSongData: action.data || null,
            };
        case actionTypes.SET_CUR_ALBUM_ID:
            return {
                ...state,
                curAlbumId: action.pid || null,
            };
        default:
            return state;
    }
};

export default musicReducer;
