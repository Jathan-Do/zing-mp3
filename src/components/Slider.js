import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getArrSlider } from "../utils/function";
import * as actions from "../store/actions";
import { useNavigate } from "react-router-dom";

const Slider = () => {
    const { banner } = useSelector((state) => state.app); //dùng useSelector để lấy đúng vào reducer cần dùng

    const dispatch = useDispatch();

    const navigate = useNavigate();

    //animation for banner
    useEffect(() => {
        const sliderElements = document?.querySelectorAll(".slider-item");
        let start = 0;
        let end = 2;
        const interval = setInterval(() => {
            const listSlider = getArrSlider(start, end, sliderElements.length - 1);
            for (let i = 0; i < sliderElements.length; i++) {
                //remove class from slider
                sliderElements[i]?.classList?.remove("animate-slide-right", "order-last", "z-0");
                sliderElements[i]?.classList?.remove("animate-slide-left", "order-first", "z-10");
                sliderElements[i]?.classList?.remove("animate-slide-left-2", "order-2", "z-10");

                //hide slide elements
                if (listSlider?.some((item) => item === i)) {
                    sliderElements[i].style.display = "block";
                } else {
                    sliderElements[i].style.display = "none";
                }
            }
            //add class to slide elements
            listSlider?.forEach((item) => {
                if (item === end) {
                    sliderElements[item]?.classList?.add("animate-slide-right", "order-last", "z-0");
                } else if (item === start) {
                    sliderElements[item]?.classList?.add("animate-slide-left", "order-first", "z-10");
                } else {
                    sliderElements[item]?.classList?.add("animate-slide-left-2", "order-2", "z-10");
                }
            });
            start = start === sliderElements.length - 1 ? 0 : start + 1;
            end = end === sliderElements.length - 1 ? 0 : end + 1;
        }, 3000);
        return () => {
            interval && clearInterval(interval);
        };
    }, []);

    //Function handle click banner
    const handleClickBanner = (item) => {
        if (item?.type === 1) {
            dispatch(actions.setCurSongId(item.encodeId));
            dispatch(actions.playMusic(true));
            dispatch(actions.setPlayList(null));
        } else if (item?.type === 4) {
            const albumPlaylistPath = item?.link?.split(".")[0];
            navigate(albumPlaylistPath);
        } else {
            dispatch(actions.setPlayList(null));
        }
    };

    return (
        <div className="flex gap-8 w-full overflow-hidden px-[59px] pt-8">
            {banner?.map((item, index) => (
                <img
                    key={item.encodeId}
                    src={item.banner}
                    className={`slider-item rounded-lg w-[30%] object-contain flex-1 cursor-pointer ${
                        index <= 2 ? "block" : "hidden"
                    }`}
                    alt="banner"
                    onClick={() => handleClickBanner(item)} //dùng callback nếu không mặc định load web nó sẽ tự click tất cả item
                />
            ))}
        </div>
    );
};

export default Slider;
