// If you want to use other PostCSS plugins, see the following:
// https://tailwindcss.com/docs/using-with-preprocessors
const config = require("./tailwind.config.ts");

module.exports = {
  plugins: {
    tailwindcss: { config }, // 注意config路径
    autoprefixer: {},
  },
};
