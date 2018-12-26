const mysql = require('mysql');
require('dotenv').config();
var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user :process.env.DB_USER,
    port : 3306,
    password : process.env.DB_PASS,
    database: "vschool"
});
var dbConStatus=false;
var conStatus = con.connect(function(err){
    if(err){
        console.log("Database Not Connected!");
        console.log(err.message);

        dbConStatus = false;
        return;
    }else{
        console.log("Database Connected!")
        dbConStatus = true;
        return;
    }
    dbConStatus = false;
});
// This function is used for signup purpose.
function insertUser(uname,pass){
    var sql = `INSERT INTO user (uname,pass) VALUES ('${uname}', '${pass}')`;
    con.query(sql,(err,result)=>{
            if(err){
                if(err.code === 'ER_NO_SUCH_TABLE')
                    {
                        createUserTable(()=>{
                            insertUser(uname,pass);
                        });
    
                    }else{
                        console.log(err.message);
                    }
            }else{
                return result;
            }
    });
}

function createUserTable(done){
    var sql = `CREATE TABLE user (_id INT AUTO_INCREMENT PRIMARY KEY, uname VARCHAR(255), pass VARCHAR(255))`;
        con.query(sql,(err,result)=>{
    
            if(err){
                console.log(err.message);
                throw err;
            }else{
                console.log("Table created!")
                done();
            }
        })
}
function checkUser(uname,pass,loginStatus){
    
    var sql = `SELECT uname,pass FROM user WHERE uname = '${uname}'`;
    con.query(sql, (err,result)=>{
        if(err){
            console.log(err.message);
            
        }else{
            console.log("User found.");
            console.log(result);
           var output =  JSON.parse(JSON.stringify(result));
           console.log(pass);
           if(pass == output[0].pass){
               console.log(output[0].pass);
               loginStatus(true);
           }else{
               loginStatus(false);
           }
        }
    });
}
module.exports = {
insert : insertUser,
login : checkUser
}