import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import icons from "../utils/icon";
import * as apis from "../apis";
import * as actions from "../store/actions";
import moment from "moment";

const {
    PiHeart,
    PiHeartFill,
    RxDotsHorizontal,
    PiRepeatLight,
    PiShuffleLight,
    BsFillSkipStartFill,
    BsSkipEndFill,
    PiPlayFill,
    HiMiniPause,
} = icons;

var intervalId;

const Player = () => {
    const { curSongId, isPlaying } = useSelector((state) => state.music); //dùng useSelector để lấy đúng vào reducer cần dùng

    const [songInfo, setSongInfo] = useState(null);

    const [curSecond, setCurSecond] = useState(0);

    const [audio, setAudio] = useState(new Audio());

    const dispatch = useDispatch();

    const thumbRef = useRef();

    //GET API
    useEffect(() => {
        const fetchDetailSong = async () => {
            const [response1, response2] = await Promise.all([
                apis.apiGetDetailSong(curSongId),
                apis.apiGetSong(curSongId),
            ]);
            if (response1.data.err === 0) {
                setSongInfo(response1.data.data);
            }
            if (response2.data.err === 0) {
                audio.pause();
                setAudio(new Audio(response2.data.data["128"]));
                // setCurSecond(0)
            }
        };
        fetchDetailSong();
    }, [curSongId]);

    //hanlde thanh progress bar
    useEffect(() => {
        if (isPlaying) {
            intervalId = setInterval(() => {
                let percent = Math.round((audio.currentTime * 10000) / songInfo?.duration) / 100;
                thumbRef.current.style.cssText = `right: ${100 - percent}%`;
                setCurSecond(Math.round(audio.currentTime) / 10);
            }, 10);
        } else {
            intervalId && clearInterval(intervalId);
        }
    }, [isPlaying]);

    //handle khi mới load web có cho phát nhạc hay không
    useEffect(() => {
        audio.load();
        if (isPlaying) {
            audio.play();
        }
    }, [audio]);

    //funct handle toggle button play music
    const handleTogglePlayMusic = async () => {
        if (isPlaying) {
            audio.pause();
            dispatch(actions.playMusic(false));
        } else {
            audio.play();
            dispatch(actions.playMusic(true));
        }
    };
    return (
        <div className="h-full px-5 flex py-2 cursor-pointer border border-[#d3cfc6]">
            <div className="w-[30%] flex-auto flex items-center gap-3">
                <img src={songInfo?.thumbnail} alt="thumbnail" className="w-16 h-16 rounded-md object-cover" />
                <div className="flex flex-col">
                    <span className="font-semibold text-main-300 text-sm">{songInfo?.title}</span>
                    <span className="font-medium text-main-200 text-xs">{songInfo?.artistsNames}</span>
                </div>
                <div className="flex gap-5 pl-3">
                    <span>
                        <PiHeart />
                    </span>
                    <span>
                        <RxDotsHorizontal />
                    </span>
                </div>
            </div>
            <div className="w-[40%] flex-auto flex flex-col items-center justify-center gap-3">
                <div className="flex gap-6 justify-center items-center">
                    <span title="Bật phát ngẫu nhiên">
                        <PiShuffleLight size={22} />
                    </span>
                    <span>
                        <BsFillSkipStartFill size={24} />
                    </span>
                    <span
                        className="p-2 w-9 h-9 rounded-full border border-black hover:text-main-400 hover:border-[#844d4d]"
                        onClick={handleTogglePlayMusic}
                    >
                        {isPlaying ? <HiMiniPause size={18} /> : <PiPlayFill size={18} />}
                    </span>
                    <span>
                        <BsSkipEndFill size={24} />
                    </span>
                    <span title="Bật phát lại tất cả">
                        <PiRepeatLight size={22} />
                    </span>
                </div>
                <div className="w-full flex">
                    <div className="text-xs font-semibold text-main-100">
                        {moment.utc(curSecond * 10000).format("mm:ss")}
                    </div>
                    <div className="w-4/5 m-auto h-[3px] rounded-full relative bg-[#c7c4bc]">
                        <div ref={thumbRef} className="absolute top-0 left-0 h-[3px] rounded-full bg-main-500"></div>
                    </div>
                    <div className="text-xs font-semibold text-main-300">
                        {moment.utc(songInfo?.duration * 1000).format("mm:ss")}
                    </div>
                </div>
            </div>
            <div className="w-[30%] border border-black flex-auto ">control</div>
        </div>
    );
};

export default Player;
