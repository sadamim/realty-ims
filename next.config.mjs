/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: output: "export" was removed deliberately. Static export disables
  // server-side rendering and route handlers, both of which this app now needs
  // in order to read MongoDB on the server.
  transpilePackages: ["swiper"],

  // The mongodb driver must stay a real Node module on the server rather than
  // being bundled by webpack/turbopack.
  serverExternalPackages: ["mongodb"],

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "realtyfocus.info",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
