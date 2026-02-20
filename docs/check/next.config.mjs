/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/developerasun",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
