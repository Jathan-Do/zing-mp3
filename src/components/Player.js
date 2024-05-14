import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import icons from "../utils/icon";
import * as apis from "../apis";

const {
    PiHeart,
    PiHeartFill,
    RxDotsHorizontal,
    PiRepeatLight,
    PiShuffleLight,
    BsFillSkipStartFill,
    BsSkipEndFill,
    PiPlayFill,
    HiMiniPause,
} = icons;

const Player = () => {
    const audioElement = new Audio();
    const { curSongId, isPlaying } = useSelector((state) => state.music); //dùng useSelector để lấy đúng vào reducer cần dùng

    const [songInfo, setSongInfo] = useState(null);

    const [source, setSource] = useState(null);

    //const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const fetchDetailSong = async () => {
            const [response1, response2] = await Promise.all([
                apis.apiGetDetailSong(curSongId),
                apis.apiGetSong(curSongId),
            ]);
            if (response1?.data.err === 0) {
                setSongInfo(response1.data.data);
            }
            if (response2?.data.err === 0) {
                setSource(response2.data.data["128"]);
            }
        };
        fetchDetailSong();
    }, [curSongId]);

    useEffect(() => {
        // audioElement.play();
    }, [curSongId]);

    //funct handle button play music
    const handleTogglePlayMusic = () => {
        // setIsPlaying(!isPlaying);
    };

    return (
        <div className="h-full px-5 flex py-2 cursor-pointer border border-[#d3cfc6]">
            <div className="w-[30%] flex-auto flex items-center gap-3">
                <img src={songInfo?.thumbnail} alt="thumbnail" className="w-16 h-16 rounded-md object-cover" />
                <div className="flex flex-col">
                    <span className="font-semibold text-main-300 text-sm">{songInfo?.title}</span>
                    <span className="font-medium text-main-200 text-xs">{songInfo?.artistsNames}</span>
                </div>
                <div className="flex gap-5 pl-3">
                    <span>
                        <PiHeart />
                    </span>
                    <span>
                        <RxDotsHorizontal />
                    </span>
                </div>
            </div>
            <div className="w-[40%] flex-auto flex flex-col items-center justify-center">
                <div className="flex gap-6 justify-center items-center">
                    <span title="Bật phát ngẫu nhiên">
                        <PiShuffleLight size={22} />
                    </span>
                    <span>
                        <BsFillSkipStartFill size={24} />
                    </span>
                    <span
                        className="p-2 w-9 h-9 rounded-full border border-black hover:text-main-400 hover:border-[#844d4d]"
                        onClick={handleTogglePlayMusic}
                    >
                        {isPlaying ? <PiPlayFill size={18} /> : <HiMiniPause size={18} />}
                    </span>
                    <span>
                        <BsSkipEndFill size={24} />
                    </span>
                    <span title="Bật phát lại tất cả">
                        <PiRepeatLight size={22} />
                    </span>
                </div>
                <div>player</div>
            </div>
            <div className="w-[30%] border border-black flex-auto ">control</div>
        </div>
    );
};

export default Player;
