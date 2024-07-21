import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../utils/icon";

const { RxDotsHorizontal, PiHeart, PiHeartFill, PiPlayFill, BsPlayCircle } = icons;

const Section = ({ data }) => {
    const navigate = useNavigate();

    const handleClickSection = (item) => {
        const albumPlaylistPath = item?.link?.split(".")[0];
        navigate(albumPlaylistPath, { state: { playAlbum: false } });
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
                            <div className="overflow-hidden rounded-md relative group">
                                <div className="absolute top-0 left-0 bottom-0 right-0 group-hover:backdrop-brightness-50 z-10 flex items-center justify-center gap-4 text-white">
                                    <span>
                                        <PiHeart size={20} />
                                    </span>
                                    <span
                                        className="p-[9px] w-10 h-10 rounded-full border border-white"
                                        onClick={(e) => {
                                            e.stopPropagation(); //ngăn nổi bọt bởi element cha
                                            navigate(item?.link?.split(".")[0], { state: { playAlbum: true } });
                                        }}
                                    >
                                        <PiPlayFill size={20} />
                                    </span>
                                    <span>
                                        <RxDotsHorizontal size={20} />
                                    </span>
                                </div>
                                <img
                                    className="w-full h-auto object-contain duration-700 group-hover:scale-110"
                                    src={item.thumbnailM}
                                    alt="avatar"
                                />
                            </div>
                            <span className="flex flex-col">
                                {data?.sectionId === "hEditorTheme" ||
                                data?.sectionId === "hEditorTheme3" ||
                                data?.sectionId === "hSeasonTheme" ||
                                data?.sectionId === "hEditorTheme4" ? (
                                    <span>
                                        {item.sortDescription.length > 42
                                            ? `${item.sortDescription.slice(0, 42)}...`
                                            : item.sortDescription}
                                    </span>
                                ) : data?.sectionId === "h100" || data?.sectionId === "hAlbum" ? (
                                    <>
                                        <span className="font-bold text-main-300 text-sm">
                                            {item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}
                                        </span>
                                        <span>
                                            {item.artists.map((artist) => artist.name).join(", ").length > 20
                                                ? `${item.artists
                                                      .map((artist) => artist.name)
                                                      .join(", ")
                                                      .slice(0, 20)}...`
                                                : item.artists.map((artist) => artist.name).join(", ")}
                                        </span>
                                    </>
                                ) : null}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default memo(Section);
