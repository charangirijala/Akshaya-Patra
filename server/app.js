const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var cors=require('cors');
dotenv.config({path: './config.env'});
require('./db/conn');
//const Registration = require('./model/userschema');
app.use(cors());
app.use(express.json());
app.use(require("./router/auth"));
app.get("/",async(req,res)=>{
    res.send("Its working");
})
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})