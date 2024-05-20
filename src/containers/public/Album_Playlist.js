import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment";
import { ListSong } from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";

const Album_Playlist = () => {
    const { title, pid } = useParams();

    const [playListData, setPlayListData] = useState({});

    useEffect(() => {
        const fetchDetailPlaylist = async () => {
            const reponse = await apis.apiGetDetailPlaylist(pid);
            if (reponse?.data.err === 0) {
                setPlayListData(reponse.data?.data);
            }
            console.log(reponse);
        };
        
        fetchDetailPlaylist();
    }, [pid]);

    return (
        <div className="flex py-6 w-full h-full px-[59px] gap-8 ">
            <div className="flex items-center flex-col gap-2 w-2/5">
                <img
                    src={playListData?.thumbnailM}
                    alt="thumbnail"
                    className="w-full object-contain rounded-md shadow-[0_5px_20px_-9px_rgba(0,0,0,0.60)]"
                />

                <div className="flex flex-col gap-1 items-center">
                    <h3 className="font-bold text-xl text-gray-700 pt-2">{playListData?.title}</h3>
                    <span className="text-xs text-main-200 font-medium">
                        <span>Cập nhật: </span>
                        <span>{moment.unix(playListData?.contentLastUpdate).format("DD/MM/YYYY")}</span>
                    </span>
                    <span className="text-xs text-main-200 text-center font-medium">{playListData?.artistsNames}</span>
                    <span className="text-xs text-main-200 font-medium">{`${Math.round(
                        playListData?.like / 1000
                    )}K người yêu thích`}</span>
                </div>
            </div>
            <Scrollbars style={{ width: "100%", height: "calc(100% - 50px)" }} autoHide>
                <div className="flex-auto ">
                    <span className="text-gray-500 font-normal text-sm">Lời tựa </span>
                    <span className="text-sm text-gray-700 ">{playListData?.sortDescription}</span>
                    <ListSong songData={playListData?.song?.items} totalDuration={playListData?.song?.totalDuration} />
                </div>
            </Scrollbars>
        </div>
    );
};

export default Album_Playlist;
