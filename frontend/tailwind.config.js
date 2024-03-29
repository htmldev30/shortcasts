module.exports = {
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {},
        extend: {
            colors: {
                text: {
                    DEFAULT: '#3D2C29',
                    50: '#B79A94',
                    100: '#AD8B85',
                    200: '#996E67',
                    300: '#7A5852',
                    400: '#5C423D',
                    500: '#3D2C29',
                    600: '#1F1615',
                    700: '#000000',
                    800: '#000000',
                    900: '#000000',
                },
                background: {
                    DEFAULT: '#FAFAF9',
                    50: '#FFFFFF',
                    100: '#FFFFFF',
                    200: '#FFFFFF',
                    300: '#FFFFFF',
                    400: '#FFFFFF',
                    500: '#FAFAF9',
                    600: '#E3E3DD',
                    700: '#CCCCC1',
                    800: '#B4B4A6',
                    900: '#9D9D8A',
                },
                primary: {
                    DEFAULT: '#E63B19',
                    50: '#FDEBE8',
                    100: '#FAD8D1',
                    200: '#F5B1A3',
                    300: '#F08975',
                    400: '#EB6247',
                    500: '#E63B19',
                    600: '#B82F14',
                    700: '#8A230F',
                    800: '#5C180A',
                    900: '#2E0C05',
                },
                secondary: {
                    DEFAULT: '#CC4C33',
                    50: '#FAEDEB',
                    100: '#F5DBD6',
                    200: '#EBB7AD',
                    300: '#E09485',
                    400: '#D6705C',
                    500: '#CC4C33',
                    600: '#A33D29',
                    700: '#7A2E1F',
                    800: '#521E14',
                    900: '#290F0A',
                },
                highlight: {
                    DEFAULT: '#F0DFDB',
                    50: '#FFFFFF',
                    100: '#FFFFFF',
                    200: '#FFFFFF',
                    300: '#FFFFFF',
                    400: '#FFFFFF',
                    500: '#F0DFDB',
                    600: '#E1BFB7',
                    700: '#D29F93',
                    800: '#C37F6F',
                    900: '#B45F4B',
                },
                purple: {
                    DEFAULT: '#2E1F7A',
                    50: '#A699E5',
                    100: '#9485E0',
                    200: '#705CD6',
                    300: '#4D34CB',
                    400: '#3D29A3',
                    500: '#2E1F7A',
                    600: '#1F1551',
                    700: '#0F0A29',
                    800: '#000000',
                    900: '#000000',
                },
                muted: {
                    DEFAULT: '#F3EEED',
                    50: '#FFFFFF',
                    100: '#FFFFFF',
                    200: '#FFFFFF',
                    300: '#FFFFFF',
                    400: '#FFFFFF',
                    500: '#F3EEED',
                    600: '#DFD1CE',
                    700: '#CAB4B0',
                    800: '#B69791',
                    900: '#A17A73',
                },
                gray: {
                    DEFAULT: '#996F66',
                    50: '#F5F1F0',
                    100: '#EBE2E0',
                    200: '#D6C5C2',
                    300: '#C2A9A3',
                    400: '#AD8C85',
                    500: '#996F66',
                    600: '#7A5952',
                    700: '#5C433D',
                    800: '#3D2C29',
                    900: '#1F1614',
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
