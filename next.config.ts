import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/usbg",
  assetPrefix: "/usbg/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;