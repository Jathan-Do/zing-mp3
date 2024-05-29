import actionTypes from "./actionTypes";
// import * as apis from "../../apis";

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
// export const fetchDetailPlaylist = (pid) => async (dispatch) => {
//     // dispatch này là của thunk
//     try {
//         const reponse = await apis.apiGetDetailPlaylist(pid);
//         if (reponse?.data.err === 0) {
//             dispatch({
//                 type: actionTypes.PLAYLIST,
//                 songs: reponse.data?.data?.song?.items,
//             });
//         }
//     } catch (error) {
//         dispatch({
//             type: actionTypes.PLAYLIST,
//             songs: null,
//         });
//     }
// };
