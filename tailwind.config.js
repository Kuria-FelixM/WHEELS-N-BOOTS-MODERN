/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4E342E',      // Brown - main brand color
        secondary: '#757575',    // Gray
        light: '#212121',        // Dark/Black
        dark: '#D84315',         // Orange - accent
        accent: 'rgba(117, 117, 117, 0.1)', // Light gray background
      },
      fontFamily: {
        zuume: ['ZuumeRough', 'sans-serif'],
        zuumebold: ['ZuumeRoughbold', 'sans-serif'],
        lora: ['Lora', 'serif'],
        sans: ['Lora', 'sans-serif'],
      },
      fontWeight: {
        normal: 400,
        bold: 700,
      },
      fontSize: {
        'clamp-h1': 'clamp(30px, 8vw, 60px)',
        'clamp-h2': 'clamp(20px, 8vw, 50px)',
        'clamp-h3': 'clamp(20px, 6vw, 30px)',
        'clamp-h4': 'clamp(20px, 8vw, 50px)',
        'clamp-h5': 'clamp(20px, 5vw, 30px)',
        'clamp-p': 'clamp(18px, 4vw, 21px)',
        'clamp-p-sm': 'clamp(15px, 4vw, 20px)',
      },
      spacing: {
        'sidebar': '190px',
      },
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
  },
  plugins: [],
}
