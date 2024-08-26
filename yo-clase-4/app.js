import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { moviesRouter } from './routes/movie-routes.js'

// import movies from './movies.json' with { type: 'json' } not working


// read json with esmodules
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

// read json with esmodules recommended for now

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})
