import type { NextConfig } from "next";
const nextConfig: NextConfig = { experimental: { serverActions: { bodySizeLimit: "4mb" } }, turbopack: { root: process.cwd() }, outputFileTracingRoot: process.cwd() };
export default nextConfig;
