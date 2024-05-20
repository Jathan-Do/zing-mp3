import React, { memo } from "react";
import { ListSongItem } from "./";
import icons from "../utils/icon";
import moment from "moment";

const { MdOutlineSort, BsDot } = icons;

const formatDuration = (totalDuration) => {
    const duration = moment.duration(totalDuration, "seconds");
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    return `${hours} giờ ${minutes} phút`;
};

const ListSong = ({ songData, totalDuration }) => {
    return (
        <div className="w-full flex flex-col text-xs pt-2">
            <div className="flex justify-between items-center text-gray-500 font-semibold pb-3 p-[10px] border-b-[1px] border-gray-300">
                <span className="flex items-center gap-2 w-[52%]">
                    <span>
                        <MdOutlineSort />
                    </span>
                    <span className=" ">BÀI HÁT</span>
                </span>
                <span className="flex justify-start w-[34%]">ALBUM</span>
                <span className="flex flex-auto justify-end">THỜI GIAN</span>
            </div>
            <div className="flex flex-col">
                {songData?.map((item) => {
                    return <ListSongItem key={item?.encodeId} song={item}/>;
                })}
            </div>
            <span className="flex text-main-200 items-center py-[10px]">
                <span>{`${songData?.length} bài hát`}</span>
                <BsDot size={22} />
                <span>{formatDuration(totalDuration)}</span>
            </span>
        </div>
    );
};

export default memo(ListSong);
