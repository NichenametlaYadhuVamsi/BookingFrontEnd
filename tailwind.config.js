/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'disco':'#00eeff',
        'light-dark':'#161617',
      },
      spacing: {
        '2vh': '200vh',
        '100vw':'100vw',
        '100vh':'100vh',
        '80vh':'80vh',
        '60vw':'60vw',
        '2.5rem':'2.5rem',
        '4.2rem':'4.2rem',
        '7.5rem':'7.5rem',
        '10.5rem':'10.5rem',
        '6rem':'6rem',
        '14.25rem':'14.25rem',
        '22rem':'22rem',
        '36rem':'36rem',
        '9.2rem':'9.2rem',
        '2.5rem':'2.5rem',
        '96%':'96%',
        '21%':'21%',
        '32%':'32%',
        '92%':'92%',
        '25%':'25%',
        '75%':'75%',
        '33%':'33%',
        '67%':'67%',
        '80%':'80%'
      },
    },
  },
  plugins: [
    require('tailwindcss-filters'),
  ],
}
