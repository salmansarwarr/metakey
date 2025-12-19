import transpileModules from 'next-transpile-modules'

const withTH = transpileModules(['@pancakeswap/uikit', '@pancakeswap/wagmi', '@pancakeswap/sdk'])

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Optional: also ignore ESLint errors during builds
    ignoreDuringBuilds: true,
  },
}

export default withTH(nextConfig)