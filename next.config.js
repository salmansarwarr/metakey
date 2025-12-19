/* eslint-disable @typescript-eslint/no-var-requires */
const { withSentryConfig } = require('@sentry/nextjs')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const sentryWebpackPluginOptions =
  process.env.VERCEL_ENV === 'production'
    ? {
      silent: false,
      validate: true,
    }
    : {
      silent: true,
      dryRun: !process.env.SENTRY_AUTH_TOKEN,
    }

/** @type {import('next').NextConfig} */
const config = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    scrollRestoration: true,
  },
  transpilePackages: [
    '@pancakeswap/uikit',
    '@pancakeswap/sdk',
    '@uniswap/token-lists',
    '@reown/appkit',
    '@reown/appkit-adapter-wagmi',
    '@wagmi/core',
    '@wagmi/connectors',
  ],
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
  images: {
    domains: ['static-nft.pancakeswap.com'],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/info/token/:address',
        destination: '/info/tokens/:address',
      },
      {
        source: '/info/pool/:address',
        destination: '/info/pools/:address',
      },
      {
        source: '/info/pair/:address',
        destination: '/info/pools/:address',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/logo.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
      {
        source: '/images/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
      {
        source: '/images/tokens/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=604800',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/send',
        destination: '/swap',
        permanent: true,
      },
      {
        source: '/swap/:outputCurrency',
        destination: '/swap?outputCurrency=:outputCurrency',
        permanent: true,
      },
      {
        source: '/create/:currency*',
        destination: '/add/:currency*',
        permanent: true,
      },
      {
        source: '/farms/archived',
        destination: '/farms/history',
        permanent: true,
      },
      {
        source: '/pool',
        destination: '/liquidity',
        permanent: true,
      },
      {
        source: '/staking',
        destination: '/pools',
        permanent: true,
      },
      {
        source: '/syrup',
        destination: '/pools',
        permanent: true,
      },
      {
        source: '/collectibles',
        destination: '/nfts',
        permanent: true,
      },
    ]
  },
  webpack: (webpackConfig, { isServer, webpack }) => {
    // tree shake sentry tracing
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        __SENTRY_DEBUG__: false,
        __SENTRY_TRACING__: false,
      }),
    )

    // Add fallbacks for node modules
    webpackConfig.resolve.fallback = {
      ...webpackConfig.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    }

    // Exclude problematic packages
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      '@coinbase/wallet-sdk': false,
      '@base-org/account': false,
    }

    // Ignore problematic imports
    webpackConfig.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /@base-org\/account/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /@coinbase\/wallet-sdk/,
      })
    )

    return webpackConfig
  },
}

module.exports = withBundleAnalyzer(withSentryConfig(config, sentryWebpackPluginOptions))