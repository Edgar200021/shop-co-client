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
        logout: "url('src/assets/icons/logout.svg')",
        hero: "url('src/assets/images/hero.png')",
        frame: "url('src/assets/icons/frame.svg')",
        casual: "url('src/assets/images/categories/casual.png')",
        formal: "url('src/assets/images/categories/formal.png')",
        party: "url('src/assets/images/categories/party.png')",
        gym: "url('src/assets/images/categories/gym.png')",
        email: "url('src/assets/icons/email.svg')",
        delete: "url('src/assets/icons/delete.svg')",
        pencil: "url('src/assets/icons/pencil.svg')",
        orders: "url('src/assets/icons/orders.svg')",
        hearth: "url('src/assets/icons/hearth.svg')",
        location: "url('src/assets/icons/location.svg')",
        sun: "url('src/assets/icons/sun.svg')",
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
        'review-list': 'repeat(auto-fit, minmax(350px, 1fr))',
      },
    },
  },
  plugins: [],
}
