/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            display: ["Cal Sans", "sans-serif"],
            mono: ["Consolate Elf", "monospace"],
        },
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        logs: false,
        styled: true,
        base: true,
        themes: [
            {
                pomodoro: {
                    primary: "#ea0000",
                    secondary: "#c10000",
                    accent: "#2cb546",
                    neutral: "#202020",
                    "base-200": "#ff3636",
                    "base-100": "#c10000",
                    info: "#FFE603",
                    success: "#FFE226",
                    warning: "#EFD7BB",
                    error: "#E58B8B",
                },
            },
            "lofi",
            "night",
        ],
    },
};
