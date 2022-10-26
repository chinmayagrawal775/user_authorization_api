import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import connectdb from './config/connectdb.js'
import route from './routes/web.js'
import cors from 'cors'

const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

app.use(cors())

connectdb(DATABASE_URL)

app.use(express.json())
app.use('/api/user', route)

app.listen(port, () => {
    console.log(`Server Listening @ http://localhost:${port}`)
})