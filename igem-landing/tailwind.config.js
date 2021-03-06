module.exports = {
    purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        container: {
            screens: {
                sm: "100%",
                md: "100%",
                lg: "900px",
                xl: "900px",
                "2xl": "900px",
            },
        },
        fontFamily: {
            serif: [
                "Lora",
                "ui-serif",
                "Georgia",
                "Cambria",
                "Times New Roman",
                "Times",
                "serif",
            ],
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
