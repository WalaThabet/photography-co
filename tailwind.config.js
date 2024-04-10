const withMT = require("@material-tailwind/react/utils/withMT");


module.exports = withMT({
 content: [
   './app/views/**/*.html.erb',
   './app/helpers/**/*.rb',
   './app/javascript/**/*.{js,jsx,ts,tsx}',
 ],
 theme: {
   extend: {},
 },
 plugins: [],
})
