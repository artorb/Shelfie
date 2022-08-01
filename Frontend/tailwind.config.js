const plugin = require('tailwindcss/plugin')
module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    purge: [
        './src/**/*.tsx'
    ],
    theme: {
        extend: {
            fontSize: {
                'xxs': '0.50rem',
            },
            fontFamily: {
                'open_sans': ['"Open Sans"'],
                'dosis': ['"Dosis"'],
                'inter': ['"Inter"'],
                'chakra': ['"Chakra Petch"'],
            },
            colors: {
                metallic: {
                    100: '#526c7a',
                    200: '#49616e',
                    300: '#415662',
                    400: '#394c56',
                    500: '#2f3e46',
                    600: '#29363d',
                    700: '#212b31',
                    800: '#182025',
                    900: '#101618',
                },
                primary: {
                    100: '#5A7477',
                    200: '#354F52',
                    300: '#2F3E46',
                },
                primary_dark: {
                    100: '#252561',
                    200: '#1A1938',
                    300: '#111827',
                },
            }
        },
        container: {
            center: true,
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        plugin(function ({addUtilities}) {
            addUtilities({
                    '.scrollbar-hide': {
                        /* IE and Edge */
                        '-ms-overflow-style': 'none',

                        /* Firefox */
                        'scrollbar-width': 'none',

                        /* Safari and Chrome */
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        }
                    }
                }
            )
        })
    ],
}
