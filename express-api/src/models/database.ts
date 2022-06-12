import {Pool}from 'pg'
import dotenv from 'dotenv'
dotenv.config()
const Port = parseInt(process.env.DB_PORT?process.env.DB_PORT:"5432")
const config = {
    host: process.env.DB_HOST,
    database: process.env.DB,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port:Port
}
const client = new Pool(config)
export default client
