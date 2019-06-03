var express = require('express');
var router = express.Router();
module.exports = router; 

router.post('/', function(req, res, next) {

         try {
           var reqObj = req.body;
         
           req.getConnection((err,conn)=>{
            if(err){
              console.log("conn"+err);

            }else{

               // var sql = "INSERT INTO faq SET ?";
     
                 var value = {
                   // "keyy":reqObj.key,
                   "question":reqObj.question,
                   "answer":reqObj.answer
                 };
             
                  conn.query("INSERT INTO faq SET ?",value,(err, result)=>{
                    if(err){
                      console.log("db"+err)
                    }else{
                  var emp = result.insertId;
                   res.json({"var_code":"1","msg":"question inserted","result":emp});
                    }
                  });
              
            }
           });
        }catch(e){
          console.log("main"+e);
        }
    
});



router.post('/get_faq', function(req, res, next) {

         try {
           var reqObj = req.body;
         
           req.getConnection((err,conn)=>{
            if(err){
              console.log("conn"+err);

            }else{

                  conn.query("SELECT * FROM faq ",(err, result)=>{
                    if(err){
                      console.log("db"+err)
                    }else{
                
                   res.json({"var_code":"1","msg":"question inserted","result":result});
                    }
                  });
              
            }
           });
        }catch(e){
          console.log("main"+e);
        }
    
});

router.post('/change_key', function(req, res, next) {

         try {
           var reqObj = req.body;
         
           req.getConnection((err,conn)=>{
            if(err){
              console.log("conn"+err);

            }else{
                var sql = "UPDATE faq SET keyy='"+reqObj.keyy+"'WHERE faq_id='"+reqObj.id+"'";
                  conn.query(sql,(err, result)=>{
                    if(err){
                      console.log("db"+err)
                    }else{
                
                   res.json({"var_code":"1","msg":"question inserted","result":result});
                    }
                  });
              
            }
           });
        }catch(e){
          console.log("main"+e);
        }
    
});
router.post('/change_question', function(req, res, next) {

         try {
           var reqObj = req.body;
         
           req.getConnection((err,conn)=>{
            if(err){
              console.log("conn"+err);

            }else{
                var sql = "UPDATE faq SET question='"+reqObj.question+"'WHERE faq_id='"+reqObj.id+"'";
                  conn.query(sql,(err, result)=>{
                    if(err){
                      console.log("db"+err)
                    }else{
                
                   res.json({"var_code":"1","msg":"question inserted","result":result});
                    }
                  });
              
            }
           });
        }catch(e){
          console.log("main"+e);
        }
    
});
router.post('/change_answer', function(req, res, next) {

         try {
           var reqObj = req.body;
         
           req.getConnection((err,conn)=>{
            if(err){
              console.log("conn"+err);

            }else{
                var sql = "UPDATE faq SET answer='"+reqObj.answer+"'WHERE faq_id='"+reqObj.id+"'";
                  conn.query(sql,(err, result)=>{
                    if(err){
                      console.log("db"+err)
                    }else{
                
                   res.json({"var_code":"1","msg":"question inserted","result":result});
                    }
                  });
              
            }
           });
        }catch(e){
          console.log("main"+e);
        }
    
});