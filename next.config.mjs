/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.caitlynecorry.com" },
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
    ],
  },
  experimental: {
    serverActions: { bodySizeLimit: "2mb" },
  },
  async redirects() {
    return [
      { source: "/the-work", destination: "/breathwork", permanent: true },
    ];
  },
};

export default nextConfig;
