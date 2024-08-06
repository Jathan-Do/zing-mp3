import React from "react";
import { Outlet } from "react-router-dom";

const Search = () => {
    return (
        <div>
            <div className="flex h-[50px] mb-7 items-center border-b border-[#d3cfc6] px-[59px]">
                <span className="text-2xl font-bold text-main-300 border-r border-[#d3cfc6] pr-6">Kết quả tìm kiếm</span>
                <div className="flex text-base uppercase px-4 items-center font-medium">
                    <span className="px-4 hover:text-main-400 cursor-pointer hover:border-b border-[#644646]">Tất cả</span>
                    <span className="px-4 hover:text-main-400 cursor-pointer">Bài hát</span>
                    <span className="px-4 hover:text-main-400 cursor-pointer">Playlist/Album</span>
                </div>
            </div>
            <div className="px-[59px]">
                <Outlet />
            </div>
        </div>
    );
};

export default Search;
