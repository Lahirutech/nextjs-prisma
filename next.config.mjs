/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwind-generator.b-cdn.net",
      },
    ],
  },
};

export default nextConfig;
