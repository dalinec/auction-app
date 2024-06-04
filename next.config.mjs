/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config, { webpack }) => {
  //   config.plugins.push(
  //     new webpack.IgnorePlugin({
  //       resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
  //     }),
  //   );

  //   return config;
  // },
  images: {
    remotePatterns: [
      {
        hostname: "pub-2ea83693adf649f5bd25828080ad8a37.r2.dev",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
