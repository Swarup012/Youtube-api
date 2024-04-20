// require('dotenv').config({path:'./env'})
//here we import .env (secret) file for fast access
import dotenv from "dotenv";

import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.on("error", () => {
      console.log("ERRR: ", error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongodb connection fail!!", error);
  });

/*
import express from "express"
const app = express()
;(async()=>{
    try{
       mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("error",()=>{
        console.log("ERRR:" , error);
        throw error
       })

       app.listen(process.env.PORT,()=>{
        console.log(`app is listening on Port ${process.env.PORT}`);
       })
    }catch(error){
        console.error("error",error)
        throw error
    }
})
*/
