const dotenv = require("dotenv");
const express = require("express");
const {MongoClient} = require("mongodb");
const bodyparser = require("body-parser");
dotenv.config();

const server = express();
const port = process.env.PORT || 3000;

const client = new MongoClient(process.env.MONGODB_URL);

async function dbInitialize(){
    await client.connect();
    console.log("Connected to the Database");
}

async function serverInitialize(){
    server.listen(port,()=>{
        console.log(`Server Initialized http://localhost:${port}`)
    })
    server.use(express.json());
    server.use("/",require("./dbOperation.js"))
}

async function init(){
    await dbInitialize();
    await serverInitialize();
}

init();

module.exports = client;