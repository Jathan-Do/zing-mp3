import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const Section = ({ data }) => {
    const navigate = useNavigate();

    const handleClickSection = (item) => {
        const albumPlaylistPath = item?.link?.split(".")[0];
        navigate(albumPlaylistPath);
    };
    return (
        <div className="mt-12 px-[59px]">
            <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-xl text-gray-700">{data?.title}</h3>
                <span className="text-xs text-main-200 font-medium">TẤT CẢ</span>
            </div>
            <div className="flex items-start justify-center gap-7">
                {data?.items?.map((item, index) => {
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

                            <span className="flex flex-col">
                                <span className="font-bold text-main-300 text-sm">
                                    {item.title.length > 28 ? `${item.title?.slice(0, 28)}...` : item.title}
                                </span>
                                {data?.sectionId === "h100" ? (
                                    <span>
                                        {item.artists.map((item) => {
                                            return <span>{`${item.name}, `}</span>;
                                        })}
                                    </span>
                                ) : (
                                    <span>
                                        {item.sortDescription.length > 42
                                            ? `${item.sortDescription?.slice(0, 42)}...`
                                            : item.sortDescription}
                                    </span>
                                )}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default memo(Section);
