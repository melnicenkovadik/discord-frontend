const withMT = require("@material-tailwind/react/utils/withMT");

module.exports =  withMT({
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    default: {
      color:'white',
    },
    extend: {
      backgroundImage: {
        'login-background': 'url(\'../img/login-background.png\')',
        'no-friends': 'url(\'../img/no-friends.svg\')',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#000000',
      'gray':'#B9BBBE',
      'solidGray':'#1d1e20',
      'error': '#ED4245',
      'lightPurple': '#5a65ea',
      'lightBlue': '#00AFF4',
      'purple': '#6d28d9',
      'darkGray': '#2b324d',
      'gray-800':'#2f364f'
    },
  },
  plugins: [],
});