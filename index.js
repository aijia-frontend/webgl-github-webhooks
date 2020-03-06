var http = require('http')
var createHandler = require('node-github-webhook')
var handler = createHandler([ // multiple handlers
  { path: '/backend', secret: 'aijiaroot' },
  { path: '/frontend', secret: 'aijiaroot' }
])
// var handler = createHandler({ path: '/webhook1', secret: 'secret1' }) // single handler

http.createServer(function (req, res) {
  console.log('艾佳生活前端组自动化部署项目启动完成...')
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7777)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log(
    'Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref
  )
  switch(event.path) {
    case '/backend':
      console.log("deploy project backend")
      break
    case '/frontend':
      console.log("deploy project frontend")
      break
    default:
      // do sth else or nothing
      break
  }
})