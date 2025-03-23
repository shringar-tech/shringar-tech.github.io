// filepath: /Users/rajeshkrjha/Documents/GitHub/shringar-tech.github.io/next.config.mjs
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  assetPrefix: isProd ? '/shringar-tech.github.io/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;