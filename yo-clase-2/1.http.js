const http = require('node:http') // protocolo HTTP
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.statusCode = 200 // OK
    res.end("<h1>Página de inicio</h1>")
  } else if (req.url === '/imagen.png') {
    fs.readFile('placa.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>Internal server error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200 // OK
    res.end("<h1>Contacto</h1>")
  } else {
    res.statusCode = 404 // not found
    res.end("<h1>404</h1>")

  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
