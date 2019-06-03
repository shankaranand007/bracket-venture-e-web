var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var ejs = require('ejs');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/signup',function(req,res,next){
    try{
         try {
           var reqObj = req.body;
           var prekey = Array("mob","password","mail","name","device");
           var arr = Object.keys(reqObj);
             req.getConnection(function(err,conn){
               if(err){
                 console.error("mysql connection error:",err);
                 return next(err);
               }else{   
            //    var sql = "SELECT * FROM signup WHERE email='" +reqObj.email+ "' OR mobile_number='" +reqObj.email+ "' AND password='" +reqObj.password +"'" ;
               var sql = "SELECT email,mobile_number FROM signup WHERE email='" +reqObj.mail+ "' OR mobile_number='" +reqObj.mob+ "'" ;
               var co = conn.query(sql,function(err, result){
                 if(err){
                   console.error("sql error:",err);
                   return next(err);
                 }
                // console.log(result);
                 var size = result.length;
                 // console.log(size);
                if(size > 0){ 
                    res.json({"var_code":"0","msg":"email/phone already exits","result":[]});
                }else{
                  
                 var sql = "INSERT INTO signup SET ?";
                 var value = {
                   "mobile_number":reqObj.mob,
                   "email":reqObj.mail,
                   "name":reqObj.name,
                   "password":reqObj.password,
                   "device_id":reqObj.device,
                   "agree":reqObj.agree
                 };
                 var co = conn.query(sql,value,function(err, result){
                   if(err){
                     console.error("sql error:",err);
                     return next(err);
                   }
                   var emp = result.insertId;
                   verify(reqObj.mail,emp);
                   res.json({"var_code":"1","msg":"data insert","result":emp});
                  // console.log("result"+emp);
                 });
                }

               });
   
               }
             });

         } catch(e){
           console.log(e);
         }
       }
       
       catch(ex){
         console.error('internal error:'+ex);
         return next(ex);
       }
   });



//    LOGIN SECTION


router.post('/login',function(req,res,next){
    try{
      
     
         try {
           var reqObj = req.body;
           var prekey = Array("phone","password");
           var arr = Object.keys(reqObj);
             
              if(arr.length == prekey.length)
            {
             req.getConnection(function(err,conn){
               if(err){
                 console.error("mysql connection error:",err);
                 return next(err);
               }else{
   
              var sql = "SELECT name,user_id,mobile_number,email,points FROM signup WHERE (email='" +reqObj.phone+ "' AND password='" +reqObj.password +"')AND verify_status=1" ;
               // var sql = "SELECT * FROM signup WHERE (email='" +reqObj.phone+ "' OR mobile_number='" +reqObj.phone+ "' AND password='" +reqObj.password +"')AND verify_status=1" ;
              
               var co = conn.query(sql,function(err, result){
                 if(err){
                   console.error("sql error:",err);
                   return next(err);
                 }
                // console.log(result);
                 var size = result.length;
                 console.log(size);
                if(size > 0){ 
                    res.json({"var_code":"1","msg":"success","result":result})
                }else{
             
                    res.json({"var_code":"0","msg":"fail","result":result})
                }
               });
               }
             });
            }
            else{
              res.json({"var_code":"0","msg":"array key are differ","key":prekey});
            }
         } catch(e){
           console.log(e);
         }
       }
       
       catch(ex){
         console.error('internal error:'+ex);
         return next(ex);
       }
   });
router.get('/reg_verify',(req,res,next)=> {
    try {
           var reqObj = req.body;
           //var user_id ="1";
            var user_id = req.query.id;
           console.log(user_id);
           var arr = Object.keys(reqObj);
           req.getConnection((err,conn)=>{
            if(err){
              console.log("conn"+err);
            }else{
               var sql = "UPDATE signup SET ? WHERE user_id='"+user_id+"'";
                 var value = {
                   "verify_status":1,
                 };
               
                  conn.query(sql,value,(err, result)=>{
                    if(err){
                      console.log("db"+err)
                    }else{
                  // var emp = result.insertId;
                  res.redirect('http://www.bondoori.com/#/order');
                   // res.render('welcome', { title: emp });
                   //res.json({"hello":"helo"})
                    }
                  });
              
            }
           });
        }catch(e){
          console.log("main"+e);
        }
});

// router.post('/reg_verify', 
//router.post('/verify_status', 
function verify(email,user_id) {
  // console.log(email);
  // var cons = require('consolidate');
  var cons = require('consolidate');
  //var htmlContent = fs.readFileSync('./views/welcome.html', 'utf8');

  cons.ejs('views/verify.html', {user_id:user_id}, function(err, html){ 
    if(err){
      console.log(err);
    }else{

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
       
       user: 'muthu@smaatapps.com',
        pass:'vijaya@83'
  }
    });
    console.log(email);
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Bondoori Wings 👻" <callmeshankar007@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Verification mail ✔', // Subject line
        generateTextFromHtml : true,
        html: html

    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          // res.send("end");
        } else {
        //  res.json({"var_code":"1","msg":"start","result":[]});
          console.log('Email sent: ' + info.response);
        }
    
      }); 
  }
});
}
//);
//);

router.post('/users',function(req,res,next){
    try{
      
     
         try {
    
             req.getConnection(function(err,conn){
               if(err){
                 console.error("mysql connection error:",err);
                 return next(err);
               }else{
   
              var sql = "SELECT name,user_id FROM signup WHERE verify_status=1 ORDER BY user_id" ;
              
               var co = conn.query(sql,function(err, result){
                 if(err){
                   console.error("sql error:",err);
                   return next(err);
                 }
            
                 var size = result.length;
                 console.log(size);
                if(size > 0){ 
                    res.json({"var_code":"1","msg":"success","result":result})
                }else{
             
                    res.json({"var_code":"0","msg":"fail","result":result})
                }
            
               });
   
               }
             });
      
         } catch(e){
           console.log(e);
         }
       }
       
       catch(ex){
         console.error('internal error:'+ex);
         return next(ex);
       }
   });
module.exports = router;