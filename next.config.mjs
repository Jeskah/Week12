/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
      domains: [
  "mapupa.com",
  "dirtydishesmessykisses.com",
  "savoryrecipe.com",
],
    remotePatterns :[
      {
        protocol: "https",
        hostname: "**",
      }
    ]
  }
};

export default nextConfig;
