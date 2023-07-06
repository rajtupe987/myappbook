const express=require("express");
const {connection}=require("./config/db")
const app=express();
require("dotenv").config();
const {bookRoute}=require("./routes/mybookroutes")
const cors=require("cors");


app.use(cors())
app.use(express.json())



app.get("/",(req,res)=>{
   res.send("Welcome to mybook app")
})


app.use("/book",bookRoute)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("server running")
    } catch (error) {
        console.log(error);
        console.log("error from server")
    }

    console.log(`server running at ${process.env.port} port`)
})