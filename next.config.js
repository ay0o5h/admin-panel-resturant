/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
}
module.exports = {
webpack: (config) => {
    config.experiments = config.experiments || {}
    config.experiments.topLevelAwait = true
    return config
  },
  nextConfig,
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en', 'ar'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en',
  }
}