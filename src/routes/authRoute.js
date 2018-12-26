const bodyParser = require('body-parser');
const sql = require('../models/authModel');
const crypto = require('crypto');
const routes = module.exports= (app) =>{
    // unlencoded() and json() is used to read that type of data from post response.
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.route('/login')
    .get((req,res,next)=>{
        // middleware
        console.log(`Request from : ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
        
    },(req,res,next)=>{
        res.send('GET request sucessfull!');
    })
    .post((req,res)=>{
      console.log('Loging you in.');
      var input = JSON.stringify(req.body);
      var output = JSON.parse(input);
      var uname = output.uname;
      var pass = output.pass;
      sql.login(uname,hashPassword(pass,'sha256'),(status)=>{
        
            console.log("Call back function is running.");
          if(status){
              res.send("Login Sucessfull!");
          }else{
            res.send("Login Un-Sucessfull!");
      
          }
      });
      
      
      
    })
    .put((req,res)=>{
        res.send('PUT request sucessfull!');

    }).delete((req,res)=>{
        res.send('DELETE request sucessfull!');

    });

    
    app.route('/signup')
    .post((req,res)=>{
        var input = JSON.stringify(req.body);
        var output = JSON.parse(input);
        var uname = output.uname;
        var pass = output.pass;
        sql.insert(uname,hashPassword(pass,'sha256'));
        
        
        
        res.send(input);
       console.log(input);

    });

    function hashPassword(password,algo){
            const hash = crypto.createHmac(algo,'Ankit')
            .update(password)
            .digest('hex');
            console.log(hash);
        return hash;
        }
        
}
