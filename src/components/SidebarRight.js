import React, { useEffect, useState } from "react";
import icons from "../utils/icon";
import { useSelector } from "react-redux";
import SongItem from "./SongItem";
import { apiGetDetailPlaylist } from "../apis";
import { Scrollbars } from "react-custom-scrollbars-2";

const { CiTrash } = icons;
const SidebarRight = () => {
    const [isActive, setIsActive] = useState(true);
    const [playlist, setPlaylist] = useState();
    const { curSongData, curAlbumId, isPlaying, recentSongs } = useSelector((state) => state.music);
    const fetchDetailPlaylist = async () => {
        const response = await apiGetDetailPlaylist(curAlbumId);
        if (response.data?.err === 0) {
            setPlaylist(response.data?.data?.song?.items);
        }
    };

    //call api
    useEffect(() => {
        curAlbumId && fetchDetailPlaylist();
    }, []);
    useEffect(() => {
        if (curAlbumId && isPlaying) {
            fetchDetailPlaylist();
        }
    }, [curAlbumId, isPlaying]);

    //handle khi click vào bài hát sẽ tự nhảy qua tab danh sách phát
    useEffect(() => {
        isPlaying && setIsActive(true);
    }, [isPlaying, curSongData]);
    return (
        <div className="flex flex-col h-full">
            <div className="h-[55px] flex-none">
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
            {!isActive ? (
                //lấy data dưới local storage
                <Scrollbars style={{ width: "100%", height: "calc(100% - 200px)" }} autoHide>
                    {recentSongs && (
                        <div className="flex flex-col">
                            {recentSongs?.map((item) => {
                                return (
                                    <SongItem
                                        key={item?.songId}
                                        thumbnail={item?.thumbnail}
                                        title={item?.title}
                                        artists={
                                            Array.isArray(item?.artists) && item.artists.length > 0
                                                ? item.artists.map((artist) => artist.name).join(", ")
                                                : "Unknown Artist"
                                        }
                                        songId={item?.songId}
                                        streamingStatus={item?.streamingStatus}
                                        reSizeImg
                                        showSong
                                    />
                                );
                            })}
                        </div>
                    )}
                </Scrollbars>
            ) : (
                <>
                    <div className="flex flex-col">
                        <SongItem
                            thumbnail={curSongData?.thumbnail}
                            title={curSongData?.title}
                            artists={curSongData?.artists?.map((artist) => artist.name).join(", ")}
                            songId={curSongData?.encodeId}
                            showSong
                            reSizeImg
                            style={`bg-main-500`}
                            isActiveRightSidebar
                        />
                    </div>
                    <div className="flex flex-col text-sm pt-[15px] px-2 pb-[5px]">
                        <span className="font-medium">Tiếp theo</span>
                        <span className="opacity-70">
                            <span>Từ playlist </span>
                            <span className="font-semibold text-[#572525]">{`#${curSongData?.album?.title}`}</span>
                        </span>
                    </div>
                    <Scrollbars style={{ width: "100%", height: "calc(100% - 200px)" }} autoHide>
                        {playlist && (
                            <div className="flex flex-col">
                                {playlist?.map((item) => {
                                    return (
                                        <SongItem
                                            key={item.encodeId}
                                            thumbnail={item.thumbnail}
                                            title={item.title}
                                            artists={item.artists?.map((artist) => artist.name).join(", ")}
                                            songId={item.encodeId}
                                            streamingStatus={item.streamingStatus}
                                            reSizeImg
                                            showSong
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </Scrollbars>
                </>
            )}
        </div>
    );
};

export default SidebarRight;
