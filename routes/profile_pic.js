var express = require('express');
var router = express.Router();
var multer =  require('multer');
var time;
var time2;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //console.log("function enter");
      cb(null, 'profilepic')
    },
    filename: function (req, file, cb) {
       time =  file.fieldname + '-' + Date.now()+'.png';
      cb(null,time)
      time2 = "http://34.237.224.132/profilepic/"+time
      console.log("http://34.237.224.132/profilepic/"+time)
       
    }
  });
  
  var upload = multer({ storage: storage }).single('profile'); 
  

  router.post('/', function (req, res, next) {
   
      upload(req, res, function (err) {
        console.log(req.body);
        var reqObj = req.body;
        if (err) {
      
        console.log(err);
       }else{
               req.getConnection(function(err,conn){
               if(err){
                 console.error("mysql connection error:",err);
                 return next(err);
               }
            //    var sql = "SELECT * FROM signup WHERE email='" +reqObj.email+ "' OR mobile_number='" +reqObj.email+ "' AND password='" +reqObj.password +"'" ;
               var sql = "SELECT * FROM profile_pic WHERE user_id='" +reqObj.user_id+ "'" ;
               var co = conn.query(sql,function(err, result){
                 if(err){
                   console.error("sql error:",err);
                   return next(err);
                 }
                
                 var size = result.length;
                 
                if(size > 0){ 
                  var sql = "UPDATE profile_pic SET profile_pic ='"+time2+ "' WHERE user_id='" +reqObj.user_id+ "'" ;
                  conn.query(sql,function(err, result){
                 if(err){
                   console.error("sql error:",err);
                   return next(err);
                 }
                    res.json({"var_code":"0","msg":"Profile updated","result":[]});
                })
              }else{
                  
                 var sql = "INSERT INTO profile_pic SET ?";
                 var value = {
                   "profile_pic":time2,
                   
                  
                   "user_id":reqObj.user_id
                  
                 };
                 var co = conn.query(sql,value,function(err, result){
                   if(err){
                     console.error("sql error:",err);
                     return next(err);
                   }
                   var emp = result.insertId;
                  
                   res.json({"var_code":"1","msg":"data insert","result":emp});
                  // console.log("result"+emp);
                 });
                }
                
                // console.log("result"+emp);
               });
   
               });
      }
    
      })
    // }else{
    //   res.json({"var_code":"0","msg":"array key are differ","keys":prekey});
    // }
    });
module.exports = router;


