import express from 'express'
import routes from './routes'
import './database'
import 'reflect-metadata'

const app = express()

app.use(express.json())
app.use(routes)

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('App started'))
