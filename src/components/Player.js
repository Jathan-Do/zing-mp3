import React from "react";
import { useSelector } from "react-redux";

const Player = () => {
    const { curSongId } = useSelector((state) => state.music); //dùng useSelector để lấy đúng vào reducer cần dùng
    console.log(curSongId);
    return (
        <div className="h-full px-5 flex">
            <div className="w-[30%] border border-black flex-auto text-left">Detail</div>
            <div className="w-[40%] border border-black flex-auto text-center">player</div>
            <div className="w-[30%] border border-black flex-auto text-right ">control</div>
        </div>
    );
};

export default Player;
