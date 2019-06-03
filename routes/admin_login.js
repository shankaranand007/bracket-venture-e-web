var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var ejs = require('ejs');
/* GET users listing. */
router.post('/', function(req, res, next) {


    try{
      
     
         try {
           var reqObj = req.body;
           var prekey = Array("email","password");
           var arr = Object.keys(reqObj);
             
            //   if(arr.length == prekey.length)
            // {

             req.getConnection(function(err,conn){
               if(err){
                 console.error("mysql connection error:",err);
                 return next(err);
               }else{
   
              var sql = "SELECT * FROM admin WHERE email='" +reqObj.email+ "' AND password='" +reqObj.password +"'" ;
              
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
            //}
            // else{
            //   res.json({"var_code":"0","msg":"array key are differ","key":prekey});
            // }
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