/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  //   i18n: {
  //     locales: ["en", "vi", "ja"],
  //     defaultLocale: "en",
  //   },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'viva-cms-en.okhub.tech',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'viva-cms.okhub.tech'
  //     },{
  //       protocol: 'https',
  //       hostname: 'res.cloudinary.com'
  //     }
  //   ]
  // },
  images: {
    loader: 'custom',
    loaderFile: './loader.js'
  }
}

module.exports = nextConfig
