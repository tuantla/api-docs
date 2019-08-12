var proxy = require('http-proxy-middleware')
var express = require('express')
const apiSpecRoute = require('./server/api-spec')

const app = express()

var options = {
    target: 'http://52.77.221.207:8081',
    changeOrigin: true,
    pathRewrite: {
      '^/swagger': '/v2/api-docs',
    },
    router: {
      //'dev.localhost:3000': 'http://localhost:8000'
    }
  };

var reserveProxy = proxy(options);
var port = process.env.PORT || 8080
app.use('/swagger', reserveProxy)
app.use('/swagger.json', apiSpecRoute)
app.use(express.static('dist'))

app.listen(port, () => console.log(`listening on port ${port}!`))


process.on('SIGINT', function() {
    process.exit();
})