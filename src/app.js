import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
//for json file acceptable
app.use(express.json({limit:"16kb"}))
//for url acceptable
app.use(express.urlencoded({extended:true,limit:"16kb"}))
//for file acceptable
app.use(express.static("public"))
//using cookie
app.use(cookieParser())

export {app}