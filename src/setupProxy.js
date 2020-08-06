//  你无需在任何位置导入此文件。 它在启动开发服务器时会自动注册。
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = app => {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://mock.studyinghome.com/mock/5f213d64e525ff20854f7d96/flygoo-api",
      changeOrigin: true,
      pathRewrite: { "^/api": "/api" },
    }),
  );
};