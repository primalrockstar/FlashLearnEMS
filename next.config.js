/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true
  },
  
  // React Compiler (moved from experimental in Next.js 16)
  reactCompiler: true,
  
  // Turbopack configuration for Next.js 16
  turbopack: {},
  
  // Disable image optimization for Netlify
  images: {
    unoptimized: true
  },
  
  // Compress responses
  compress: true,
  
  // Power pack optimizations
  poweredByHeader: false,
  
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'ChapterFlashEMT',
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  }
}

module.exports = nextConfig