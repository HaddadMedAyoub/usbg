import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // generate the /out folder for static hosting
  trailingSlash: true,   // <<--- add this line
    reactStrictMode: false, // ← Try turning off temporarily to debug

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    unoptimized: true, // required for static export
  },
};

export default nextConfig;