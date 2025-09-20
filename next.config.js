/** @type {import('next').NextConfig} */
const nextConfig = {
  // Commented out for now to enable API routes
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig