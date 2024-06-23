/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.tiktokcdn.com',
                port: '',
            },
        ],
    },
};

export default nextConfig;
