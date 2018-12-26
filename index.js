const express = require('express');

const path = require('path');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const app = express();
const authRoute = require('./src/routes/authRoute');
const con = require('./src/models/authModel');
const PORT = 8080;

authRoute(app);
const sqlQuery = "SELECT * FROM user WHERE _id=?";
var dbConStatus=false;

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
});

// var email,pass;
// app.get("/users/:id",(req,res)=>{
//     const id = req.params.id;
// con.query(sqlQuery,[id],(err,result)=>{
//   var string = JSON.stringify(result);
//   var jsonObj = JSON.parse(string);
//   var output = "Email : "+jsonObj[0].uname +"\n"+" Password : " +jsonObj[0].pass;
// res.send(output);
// console.log(jsonObj);
// });
// });
// app.get('/login',function(req,res){
// if(email === req.query.email && pass === hashPassword(req.query.pass,'sha256'))
// {
//     res.send('Login Sucessful!');
// }else{
//     email = req.query.email;
//     pass = hashPassword(req.query.pass,'sha256');
//     res.send('Your Account Created Sucessuflly!');
//     //console.log(createTable('user'));
//         var sql = `INSERT INTO user (uname,pass) VALUES ('${email}', '${pass}')`;
//         if(dbConStatus)
//         {
//             con.query(sql,function(err,result){
//                 if(err) {
//                     console.log("Error in query!");
//                     console.log(err);
//                     if(err.code === 'ER_NO_SUCH_TABLE')
//                     {
//                         createTable('user');
    
//                     }else{
//                         throw err;
//                     }
                    
//                 }else{
//                     console.log('1 record inserted.');
    
//                 }
//             });
//         }else{
//             console.log("Database not connected!");
//         }
       
     
// }
// }).listen(PORT,()=>{
//     console.log(`Server is running on port ${PORT}`);
// });

// function hashPassword(password,algo){
//     const hash = crypto.createHmac(algo,'Ankit')
//     .update(password)
//     .digest('hex');
//     console.log(hash);
// return hash;
// }

// function createTable(tableName){
//     var sql = `CREATE TABLE ${tableName} (_id INT AUTO_INCREMENT PRIMARY KEY, uname VARCHAR(255), pass VARCHAR(255))`;
//     con.query(sql,(err,result)=>{

//         if(err){
//             console.log(err.message);
//             throw err;
//         }else{
//             console.log("Table created!")
//         }
//     })

// }

