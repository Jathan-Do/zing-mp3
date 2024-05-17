import React, { memo } from "react";
import { ListSongItem } from "./";
import icons from "../utils/icon";

const { MdOutlineSort } = icons;
const ListSong = ({ songData, totalDuration }) => {
    return (
        <div className="w-full flex flex-col text-xs p-[10px]">
            <div className="flex justify-between items-center text-gray-500 font-semibold pb-3">
                <span className="flex items-center gap-2 w-2/4">
                    <span>
                        <MdOutlineSort />
                    </span>
                    <span className=" ">BÀI HÁT</span>
                </span>
                <span className="flex justify-start w-[38%]">ALBUM</span>
                <span className="flex flex-auto justify-center">THỜI GIAN</span>
            </div>
            <div className="flex flex-col">
                {songData?.map((item) => {
                    return <ListSongItem key={item.encodeId} song={item} />;
                })}
            </div>
        </div>
    );
};

export default memo(ListSong);
