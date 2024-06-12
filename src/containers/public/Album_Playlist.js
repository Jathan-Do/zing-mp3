import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment";
import { ListSong, AudioLoading } from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import icons from "../../utils/icon";

const { PiPlayFill } = icons;

const Album_Playlist = () => {
    const { pid } = useParams();

    const dispatch = useDispatch();

    const { curSongId, isPlaying, songs } = useSelector((state) => state.music); //dùng useSelector để lấy đúng vào reducer cần dùng

    const [playListData, setPlayListData] = useState({});

    useEffect(() => {
        const fetchDetailPlaylist = async () => {
            const reponse = await apis.apiGetDetailPlaylist(pid);
            if (reponse?.data.err === 0) {
                setPlayListData(reponse.data?.data);
                dispatch(actions.setPlayList(reponse?.data?.data?.song?.items));
            }
        };

        fetchDetailPlaylist();
    }, [pid]);

    return (
        <div className="flex py-6 w-full h-full px-[59px] gap-8 ">
            <div className="flex items-center flex-col gap-2 w-2/5">
                <div className="w-full overflow-hidden relative duration-1000">
                    <img
                        src={playListData?.thumbnailM}
                        alt="thumbnail"
                        className={`w-full object-contain hover:scale-110 shadow-md 
                            ${
                                isPlaying
                                    ? "rounded-full animate-rotate-center"
                                    : "rounded-md animate-rotate-center-pause"
                            }`}
                    />
                    <div
                        className={`absolute top-0 left-0 bottom-0 right-0 cursor-pointer hover:backdrop-brightness-50 text-white flex items-center justify-center 
                            ${isPlaying ? "rounded-full" : "rounded-md"}`}
                    >
                        <span className="p-[9px] w-10 h-10 rounded-full border border-white">
                            {isPlaying ? <AudioLoading /> : <PiPlayFill size={20} />}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-1 items-center">
                    <h3 className="font-bold text-xl text-gray-700 pt-2">{playListData?.title}</h3>
                    <span className="text-xs text-main-200 font-medium">
                        <span>Cập nhật: </span>
                        <span>{moment.unix(playListData?.contentLastUpdate).format("DD/MM/YYYY")}</span>
                    </span>
                    <span className="text-xs text-main-200 text-center font-medium">{playListData?.artistsNames}</span>
                    <span className="text-xs text-main-200 font-medium">{`${Math.round(
                        playListData?.like / 1000
                    )}K người yêu thích`}</span>
                </div>
            </div>
            <Scrollbars style={{ width: "100%", height: "calc(100% - 50px)" }} autoHide>
                <div className="flex-auto ">
                    <span className="text-gray-500 font-normal text-sm">Lời tựa </span>
                    <span className="text-sm text-gray-700 ">{playListData?.sortDescription}</span>
                    <ListSong totalDuration={playListData?.song?.totalDuration} />
                </div>
            </Scrollbars>
        </div>
    );
};

export default Album_Playlist;
