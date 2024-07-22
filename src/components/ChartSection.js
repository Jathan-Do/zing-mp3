import React, { memo, useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Chart } from "chart.js/auto";
import SongItem from "./SongItem";
import { Button } from "react-scroll";
import { Link } from "react-router-dom";
import _ from "lodash";
import path from "../utils/paths";
import icons from "../utils/icon";

const { PiPlayFill, BsPlayCircle } = icons;

const ChartSection = () => {
    const { sectionItem9 } = useSelector((state) => state.app);
    const [data, setData] = useState(null);
    const [tooltipState, setTooltipState] = useState({ opacity: 0, top: 0, left: 0 });
    const [selected, setSelected] = useState(null);
    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: {
                    display: false,
                    stepSize: (sectionItem9?.chart?.maxScore - sectionItem9?.chart?.minScore) / 5, // Adjust this value as needed
                },
                grid: { color: "rgba(255,255,255,0.2)", drawTicks: false },
                min: sectionItem9?.chart?.minScore,
                max: sectionItem9?.chart?.maxScore,
                border: { dash: [3, 4] },
            },
            x: {
                ticks: {
                    color: "rgba(255,255,255,0.5)",
                    callback: function (index) {
                        const hour = data?.labels[index];
                        return hour % 2 === 0 ? `${data.labels[index]}:00` : "";
                    },
                    // No rotation for x-axis labels
                    minRotation: 0,
                },
                grid: { color: "transparent" },
            },
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external: ({ tooltip }) => {
                    if (tooltip.opacity === 0) {
                        if (tooltipState.opacity !== 0) {
                            setTooltipState((prev) => ({ ...prev, opacity: 0 }));
                        }
                        return;
                    }
                    const counters = [];
                    for (let i = 0; i < 3; i++) {
                        counters.push({
                            data: sectionItem9?.chart?.items[Object.keys(sectionItem9?.chart?.items)[i]]?.map(
                                (item) => item.counter
                            ),
                            encodeId: Object.keys(sectionItem9?.chart?.items)[i],
                        });
                    }
                    const numberSelected = +tooltip.body[0]?.lines[0]?.replace(",", "");
                    const result = counters.find((item) => item.data.some((number) => number === numberSelected));
                    setSelected(result.encodeId);
                    const newTooltipData = {
                        opacity: 1,
                        top: tooltip.caretY,
                        left: tooltip.caretX,
                    };
                    if (!_.isEqual(tooltipState, newTooltipData)) {
                        setTooltipState(newTooltipData); //set tooltipState mới
                    }
                },
            },
        },
        hover: {
            mode: "dataset",
            intersect: false,
        },
    };
    useEffect(() => {
        const labels = sectionItem9?.chart?.times?.map((item) => item.hour);
        const datasets = [];
        if (sectionItem9?.chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: sectionItem9?.chart?.items[Object.keys(sectionItem9?.chart?.items)[i]]?.map(
                        (item) => item.counter
                    ),
                    borderColor: i === 0 ? "#4990e1" : i === 1 ? "#27be9c" : "#e35050",
                    tension: 0.3,
                    borderWidth: 2,
                    pointHoverRadius: 5,
                    pointBackgroundColor: "white",
                    pointHitRadius: 5,
                    pointBorderColor: i === 0 ? "#4990e1" : i === 1 ? "#27be9c" : "#e35050",
                    animation: false,
                    pointHoverBorderWidth: 3,
                });
            }
            setData({ labels, datasets });
        }
    }, [sectionItem9?.chart]);
    const getCustomStyle = (selected) => {
        const songIndex = sectionItem9?.items?.findIndex((item) => item.encodeId === selected);
        switch (songIndex) {
            case 0:
                return "justify-between items-center bg-[#4990e1]";
            case 1:
                return "justify-between items-center bg-[#27be9c]";
            case 2:
                return "justify-between items-center bg-[#e35050]";
            default:
                return "";
        }
    };
    return (
        <div className="mt-12 px-[59px] relative h-[415px]">
            <div className="h-full rounded-md top-0 left-[59px] right-[59px] bottom-0 bg-gradient-to-r from-[#391454] to-[#5c277d] p-5">
                <Link to={path.ZING_CHART} className="flex gap-4 items-center">
                    <h3 className="text-3xl bg-gradient-to-r from-orange-500 via-violet-600 to-sky-400 bg-clip-text text-transparent font-bold inline-block pb-5">
                        #zingchart
                    </h3>
                    <span className="p-[6px] rounded-full bg-white mb-[18px] hover:bg-[#e5e5e5]">
                        <PiPlayFill size={12} />
                    </span>
                </Link>

                <div className="flex gap-3 h-[75%]">
                    <div className="w-[34%] flex flex-col gap-3">
                        {sectionItem9?.items?.slice(0, 3)?.map((item, index) => (
                            <SongItem
                                key={item.encodeId}
                                thumbnail={item.thumbnail}
                                title={item.title}
                                artists={item.artistsNames}
                                songId={item.encodeId}
                                places={index + 1}
                                percent={Math.round((item.score * 100) / sectionItem9?.chart?.totalScore)}
                                showSong // để hiển thị được tối đa 3 bài
                                style={`justify-between items-center bg-[#52296c] hover:bg-[#644379] text-[#52296c] hover:text-[#644379]`}
                            />
                        ))}
                        <Link
                            to={path.ZING_CHART}
                            className="text-sm w-fit m-auto text-center py-1 px-6 border border-white rounded-full text-white bg-transparent"
                        >
                            Xem Thêm
                        </Link>
                    </div>
                    <div className="w-[66%] relative">
                        {data && <Line data={data} options={options} />}
                        <div
                            className="tooltip"
                            style={{
                                top: tooltipState.top,
                                left: tooltipState.left,
                                opacity: tooltipState.opacity,
                                position: "absolute",
                            }}
                        >
                            {selected && (
                                <SongItem
                                    thumbnail={
                                        sectionItem9?.items?.find((item) => item.encodeId === selected)?.thumbnail
                                    }
                                    title={sectionItem9?.items?.find((item) => item.encodeId === selected)?.title}
                                    artists={
                                        sectionItem9?.items?.find((item) => item.encodeId === selected)?.artistsNames
                                    }
                                    songId={sectionItem9?.items?.find((item) => item.encodeId === selected)?.encodeId}
                                    percent={Math.round(
                                        (sectionItem9?.items?.find((item) => item.encodeId === selected)?.score * 100) /
                                            sectionItem9?.chart?.totalScore
                                    )}
                                    showSong // to display the selected song
                                    customStyle={getCustomStyle(selected)} // truyền style dựa trên vị trí bài hát
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(ChartSection);
