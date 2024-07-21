import React, { memo, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Chart } from "chart.js/auto";
import SongItem from "./SongItem";
import { Button } from "react-scroll";

const ChartSection = () => {
    const { sectionItem9 } = useSelector((state) => state.app);
    const [data, setData] = useState(null);

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

    return (
        <div className="mt-12 px-[59px] relative h-[415px]">
            <div className="h-full rounded-md top-0 left-[59px] right-[59px] bottom-0 bg-gradient-to-r from-[#391454] to-[#5d2680] p-5">
                <h3 className="text-3xl bg-gradient-to-r from-orange-500 via-violet-600 to-sky-400 bg-clip-text text-transparent font-bold inline-block pb-5">
                    #zingchart
                </h3>
                <div className="flex gap-3 h-[85%]">
                    <div className="w-[34%] flex flex-col gap-3">
                        {sectionItem9?.items?.slice(0, 3)?.map((item, index) => (
                            <SongItem
                                key={item.encodeId} // Added key prop
                                thumbnail={item.thumbnail}
                                title={item.title}
                                artists={item.artistsNames}
                                songId={item.encodeId}
                                places={index + 1}
                                percent={Math.round((item.score / sectionItem9?.chart?.totalScore) * 100)}
                                showSong// để hiển thị được tối đa 3 bài 
                            />
                        ))}
                        <Button>Xem Them</Button>
                    </div>
                    <div className="w-[66%]">{data && <Line data={data} options={options} />}</div>
                </div>
            </div>
        </div>
    );
};

export default memo(ChartSection);
