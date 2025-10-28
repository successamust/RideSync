import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

const app = express()

app.use(cors({origin: "*"}))
app.use(bodyParser.json())
app.use(bodyParser({urlencoded: true}))
