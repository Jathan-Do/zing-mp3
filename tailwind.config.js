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
                "main-300": "#32323d",
                "main-200": "#757575",
                "main-100": "#afadae",
            },
            keyframes: {
                "slide-right": {
                    "0%": {
                        "-webkit-transform": "translateX(-500px);",
                        opacity: 0.4,
                        transform: "translateX(-500px);",
                    },
                    "100%": {
                        "-webkit-transform": "translateX(0);",
                        opacity: 1,
                        transform: "translateX(0);",
                    },
                },
                "slide-left": {
                    "0%": {
                        "-webkit-transform": "translateX(500px);",
                        transform: "translateX(500px);",
                    },
                    "100%": {
                        "-webkit-transform": "translateX(0);",
                        transform: "translateX(0);",
                    },
                },
                "slide-left-2": {
                    "0%": {
                        "-webkit-transform": "translateX(500px);",
                        transform: "translateX(500px);",
                    },
                    "100%": {
                        "-webkit-transform": "translateX(0);",
                        transform: "translateX(0);",
                    },
                },
            },
            animation: {
                "slide-right": "slide-right 1s cubic-bezier(0, 0, 0.2, 1) both;",
                "slide-left": "slide-left 1s cubic-bezier(0, 0, 0.2, 1) both;",
                "slide-left-2": "slide-left-2 1s cubic-bezier(0, 0, 0.2, 1) both;",
            },
        },
        screens: {
            1200: "1200px",
        },
    },
    plugins: [],
};
