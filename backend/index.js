import express from "express";
import dotenv from "dotenv";
dotenv.config();

let port = process.env.PORT || 6000;

let app=express();

app.get("/",(req,res)=>{
    res.send("Hello Server")
})

app.listen(port,()=>{
    console.log(`Listening on Server ${port}`)
})