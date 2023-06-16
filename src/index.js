const express=require('express');
const app=express();
const PORT=3001;
app.listen(PORT,()=>{
    console.log(`express server running on ${PORT}`)
})
app.get("/register",(req,res)=>{
    return res.status(200).send({message:"testing successful"})
})