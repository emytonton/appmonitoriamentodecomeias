/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Todas as requisições para /api serão redirecionadas
        destination: 'http://localhost:3001/:path*', // Para o backend na porta 3001
      },
    ];
  },
};

export default nextConfig;