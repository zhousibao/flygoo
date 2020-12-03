//  你无需在任何位置导入此文件。 它在启动开发服务器时会自动注册。
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = app => {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://yapi.baidu.com/mock/18575/flygoo-api",
      changeOrigin: true,
      pathRewrite: { "^/api": "/api" },
    }),
  );
};