import icons from "./icon";

const { MdOutlineLibraryMusic } = icons;
const sidebarMenu = [
    {
        path: "mymusic",
        text: "Cá nhân",
        icon: <MdOutlineLibraryMusic size={24} />,
    },
    {
        path: "",
        text: "Khám phá",
        icon: <MdOutlineLibraryMusic size={24} />,
    },
    {
        path: "zing-chart",
        text: "#zingchart",
        icon: <MdOutlineLibraryMusic size={24} />,
    },
];

export default sidebarMenu;
