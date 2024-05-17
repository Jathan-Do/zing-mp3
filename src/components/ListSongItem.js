import React, { memo } from "react";
import icons from "../utils/icon";
import moment from "moment";

const { PiMusicNotesSimpleLight } = icons;

const ListSongItem = ({ song }) => {
    console.log(song);
    return (
        <div className="flex justify-between items-center py-[10px] border-t-[1px] border-gray-300">
            <div className="flex items-center gap-2 w-2/4">
                <span>
                    <PiMusicNotesSimpleLight size={14} color="gray" />
                </span>
                <img src={song?.thumbnail} alt="thumbnail" className="w-10 h-10 object-cover rounded-md" />
                <span className="flex flex-col w-full">
                    <span className="text-main-300 font-semibold text-sm whitespace-nowrap">
                        {song?.title?.length > 28 ? `${song?.title?.slice(0, 28)}...` : song?.title}
                    </span>
                    <span className="text-main-200 font-semibold">{song?.artistsNames}</span>
                </span>
            </div>
            <div className="flex justify-start w-[38%] text-gray-500">{song?.album?.title}</div>
            <div className="flex flex-auto justify-center text-gray-500">{moment(song?.duration * 1000).format("mm:ss")}</div>
        </div>
    );
};

export default memo(ListSongItem);
