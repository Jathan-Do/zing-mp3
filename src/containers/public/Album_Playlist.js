import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment";

const Album_Playlist = () => {
    const { title, pid } = useParams();

    const [playListData, setPlayListData] = useState({});

    useEffect(() => {
        const fetchDetailPlaylist = async () => {
            const reponse = await apis.apiGetDetailPlaylist(pid);
            console.log(reponse);
            if (reponse?.data.err === 0) {
                setPlayListData(reponse.data?.data);
            }
        };
        fetchDetailPlaylist();
    }, [pid]);

    return (
        <div className="flex py-6 px-[59px] gap-8">
            <div className="flex items-center flex-col w-1/3">
                <img
                    src={playListData?.thumbnailM}
                    alt="thumbnail"
                    className="w-full object-contain rounded-md shadow-[0_5px_20px_-9px_rgba(0,0,0,0.60)]"
                />
                <h3 className="font-bold text-xl text-gray-700 pt-2 pb-1">{playListData?.title}</h3>

                <div className="flex flex-col gap-1 items-center">
                    <span className="text-xs text-main-200 font-medium">
                        <span>Cập nhật: </span>
                        <span>{moment.unix(playListData?.contentLastUpdate).format("DD/MM/YYYY")}</span>
                    </span>
                    <span className="text-xs text-main-200 text-center font-medium">
                        {playListData?.artistsNames}
                    </span>
                    <span className="text-xs text-main-200 font-medium">{`${Math.round(
                        playListData?.like / 1000
                    )}K người yêu thích`}</span>
                </div>
            </div>

            <div className="flex-auto border border-blue-400">playlist</div>
        </div>
    );
};

export default Album_Playlist;
