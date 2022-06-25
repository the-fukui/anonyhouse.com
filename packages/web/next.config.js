const withReactSvg = require('next-react-svg')
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = withReactSvg({
  reactStrictMode: true,
  experimental: {
    swcMinify: true,
    // concurrentFeatures: true,
    // serverComponents: true,
  },
  include: path.resolve(__dirname, 'components/svg'),
  webpack(config, options) {
    return config
  },
})

module.exports = nextConfig
