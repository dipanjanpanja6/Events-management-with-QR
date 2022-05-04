/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // webpack5: true,
  webpack: (config, { isServer, dev }) => {
    // if (!isServer) {
    //   config.resolve.fallback.fs = false
    // }
    if (dev) {
      config.devtool = "cheap-module-source-map"
    }
    return config
  },
}
// for transpiling all ESM @fullcalendar/* packages
// also, for piping fullcalendar thru babel (to learn why, see babel.config.js)
const withTM = require("next-transpile-modules")(["@fullcalendar/common", "@fullcalendar/daygrid", "@fullcalendar/interaction", "@fullcalendar/react", "@fullcalendar/timegrid"])

module.exports = withTM(nextConfig)
