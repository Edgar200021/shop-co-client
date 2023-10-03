/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      padding: {
        clamp: 'clamp(18px, 5vw, 40px)',
      },
      backgroundImage: {
        search: "url('src/assets/icons/search.svg')",
        basket: "url('src/assets/icons/basket.svg')",
        user: "url('src/assets/icons/user.svg')",
        hero: "url('src/assets/images/hero.png')",
        frame: "url('src/assets/icons/frame.svg')",
      },
      width: {
        logo: 'clamp(120px, 8vw, 140px)',
        form: 'clamp(300px, 50vw, 500px)',
      },
      height: {
        logo: 'clamp(18px, 2vw, 22px)',
      },
      screens: {
        'lg-desktop': { max: '1400px' },
        desktop: { max: '1279px' },
        'lg-tablet': { max: '1024px' },
        tablet: { max: '772px' },
        'lg-phone': { max: '639px' },
        phone: { max: '400px' },
      },
      gridTemplateColumns: {
        'product-list': 'repeat(auto-fill, minmax(250px, 1fr))',
      },
    },
  },
  plugins: [],
}
