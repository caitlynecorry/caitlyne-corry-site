/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.caitlynecorry.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/the-work", destination: "/breathwork", permanent: true },
    ];
  },
};

export default nextConfig;
