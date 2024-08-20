const express = require('express')
const dittoJSON = require('./pokemon/ditto.json')
const app = express()

app.disable('x-powered-by')

app.use(express.json())

// ^^ es lo mismo que la funcion de abajo

// app.use((req, res, next) => {
//     if (req.method !== 'POST') return next()
//     if (req.headers['content-type'] !== 'application/json') return next()

//     // only gets here the GET method and app/json type
//     let body = ''

//     // listen to data event
//     req.on('data', chunk => {
//         body += chunk.toString()
//     })

//     req.on('end', () => {
//         const data = JSON.parse(body)
//         data.timestamp = Date.now()
//         req.body = data
//         next()
//     })
// })

const PORT = process.env.PORT ?? 1234

app.get('/pokemon/ditto', (req, res) => {
    // res.status(200).send('<h1>Mi página</h1>')
    // res.send('<h1>Mi página</h1>')
    // res.json({ message: 'Hola mundo' })
    res.json(dittoJSON)
})

app.post('/pokemon', (req, res) => {
    res.status(201).json(req.body)
})

// last one to look for // use: all methods (*)
app.use((req, res) => {
    res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})
