import React, { useState } from "react";
import icons from "../utils/icon";
import * as actions from "../store/actions";
import { useDispatch } from "react-redux";
import { useNavigate, createSearchParams } from "react-router-dom";
import path from "../utils/paths";

const { IoIosSearch } = icons;

const Search = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [keyWord, setKeyWord] = useState("");

    const handleSearch = async (e) => {
        //when tab enter
        if (e.keyCode === 13) {
            dispatch(actions.search(keyWord));
            navigate({
                pathname: `/${path.SEARCH}/${path.ALL_SONG}`,
                search: createSearchParams({ q: keyWord }).toString(),//tạo url hash code for search
            });
        }
    };
console.log(keyWord);

    return (
        <div className="flex w-full">
            <span className="text-main-200 hover:text-[#696969] bg-main-300 flex items-center justify-center cursor-pointer rounded-l-[20px] px-2">
                <IoIosSearch size={26} />
            </span>
            <input
                type="text"
                className="outline-none w-full bg-main-300 h-10 py-[5px] text-main-300 rounded-r-[20px] placeholder:text-main-200"
                placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                value={keyWord}
                onChange={(e) => setKeyWord(e.target.value)}
                onKeyUp={handleSearch}
            />
        </div>
    );
};

export default Search;
