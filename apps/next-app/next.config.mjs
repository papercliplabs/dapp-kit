/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: config => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding');
        return config;
    },
    logging: {
        fetches: {
          fullUrl: true,
          level: "verbose"
        },
    },
    images: {
        remotePatterns: [
            {
            protocol: "https",
            hostname: "*",
            port: "",
            pathname: "/**"
            },
        ]
    },
};

export default nextConfig;
