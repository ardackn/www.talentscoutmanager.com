const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'stream.mux.com' },
      { protocol: 'https', hostname: 'image.mux.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ]
  },
  async headers() {
    return [{
      source: '/v1.mp4',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000' }]
    }]
  }
}
module.exports = nextConfig
