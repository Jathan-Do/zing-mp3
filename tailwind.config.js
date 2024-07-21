/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}", "./public/index.html"],
    theme: {
        extend: {
            backgroundColor: {
                "main-100": "#e5e3df",
                "main-200": "#dedad1",
                "main-300": "#d9d7d4",
                "main-400": "#ceccc9",
                "main-500": "#644646",
            },
            textColor: {
                "main-500": "#644646",
                "main-400": "#844d4d",
                "main-300": "#444455",
                "main-200": "#757575",
                "main-100": "#afadae",
            },
            keyframes: {
                "slide-right-hidden": {
                    "0%": {
                        display: "block",
                        width: "288px",
                    },
                    "100%": {
                        display: "none",
                        width: "0",
                    },
                },
                "slide-left-show": {
                    "0%": {
                        display: "none",
                        width: "0",
                    },
                    "100%": {
                        display: "block",
                        width: "288px",
                    },
                },
                "slide-right": {
                    "0%": {
                        "-webkit-transform": "translateX(-600px);",
                        opacity: 0.4,
                        transform: "translateX(-600px);",
                    },
                    "100%": {
                        "-webkit-transform": "translateX(0);",
                        opacity: 1,
                        transform: "translateX(0);",
                    },
                },
                "slide-left": {
                    "0%": {
                        "-webkit-transform": "translateX(600px);",
                        transform: "translateX(600px);",
                    },
                    "100%": {
                        "-webkit-transform": "translateX(0);",
                        transform: "translateX(0);",
                    },
                },
                "slide-left-2": {
                    "0%": {
                        "-webkit-transform": "translateX(600px);",
                        transform: "translateX(600px);",
                    },
                    "100%": {
                        "-webkit-transform": "translateX(0);",
                        transform: "translateX(0);",
                    },
                },
                "rotate-center": {
                    "0%": {
                        "-webkit-transform": "rotate(0);",
                        transform: "rotate(0);",
                    },
                    "100%": {
                        "-webkit-transform": "rotate(360deg);",
                        transform: "rotate(360deg);",
                    },
                },
                "rotate-center-pause": {
                    "0%": {
                        "-webkit-transform": "rotate(360deg);",
                        transform: "rotate(360deg);",
                        "border-radius": "9999px",
                    },
                    "100%": {
                        "-webkit-transform": "rotate(0);",
                        transform: "rotate(0);",
                    },
                },
            },
            animation: {
                "slide-right": "slide-right 1s cubic-bezier(0, 0, 0.2, 1) both;",
                "slide-right-hidden": "slide-right-hidden 0.7s cubic-bezier(0, 0, 0.2, 1) both;",
                "slide-left-show": "slide-left-show 0.7s cubic-bezier(0, 0, 0.2, 1) both;",
                "slide-left": "slide-left 1s cubic-bezier(0, 0, 0.2, 1) both;",
                "slide-left-2": "slide-left-2 1s cubic-bezier(0, 0, 0.2, 1) both;",
                "rotate-center": "rotate-center 10s linear infinite both;",
                "rotate-center-pause": "rotate-center-pause 0.3s linear both;",
            },
            flex: {
                4: "4 4 0%",
                6: "6 6 0%",
                3: "3 3 0%",
                7: "7 7 0%",
            },
        },
        screens: {
            1200: "1200px",
            1100: "1100px",
        },
    },
    plugins: [],
};
