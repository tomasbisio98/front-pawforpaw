/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // permite todas las rutas de Cloudinary
      },
    ],
  },
};

module.exports = nextConfig;
