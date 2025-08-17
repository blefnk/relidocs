import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "pbs.twimg.com", protocol: "https" },
      { hostname: "abs.twimg.com", protocol: "https" },
      { hostname: "i.ytimg.com", protocol: "https" },
    ],
  },
};

export default withMDX(config);
