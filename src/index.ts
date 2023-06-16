const express=require('express');
const { dynamodb } = require('./util/dynamodb');
const { LOGIN_DETAILS } = require('./util/config');
const app=express();
app.use(express.json({
    extended : true
}));
app.use(express.urlencoded ({extended : true}))
const PORT=3001;
app.listen(PORT,()=>{
    console.log(`express server running on ${PORT}`)
})

app.post("/register",(req,res)=>{
    console.log (req)
    const name=req?.params?.name;
    const username=req?.params?.username;
    const password=req?.params?.password;

    const params= {
        TableName:LOGIN_DETAILS,
        Item:{
            username:{S:username},
            password:{S:password},
            name:{S:name}
        },
        ConditionExpression:'attribute_not_exists(username)'
    }

    if (name && username && password){
        dynamodb.putItem(params,function(error , res){
            if(error){
                console.log(error)
                return res.status(400).send({message:"username already exist"}); 
            }
            else{
                return res.status(200).send({name:name, username:username, password:password});
            }
        })
    }
    else{
        return res.status(400).send({message:"please provide all required details"});
    }
    

})
// UI => input validation => call DB => check for username => if not, save. If yes return error => return response
// UI => input validation  => call Db => check for username => if not, return error. If yes return data => if data , check for password => return error/response