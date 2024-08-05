import actionTypes from "./actionTypes";
import * as apis from "../../apis";

export const setCurSongId = (songId) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    songId: songId,
});

export const playMusic = (flag) => ({
    type: actionTypes.PLAY_MUSIC,
    flag: flag,
});

export const playAlbum = (flag) => ({
    type: actionTypes.SET_ALBUM,
    flag: flag,
});

export const setPlayList = (songs) => ({
    type: actionTypes.PLAYLIST,
    songs: songs,
});

export const loading = (flag) => ({
    type: actionTypes.LOADING,
    flag: flag,
});

export const setCurSongData = (data) => ({
    type: actionTypes.SET_CUR_SONG_DATA,
    data: data,
});

export const setCurAlbumId = (pid) => ({
    type: actionTypes.SET_CUR_ALBUM_ID,
    pid: pid,
});

export const setRecent = (data) => ({
    type: actionTypes.SET_RECENT,
    data: data,
});

export const search = (keyword) => async (dispatch) => {
    // dispatch này là của thunk
    try {
        const reponse = await apis.apiSearch(keyword);
        if (reponse?.data.err === 0) {
            dispatch({
                type: actionTypes.SEARCH,
                data: reponse.data?.data,
            });
        } else {
            dispatch({
                type: actionTypes.SEARCH,
                data: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.SEARCH,
            data: null,
        });
    }
};
