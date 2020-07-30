const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = app => {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://baidu.com",
      changeOrigin: true,
    }),
    // createProxyMiddleware("/api", {
    //   target: "http://192.168.11.11",
    //   changeOrigin: true,
    //   pathRewrite: { "^/api": "" },
    // }),
  );
};