import icons from "./icon";

const { MdOutlineLibraryMusic, TbChartArcs, TbChartDots3 } = icons;
const sidebarMenu = [
    {
        path: "mymusic",
        text: "Thư viện",
        icon: <MdOutlineLibraryMusic size={24} />,
    },
    {
        path: "",
        text: "Khám phá",
        icon: <TbChartArcs size={24} />,
    },
    {
        path: "zing-chart",
        text: "#zingchart",
        icon: <TbChartDots3 size={24} />,
    },
];

export default sidebarMenu;
