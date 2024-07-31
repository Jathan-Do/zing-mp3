import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import icons from "../utils/icon";
import * as apis from "../apis";
import * as actions from "../store/actions";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSong from "./LoadingSong";

const {
    SlVolume1,
    SlVolume2,
    SlVolumeOff,
    PiHeart,
    PiHeartFill,
    PiPlaylist,
    RxDotsHorizontal,
    PiRepeatLight,
    PiRepeatOnceLight,
    PiShuffleLight,
    BsFillSkipStartFill,
    BsSkipEndFill,
    PiPlayFill,
    HiMiniPause,
} = icons;

var intervalId;

const Player = ({ showRightSidebar }) => {
    const { curSongId, isPlaying, songs } = useSelector((state) => state.music); //dùng useSelector để lấy đúng vào reducer cần dùng

    const [songInfo, setSongInfo] = useState(null);

    const [curSecond, setCurSecond] = useState(0);

    const [audio, setAudio] = useState(new Audio());

    const [isShuffle, setIsShuffle] = useState(false);

    const [repeatMode, setRepeatMode] = useState(0);

    const [isLoadedSource, setIsLoadedSource] = useState(true);

    const [volume, setVolume] = useState(0.7);

    const dispatch = useDispatch();

    const thumbRef = useRef();

    const trackRef = useRef();

    const volumeTrackRef = useRef();

    const volumeThumbRef = useRef();
    //GET API
    useEffect(() => {
        const fetchDetailSong = async () => {
            setIsLoadedSource(false);
            const [response1, response2] = await Promise.all([
                apis.apiGetDetailSong(curSongId),
                apis.apiGetSong(curSongId),
            ]);
            setIsLoadedSource(true);
            if (response1.data.err === 0) {
                setSongInfo(response1.data.data);
                dispatch(actions.setCurSongData(response1.data.data));
            }
            if (response2.data.err === 0) {
                const currentVolume = audio.volume; // Lưu lại volume hiện tại
                audio.pause();
                const newAudio = new Audio(response2.data.data["128"]);
                newAudio.volume = currentVolume; // Thiết lập lại volume cho audio mới
                setAudio(newAudio);
            }
            //Truong hop VIP song
            else {
                audio.pause();
                setAudio(new Audio());
                dispatch(actions.playMusic(false));
                toast.warn(response2.data.msg);
                setCurSecond(0);
                thumbRef.current.style.cssText = `right: 100%`;
            }
        };
        fetchDetailSong();
    }, [curSongId]);

    //hanlde thanh progress bar
    useEffect(() => {
        intervalId && clearInterval(intervalId);
        audio.pause();
        audio.load();
        audio.currentTime = 0;
        if (isPlaying && thumbRef.current) {
            audio.play();
            intervalId = setInterval(() => {
                let percent = Math.round((audio.currentTime * 10000) / songInfo?.duration) / 100;
                if (thumbRef.current) {
                    thumbRef.current.style.cssText = `right: ${100 - percent}%`;
                }
                setCurSecond(Math.round(audio.currentTime) / 10);
            }, 10);
        }
    }, [audio]);

    //handle check Shuffle song or Repeat song when music ended
    useEffect(() => {
        const handleEnded = () => {
            if (isShuffle && repeatMode === 1) {
                handleRepeatOne();
            } else if (repeatMode) {
                repeatMode === 1 ? handleRepeatOne() : handleNextSong();
            } else if (isShuffle) {
                handleShuffleSong();
            } else {
                audio.pause();
                dispatch(actions.playMusic(false));
            }
        };
        audio.addEventListener("ended", handleEnded);
        return () => {
            audio.removeEventListener("ended", handleEnded);
        };
    }, [audio, repeatMode, isShuffle]);

    //handle change volume
    useEffect(() => {
        audio.volume = volume;
        const percent = volume * 100;
        volumeThumbRef.current.style.cssText = `right: ${100 - percent}%`;
    }, [volume]);

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

    //hanlde thanh progress bar
    const handleClickProgressBar = (e) => {
        const trackLocation = trackRef.current.getBoundingClientRect(); //trả về tọa độ của thẻ
        const percent = Math.round(((e.clientX - trackLocation.left) * 10000) / trackLocation.width) / 100; //lấy % thanh progress tại vị trí click
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        audio.currentTime = (percent * songInfo?.duration) / 100;
        setCurSecond(Math.round(audio.currentTime) / 10);
    };

    //handle volume change
    const handleVolumeChange = (e) => {
        const volumeTrackLocation = volumeTrackRef.current.getBoundingClientRect();
        const percent = Math.round(((e.clientX - volumeTrackLocation.left) * 10000) / volumeTrackLocation.width) / 100;
        volumeThumbRef.current.style.cssText = `right: ${100 - percent}%`;
        audio.volume = percent / 100;
        setVolume(audio.volume);
    };
    //handle toggle button next
    const handleNextSong = () => {
        if (songs) {
            let curSongIndex;
            songs?.forEach((item, index) => {
                if (item.encodeId === curSongId) {
                    curSongIndex = index;
                }
            });
            dispatch(actions.setCurSongId(songs[curSongIndex + 1].encodeId));
            dispatch(actions.playMusic(true));
        }
    };

    //handle toggle button pre
    const handlePreSong = () => {
        if (songs) {
            let curSongIndex;
            songs?.forEach((item, index) => {
                if (item.encodeId === curSongId) {
                    curSongIndex = index;
                }
            });
            dispatch(actions.setCurSongId(songs[curSongIndex - 1].encodeId));
            dispatch(actions.playMusic(true));
        }
    };

    //handle toggle button repeat one
    const handleRepeatOne = () => {
        audio.play();
    };

    //handle toggle button shuffle
    const handleShuffleSong = () => {
        const randomIndex = Math.round(Math.random() * songs?.length - 1);
        dispatch(actions.setCurSongId(songs[randomIndex].encodeId));
        dispatch(actions.playMusic(true));
    };

    return (
        <div className="h-full px-5 flex py-2 cursor-pointer border border-[#d3cfc6]">
            <div className="w-[30%] flex-auto flex items-center gap-3">
                <img src={songInfo?.thumbnail} alt="thumbnail" className="w-16 h-16 rounded-md object-cover" />
                <div className="flex flex-col">
                    <span className="font-semibold text-main-300 text-sm">{songInfo?.title}</span>
                    <span className="font-medium text-main-200 text-xs">{songInfo?.artists?.map((artist) => artist.name).join(", ")}</span>
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
                    <span
                        className={`${isShuffle ? "text-main-400" : "text-black"}`}
                        title="Bật phát ngẫu nhiên"
                        onClick={() => setIsShuffle(!isShuffle)}
                    >
                        <PiShuffleLight size={22} />
                    </span>
                    <span
                        onClick={handlePreSong}
                        className={`${!songs ? "text-gray-500 cursor-auto" : "cursor-pointer"}`}
                    >
                        <BsFillSkipStartFill size={24} />
                    </span>
                    <span
                        className="p-2 w-9 h-9 rounded-full border border-black hover:text-main-400 hover:border-[#844d4d]"
                        onClick={handleTogglePlayMusic}
                    >
                        {!isLoadedSource ? (
                            <LoadingSong />
                        ) : isPlaying ? (
                            <HiMiniPause size={18} />
                        ) : (
                            <PiPlayFill size={18} />
                        )}
                    </span>
                    <span
                        onClick={handleNextSong}
                        className={`${!songs ? "text-gray-500 cursor-auto" : "cursor-pointer"}`}
                    >
                        <BsSkipEndFill size={24} />
                    </span>
                    <span
                        className={`${repeatMode ? "text-main-400" : "text-black"}`}
                        onClick={() => setRepeatMode(repeatMode === 2 ? 0 : repeatMode + 1)}
                        title="Bật phát lại tất cả"
                    >
                        {repeatMode === 1 ? <PiRepeatOnceLight size={22} /> : <PiRepeatLight size={22} />}
                    </span>
                </div>
                <div className="w-full flex items-center justify-center text-xs font-semibold gap-3">
                    <div className="text-main-100 tabular-nums">{moment.utc(curSecond * 10000).format("mm:ss")}</div>
                    <div
                        className="w-4/5 h-[3px] rounded-full relative bg-[#c7c4bc] hover:h-[6px] track-container"
                        ref={trackRef}
                        onClick={handleClickProgressBar}
                    >
                        <div
                            ref={thumbRef}
                            className="absolute top-0 bottom-0 left-0 rounded-full bg-main-500 thumb-container"
                        ></div>
                        <style>{`
                            .track-container:hover .thumb-container::after {
                                content: "";
                                border-radius: 50%;
                                width: 12px;
                                height: 12px;
                                right: -6px;
                                top: -3px;
                                position: absolute;
                                background-color: #644646;
                            }
                        `}</style>
                    </div>

                    <div className="text-main-300">{moment.utc(songInfo?.duration * 1000).format("mm:ss")}</div>
                </div>
            </div>
            <div className="w-[30%] flex-auto items-center justify-end flex gap-4">
                {/* dấu cộng đơn (+) đặt trước để chuyển thành kiểu số */}
                <span onClick={() => setVolume((pre) => (+pre === 0 ? 0.7 : 0))}>
                    {+volume >= 0.5 ? <SlVolume2 /> : +volume === 0 ? <SlVolumeOff /> : <SlVolume1 />}
                </span>
                <div
                    className="w-1/6 h-[3px] rounded-full relative bg-[#c7c4bc] hover:h-[6px] track-volume"
                    ref={volumeTrackRef}
                    onClick={handleVolumeChange}
                >
                    <div
                        ref={volumeThumbRef}
                        className="absolute top-0 bottom-0 left-0 rounded-full bg-main-500 thumb-volume"
                    ></div>
                    <style>{`
                            .track-volume:hover .thumb-volume::after {
                                content: "";
                                border-radius: 50%;
                                width: 12px;
                                height: 12px;
                                right: -6px;
                                top: -3px;
                                position: absolute;
                                background-color: #644646;
                            }
                        `}</style>
                </div>

                <div className="h-8 border border-[#d3cfc6]"></div>
                {/* <span
                    onClick={() => showRightSidebar((pre) => !pre)}
                    className={`p-1 cursor-pointer rounded-[4px] opacity-90 hover:opacity-100 
                        ${showRightSidebar ? "text-white bg-main-500" : "text-black bg-main-100"}`}
                >
                    <PiPlaylist size={20} />
                </span> */}
                <span
                    onClick={() => showRightSidebar((pre) => !pre)}
                    className="p-1 cursor-pointer rounded-[4px] opacity-90 hover:opacity-100 
                        text-white bg-main-500"
                >
                    <PiPlaylist size={20} />
                </span>
            </div>
        </div>
    );
};

export default Player;
