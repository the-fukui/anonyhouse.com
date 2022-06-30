const withReactSvg = require('next-react-svg')
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = withReactSvg({
  reactStrictMode: true,
  experimental: {
    externalDir: true,
    swcMinify: true,
    // concurrentFeatures: true,
    // serverComponents: true,
  },
  transpileModules: ['../shared/**/*.ts'],
  include: path.resolve(__dirname, 'components/svg'),
})

module.exports = nextConfig
