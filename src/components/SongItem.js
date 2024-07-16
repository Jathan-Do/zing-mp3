import moment from "moment";
import React, { memo } from "react";
import "moment/locale/vi";

const SongItem = ({ thumbnail, artists, title, releaseDate, index, streamingStatus }) => {
    return (
        <div
            className={`w-[30%] flex-auto flex p-[10px] gap-[10px] rounded-md cursor-pointer hover:bg-main-300 ${
                index < 12 ? "block" : "hidden"
            }`}
        >
            <img src={thumbnail} alt="thumbnail" className="w-[60px] h-[60px] rounded-md object-cover" />
            <div className="flex flex-col">
                <span className="font-semibold text-main-300 text-sm ">
                    {title.length > 20 ? `${title.slice(0, 20)}...` : title}
                    {streamingStatus === 2 && (
                        <span className="ml-2 mb-[2px] font-bold text-[8px] bg-[#e5ac1a] text-white px-1 py-[1px] rounded-[4px]">
                            PREMIUM
                        </span>
                    )}
                </span>
                <span className="font-normal text-main-200 text-xs">
                    {artists.length > 20 ? `${artists.slice(0, 20)}...` : artists}
                </span>
                <span className="font-normal text-main-200 text-xs">{moment(releaseDate * 1000).fromNow()}</span>
            </div>
        </div>
    );
};

export default memo(SongItem);
