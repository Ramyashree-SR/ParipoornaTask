const express=require('express')
const app=express()
// let cors=require('cors')
require('dotenv').config()
let port=process.env.PORT||8000
require('./config/db')


let formroutes=require('./routes/FormDataRoutes')
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const cors = require("cors");
    app.use(cors({
        origin: '*'
    }));
app.all("/*", (request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "*");
    response.header("Access-Control-Expose-Headers", "*");
    response.header(
      "Access-Control-Allow-Methods",
      "GET, PUT, POST, DELETE, OPTIONS, HEAD, PATCH"
    );
    response.header("Access-Control-Allow-Credentials", true);
    next();
  });
  app.use(cors())
app.use('/form',formroutes)

app.use((err,req,res,next)=>{
    res.status(500,{
        err:true,
        message:err.message,
        data:null
    })
})

app.listen(port,()=>{
    console.log(`listening to the port ${port}`);
})