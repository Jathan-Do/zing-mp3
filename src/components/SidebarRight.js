import React, { useState } from "react";
import icons from "../utils/icon";
import { useSelector } from "react-redux";
import SongItem from "./SongItem";

const { CiTrash } = icons;
const SidebarRight = () => {
    const [isActive, setIsActive] = useState(false);
    const { curSongData } = useSelector((state) => state.music);
    console.log(curSongData?.title);
    return (
        <div className="flex flex-col">
            <div className="h-[70px] flex-none px-2 py-[14px]">
                <div className="flex justify-between gap-2 items-center text-sm">
                    <div className="flex flex-auto justify-between p-[3px] bg-main-300 cursor-pointer rounded-full text-center text-main-300 font-medium">
                        <span
                            className={`px-3 py-1 flex-1 cursor-pointer hover:text-main-500 ${
                                isActive && "rounded-full bg-[#e5e3e1] text-main-500"
                            }`}
                            onClick={() => setIsActive((pre) => !pre)}
                        >
                            Danh sách phát
                        </span>
                        <span
                            className={`px-3 py-1 flex-1 cursor-pointer hover:text-main-500 ${
                                !isActive && "rounded-full bg-[#e5e3e1] text-main-500"
                            }`}
                            onClick={() => setIsActive((pre) => !pre)}
                        >
                            Nghe gần đây
                        </span>
                    </div>
                    <span className="ml-2 mr-2 p-2 rounded-full cursor-pointer bg-main-300">
                        <CiTrash />
                    </span>
                </div>
            </div>
            <div className="px-2 flex flex-col">
                <SongItem
                    thumbnail={curSongData?.thumbnail}
                    title={curSongData?.title}
                    artists={curSongData?.artistsNames}
                    songId={curSongData?.encodeId}
                    showSong
                    reSizeImg
                    style={`bg-main-500 text-[#c1b5b5]`}
                    isActiveRightSidebar
                    customStyle
                />
            </div>
        </div>
    );
};

export default SidebarRight;
