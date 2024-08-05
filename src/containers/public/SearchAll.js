import React from "react";
import { useSelector } from "react-redux";

const SearchAll = () => {
    const { searchData } = useSelector((state) => state.music);
    return (
        <div className="w-full flex flex-col">
           all
        </div>
    );
};

export default SearchAll;
