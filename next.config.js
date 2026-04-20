/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'stream.mux.com' },
      { protocol: 'https', hostname: 'image.mux.com' },
    ],
  },
  async headers() {
    return [{
      source: '/v1.mp4',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000' }]
    }]
  },
}

module.exports = nextConfig
