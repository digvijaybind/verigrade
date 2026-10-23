/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Root is not a page. Send visitors into the default market.
      { source: '/', destination: '/ae', permanent: false },
      { source: '/index', destination: '/ae', permanent: false },
      // Keep bare section paths working — they have always meant UAE.
      { source: '/grading', destination: '/ae/grading-standard', permanent: false },
      { source: '/grade', destination: '/ae/grading-standard', permanent: false },
      { source: '/security', destination: '/ae/data-security', permanent: false },
      { source: '/certs', destination: '/ae/certifications', permanent: false },
      { source: '/warranty', destination: '/ae/warranty', permanent: false },
      { source: '/contact', destination: '/ae/contact', permanent: false },
      { source: '/quote', destination: '/ae/contact', permanent: false },
      { source: '/shipping', destination: '/ae/shipping', permanent: false },
    ];
  },
};

export default nextConfig;
