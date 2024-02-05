/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: ['class'],
    theme: {
        extend: {
            boxShadow: {
                100: 'rgba(0,0,0,.12) 0px 4px 16px',
            },
            colors: {
                primary: '#fe2c55',
                black: '#000',
                white: '#fff',
                gray: {
                    50: '#e4e6eb',
                    100: ' #f3f3f5',
                    200: '#e4e6eb',
                    300: '#f1f1f1',
                    400: '#bcc0c4',
                    500: '#aaa',
                    600: '#65676b',
                    700: '#606770',
                    800: '#888',
                },
                green: {
                    50: '#5ad539',
                    100: '#5ad5394d',
                },
                overlay: '#d9d9d9',
            },
        },
    },
    plugins: [],
};
