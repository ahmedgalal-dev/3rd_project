import express , {Request,Response}from 'express'
import dotenv from 'dotenv'
import client from './models/database'
import cors from 'cors'
const app = express()
app.use(cors({
    origin:"*"
}))
dotenv.config()
app.get('/',async (req:Request,res:Response)=>{
    const db = await client.connect()
    const sql = "SELECT * FROM messages"
    db.query(sql).then((val)=>{
        db.release()
        res.send(val.rows)
    }).catch((err)=>{
        db.release()
        res.send(err.message)
    })
})
app.post('/:message',async(req:Request,res:Response)=>{
    const db = await client.connect()
    const sql = "INSERT INTO messages (message) VALUES ($1) RETURNING *;"
    db.query(sql,[req.params.message]).then((val)=>{
        console.log(val.rows[0])
        db.release()
        res.send(val.rows[0])
    }).catch((err)=>{
        console.log(err)
        db.release()
        res.send(err.message)
    })

})

app.listen(process.env.PORT,()=>{
    console.log("Listening at port =>" +process.env.PORT)
})