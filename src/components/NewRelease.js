import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SongItem from "./SongItem";

const NewRelease = () => {
    const { sectionItem5 } = useSelector((state) => state.app);
    const [isActive, setIsActive] = useState(0);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        if (isActive === 0) {
            setSongs(sectionItem5?.items?.all);
        } else if (isActive === 1) {
            setSongs(sectionItem5?.items?.vPop);
        } else {
            setSongs(sectionItem5?.items?.others);
        }
    }, [isActive, sectionItem5]);

    return (
        <div className="mt-12 px-[59px]">
            <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-xl text-gray-700">{sectionItem5?.title}</h3>
                <span className="text-xs text-main-200 font-medium">TẤT CẢ</span>
            </div>
            <div className="flex flex-col gap-5 text-xs">
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsActive(0)}
                        className={`py-1 px-6 rounded-l-full rounded-r-full bg-main-100 border border-[#ceccc8] ${
                            isActive === 0 && "bg-main-500 text-white"
                        }`}
                    >
                        TẤT CẢ
                    </button>
                    <button
                        onClick={() => setIsActive(1)}
                        className={`py-1 px-4 rounded-l-full rounded-r-full bg-main-100 border border-[#ceccc8] ${
                            isActive === 1 && "bg-main-500 text-white"
                        }`}
                    >
                        VIỆT NAM
                    </button>
                    <button
                        onClick={() => setIsActive(2)}
                        className={`py-1 px-4 rounded-l-full rounded-r-full bg-main-100 border border-[#ceccc8] ${
                            isActive === 2 && "bg-main-500 text-white"
                        }`}
                    >
                        QUỐC TẾ
                    </button>
                </div>
                <div className="flex flex-wrap w-full gap-5">
                    {songs?.map((item, index) => (
                        <SongItem
                            key={item.encodeId}
                            thumbnail={item.thumbnail}
                            title={item.title}
                            artists={item.artists.map((artist) => artist.name).join(", ")}
                            releaseDate={item.releaseDate}
                            index={index}
                            streamingStatus={item.streamingStatus}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewRelease;
