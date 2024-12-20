import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    esmExternals: "loose",
  },
};

module.exports = nextConfig;
