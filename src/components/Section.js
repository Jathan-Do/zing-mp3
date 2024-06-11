import React, { memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Section = () => {
    const { sectionItem } = useSelector((state) => state.app);

    const navigate = useNavigate();

    const handleClickSection = (item) => {
        const albumPlaylistPath = item?.link?.split(".")[0];
        navigate(albumPlaylistPath);
    };

    console.log(sectionItem);
    return (
        <div className="mt-12 px-[59px]">
            <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-xl text-gray-700">{sectionItem?.title}</h3>
                <span className="text-xs text-main-200 font-medium">TẤT CẢ</span>
            </div>
            <div className="flex items-center justify-center gap-7">
                {sectionItem?.items?.map((item, index) => {
                    return (
                        <div
                            className={`flex flex-auto flex-col gap-2 w-1/5 cursor-pointer text-sm text-main-200 ${
                                index <= 4 ? "block" : "hidden"
                            }`}
                            key={item.encodeId}
                            onClick={() => handleClickSection(item)}
                        >
                            <div className="overflow-hidden rounded-md">
                                <img
                                    className="w-full h-auto object-contain hover:scale-110 duration-700"
                                    src={item.thumbnailM}
                                    alt="avatar"
                                />
                            </div>

                            <span>{`${item.sortDescription?.slice(0, 42)}...`}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default memo(Section);
