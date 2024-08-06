import React from "react";
import { useSelector } from "react-redux";

const SearchAll = () => {
    const { searchData } = useSelector((state) => state.music);
    console.log(searchData);

    return (
        <div className="w-full flex flex-col">
            <div className="flex flex-col">
                <h3 className="text-xl font-bold text-main-300 mb-5">Nổi bật</h3>
                <div className="flex gap-8">
                    {searchData?.top && (
                        <div className="p-[10px] flex flex-1 gap-6 items-center rounded-md bg-[#efeeec]">
                            <img
                                src={searchData?.top.thumbnail}
                                alt="avatar"
                                className={`h-20 w-20 object-cover ${
                                    searchData?.top.objectType === "artist" && "rounded-full"
                                }`}
                            />
                            <div className="flex flex-col text-xs text-main-200 font-semibold gap-1">
                                <span>{searchData?.top.objectType === "artist" ? "Nghệ sĩ" : ""}</span>
                                <span className="text-sm font-bold text-main-300">
                                    {searchData?.top.title || searchData?.top.name}
                                </span>
                                {searchData?.top.objectType === "artist" && (
                                    <span>
                                        {searchData?.artists[0].totalFollow >= 1000000
                                            ? `${Math.round(searchData?.artists[0].totalFollow / 1000000)}M quan tâm`
                                            : searchData?.artists[0].totalFollow >= 1000
                                            ? `${Math.round(searchData?.artists[0].totalFollow / 1000)}K quan tâm`
                                            : `${searchData?.artists[0].totalFollow} quan tâm`}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="flex-1">song1</div>
                    <div className="flex-1">song2</div>
                </div>
            </div>
        </div>
    );
};

export default SearchAll;
