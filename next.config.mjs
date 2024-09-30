/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 使用antd组件库，必须要有下面的配置，不然报错
  //指定了一组需要被编译（转译）的包的名称列表。
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
    "rc-tree",
    "rc-table",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        // hostname: "p4.music.126.net", // 匹配指定路由
        // hostname: "*.music.126.net", // 匹配单个路径段或子域
        hostname: "**.music.126.net", // 匹配末尾任意数量的路径段或开头的子域
      },
      {
        protocol: "https",
        hostname: "**.music.126.net", // 匹配末尾任意数量的路径段或开头的子域
      },
    ],
  },
};

export default nextConfig;
