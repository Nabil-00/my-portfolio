/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'accent': '#00ff88',
                'surface-color': '#111512',
                'text-secondary': '#9aa39c',
            },
        },
    },
    plugins: [],
}
