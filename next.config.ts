const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'img.canal1.com.co',
      },
      {
        protocol: 'https',
        hostname: 'cloudfront-us-east-1.images.arcpublishing.com',
      },
      {
        protocol: 'https',
        hostname: 'blog.laikamascotas.cl',
      },
            {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
};

export default nextConfig;