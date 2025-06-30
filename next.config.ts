/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "drive.google.com",
      "res.cloudinary.com",
      "cloudfront-us-east-1.images.arcpublishing.com",
      "example.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cloudfront-us-east-1.images.arcpublishing.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/**",
      },
        {
    protocol: 'https',
    hostname: 'upload.wikimedia.org',
    pathname: '/**',
  },
    ],
  },
};

module.exports = nextConfig;
