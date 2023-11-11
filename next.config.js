/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dnidcq1fi/**",
      },
    ],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/add-job",
        permanent: true,
      },
    ];
  },

  // async rewrites() {
  //   console.log("Rewrites called");
  //   return {
  //     beforeFiles: [
  //       {
  //         source: "/api/:path*",
  //         destination: "http://localhost:5102/api/v1/:path*",
  //       },
  //     ],
  //   };
  // },
};

export default nextConfig
