// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`, // Your actual backend URL
      },
    ]
  },
  // Add this line
  allowedDevOrigins: ["http://192.168.1.5:3000", "http://localhost:3000"],

  // ... any other config you might have
};


export default nextConfig; // Correct for .mjs files