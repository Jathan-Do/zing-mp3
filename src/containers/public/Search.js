import React from "react";
import { Outlet } from "react-router-dom";

const Search = () => {
    return (
        <div>
            <div className="flex h-[50px] mb-7 items-center border-b border-[#d3cfc6] px-[59px]">
                <span className="text-2xl font-bold text-main-300 border-r border-[#d3cfc6] pr-6">Kết quả tìm kiếm</span>
                <div className="flex text-base uppercase px-4 items-center">
                    <span >Tất cả</span>
                    <span >Tất cả</span>
                    <span >Tất cả</span>
                </div>
            </div>
            <div className="px-[59px]">
                <Outlet />
            </div>
        </div>
    );
};

export default Search;
