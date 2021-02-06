const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/*',
    createProxyMiddleware({ // anything with /api will direct the request to port 5000
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};

//Use robo3T which displays database in the web based synchronous output including the console file
