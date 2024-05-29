import React, { memo } from "react";
import icons from "../utils/icon";
import moment from "moment";
import * as actions from "../store/actions";
import { useDispatch } from "react-redux";

const { PiMusicNotesSimpleLight } = icons;

const ListSongItem = ({ song }) => {
    const dispatch = useDispatch();

    return (
        <div
            onClick={() => {
                dispatch(actions.setCurSongId(song?.encodeId)); //handle click song and send id song to reducer for set curSongId
                dispatch(actions.playMusic(true));
                dispatch(actions.playAlbum(true));
            }}
            className="flex justify-between items-center border-b-[1px] border-gray-300 hover:bg-main-300 cursor-pointer p-[10px] rounded-md"
        >
            <div className="flex items-center gap-2 w-[52%]">
                <span>
                    <PiMusicNotesSimpleLight size={14} color="gray" />
                </span>
                <img src={song?.thumbnail} alt="thumbnail" className="w-10 h-10 object-cover rounded-md" />
                <span className="flex flex-col">
                    <span className="text-main-300 font-semibold text-sm whitespace-nowrap">
                        <span>{song?.title?.length > 28 ? `${song?.title?.slice(0, 28)}...` : song?.title}</span>
                    </span>
                    <span className="text-main-200">
                        {song?.artistsNames}
                        {song?.streamingStatus === 2 && (
                            <span className="ml-2 mb-[2px] font-bold text-[8px] bg-[#e5ac1a] text-white px-1 py-[1px] rounded-[4px]">
                                PREMIUM
                            </span>
                        )}
                    </span>
                </span>
            </div>
            <div className="flex justify-start w-[34%] text-gray-500">
                {song?.album?.title?.length > 30 ? `${song?.album?.title?.slice(0, 30)}...` : song?.album?.title}
            </div>
            <div className="flex flex-auto justify-end text-gray-500">
                {moment.utc(song?.duration * 1000).format("mm:ss")}
            </div>
        </div>
    );
};

export default memo(ListSongItem);
