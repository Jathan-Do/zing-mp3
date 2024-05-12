import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import icons from "../utils/icon";
import * as apis from "../apis";

const { PiHeart, PiHeartFill, RxDotsHorizontal } = icons;

const Player = () => {
    const { curSongId } = useSelector((state) => state.music); //dùng useSelector để lấy đúng vào reducer cần dùng
    const [songInfo, setSongInfo] = useState(null);
    useEffect(() => {
        const fetchDetailSong = async () => {
            const response = await apis.getDetailSong(curSongId);
            if (response.data.err === 0) {
                setSongInfo(response.data.data);
            }
        };
        fetchDetailSong();
    }, [curSongId]);
    return (
        <div className="h-full px-5 flex">
            <div className="w-[30%] border border-black flex-auto flex items-center gap-3">
                {/* <img src={songInfo?.thumbnail} alt="thumbnail" className="w-16 h-16 rounded-md object-cover"/>
                <div className="flex flex-col">
                    <span>{songInfo?.title}</span>
                    <span>tac gia</span>
                </div>
                <div>
                    <span>tim</span>
                    <span>option</span>
                </div> */}

                <img src={songInfo?.thumbnail} />
                <div className="flex flex-col">
                    <span className="font-semibold text-main-300 text-sm">Shine Your Light</span>
                    <span className="font-medium text-main-200 text-xs">MIN</span>
                </div>
                <div className="flex gap-5 pl-3">
                    <span><PiHeart /></span>
                    <span><RxDotsHorizontal/></span>
                </div>
            </div>
            <div className="w-[40%] border border-black flex-auto text-center">player</div>
            <div className="w-[30%] border border-black flex-auto text-right ">control</div>
        </div>
    );
};

export default Player;
