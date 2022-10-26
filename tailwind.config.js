/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      zIndex: {
        '-999': '-999',
        '999': '999',
      },
      backgroundImage: {
        'img-default': 'url(\'https://media.inyaw.com/cover/7037ade43b1e484eac903a111b7ea709.jpg!inyaa\')',
        'img-mobile-default': 'url(\'https://media.inyaw.com/cover/52e362318fec4ab2ad4d3b57fd55ae79.png!inyaa\')',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
}
