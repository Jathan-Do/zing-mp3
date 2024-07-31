import actionTypes from "../actions/actionTypes";

const initState = {
    curSongId: null,
    curSongData: null,
    curAlbumId: null,
    isPlaying: false,
    isInAlbum: false,
    songs: null,
    isLoading: false,
    recentSongs: [],
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
        case actionTypes.SET_RECENT:
            let songs = state.recentSongs;
            if (action.data) {
                //lọc các bài không trùng
                if (state.recentSongs?.some((index) => index.songId === action.data.songId)) {
                    songs = songs.filter((item) => item.songId !== action.data.songId);
                }
                //lọc 20 bài
                if (songs.length >= 20) {
                    songs = songs.filter((item, index, arr) => index !== arr.length - 1);
                }
                songs = [action.data, ...songs];
            }
            return {
                ...state,
                recentSongs: songs,
            };
        default:
            return state;
    }
};

export default musicReducer;
