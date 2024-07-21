import moment from "moment";
import React, { memo } from "react";
import "moment/locale/vi";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";

const SongItem = ({
    thumbnail,
    artists,
    title,
    releaseDate,
    showSong,
    index,
    streamingStatus,
    songId,
    places,
    percent,
}) => {
    const dispatch = useDispatch();
    return (
        <div
            onClick={() => {
                dispatch(actions.setCurSongId(songId));
                dispatch(actions.playMusic(true));
            }}
            className={`w-full flex-auto flex p-[10px] gap-[10px] rounded-md cursor-pointer 
                ${showSong || index < 12 ? "block" : "hidden"} 
                ${places ? "justify-between items-center bg-[#52296c] hover:bg-[#644379]" : "hover:bg-main-300"}`}
        >
            <div className="flex gap-2">
                {places && <span className={`${places === 1 ? "" : ""} text-[rgba(255, 255, 255, 0.7)] text-[32px] m-auto`}>{places}</span>}
                <img src={thumbnail} alt="thumbnail" className="w-[60px] h-[60px] rounded-md object-cover" />
                <div className="flex flex-col justify-center">
                    <span className={`font-semibold text-sm ${places ? "text-[#b5a2c0]" : "text-main-300"}`}>
                        {title.length > 30 ? `${title.slice(0, 30)}...` : title}
                        {streamingStatus === 2 && (
                            <span className="ml-2 mb-[2px] font-bold text-[8px] bg-[#e5ac1a] text-white px-1 py-[1px] rounded-[4px]">
                                PREMIUM
                            </span>
                        )}
                    </span>
                    <span className={`font-normal text-xs ${places ? "text-[#b5a2c0]" : "text-main-200"}`}>
                        {artists.length > 30 ? `${artists.slice(0, 30)}...` : artists}
                    </span>
                    {releaseDate && (
                        <span className="font-normal text-main-200 text-xs">
                            {moment(releaseDate * 1000).fromNow()}
                        </span>
                    )}
                </div>
            </div>
            {percent && <span className="font-bold text-white">{`${percent}%`}</span>}
        </div>
    );
};

export default memo(SongItem);
