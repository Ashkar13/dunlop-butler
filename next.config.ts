import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // All imagery ships with the repo; no remote loaders are configured.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
