var express = require('express');
var router = express.Router();
var moment = require('moment');
router.post('/', function(req, res, next) {
	try{
  var reqObj = req.body;
  var date2 = moment().format("YYYY-MM-DD h:mm:ss");
  	   req.getConnection((err,conn)=>{
           	if(err){
           		console.log("conn"+err);

           	}else{
           		var user_id;
              console.log(reqObj.mobile_number);
           		 var sql = "INSERT INTO contact SET ?";
           		if(reqObj.user_id == null ||reqObj.user_id == undefined){user_id="";}else{user_id =reqObj.user_id; }
                 var value = {
                   "name":reqObj.name,
                   "mail":reqObj.mail,
                   "message":reqObj.message,
                   "user_id":user_id,
                   "date_time":date2
   
                 };
               
                  conn.query(sql,value,(err, result)=>{
                  	if(err){
                  		console.log("db"+err)
                  	}else{
              	  var emp = result.insertId;
                   res.json({"var_code":"1","msg":"Your query is recevied","result":emp});
                  	}
                  });
           		
           	}
           });
	}catch(e){console.log(e);}
});

router.post('/getContact', function(req, res, next) {
  try{
  var reqObj = req.body;
 
       req.getConnection((err,conn)=>{
            if(err){
              console.log("conn"+err);

            }else{
             
              
               var sql = "SELECT * FROM contact";
   
               
                  conn.query(sql,(err, result)=>{
                    if(err){
                      console.log("db"+err)
                    }else{
                   res.json({"var_code":"1","msg":"Your query is recevied","result":result});
                    }
                  });
              
            }
           });
  }catch(e){console.log(e);}
});

router.post('/getSubscribe', function(req, res, next) {
  try{
  var reqObj = req.body;
 
       req.getConnection((err,conn)=>{
            if(err){
              console.log("conn"+err);

            }else{
             
              
               var sql = "SELECT * FROM subscribe";
   
               
                  conn.query(sql,(err, result)=>{
                    if(err){
                      console.log("db"+err)
                    }else{
                   res.json({"var_code":"1","msg":"Your query is recevied","result":result});
                    }
                  });
              
            }
           });
  }catch(e){console.log(e);}
});
module.exports = router;