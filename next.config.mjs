// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://pdf-app-backend-u4yr.onrender.com/:path*', // Your actual backend URL
      },
    ]
  },
  // Add this line
  allowedDevOrigins: ["http://192.168.1.5:3000", "http://localhost:3000"],

  // ... any other config you might have
};


export default nextConfig; // Correct for .mjs files