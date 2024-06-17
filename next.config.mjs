/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['pg.tsx', 'api.ts', 'api.tsx'],
  images: {
    dangerouslyAllowSVG: true,
  },
}
export default nextConfig
