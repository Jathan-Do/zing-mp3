import React from "react";
import icons from "../utils/icon";

const { IoIosSearch } = icons;

const Search = () => {
    return (
        <div className="flex w-full">
            <span className="text-main-200 hover:text-[#696969] bg-main-300 flex items-center justify-center cursor-pointer rounded-l-[20px] px-2">
                <IoIosSearch size={26} />
            </span>
            <input
                type="text"
                className="outline-none w-full bg-main-300 h-10 py-[5px] text-main-300 rounded-r-[20px] placeholder:text-main-200"
                placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
            />
        </div>
    );
};

export default Search;
