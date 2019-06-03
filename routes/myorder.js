var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    try{
     var reqObj = req.body;

       req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                 
              
                var sql ="SELECT c.*,a.order_status FROM ordered_items c LEFT JOIN orders a ON (c.ordered_id = a.ordered_id) WHERE c.user_id = '" +reqObj.user_id+ "'";
                conn.query(sql,(err,result)=>{
                    if(err){
                        res.json({"var_code":"0","msg":err,"result":[]});
                    }else{
                        res.json({"var_code":"1","msg":"data","result":result});
                    }
                }); 
                 
            }
        });
    }catch(e){
        console.log(e);
    }
});

router.post('/second', function(req, res, next) {
    try{
     var reqObj = req.body;

       req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                 
              
                var sql ="SELECT * FROM ordered_items WHERE user_id = '" +reqObj.user_id+ "' AND ordered_id='"+reqObj.ordered_id+"'";
                conn.query(sql,(err,result)=>{
                    if(err){
                        res.json({"var_code":"0","msg":err,"result":[]});
                    }else{
                        res.json({"var_code":"1","msg":"data","result":result});
                    }
                }); 
                 
            }
        });
    }catch(e){
        console.log(e);
    }
});

router.post('/getProfile', function(req, res, next) {
    try{
     var reqObj = req.body;

       req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
				var sql = `CALL getProfile(?)`;
                //var sql = "SELECT name,user_id,mobile_number,email,points FROM signup WHERE user_id='"+reqObj.user_id+"'";
                conn.query(sql,reqObj.user_id,(err,result)=>{
                    if(err){
                        res.json({"var_code":"0","msg":err,"result":[]});
                    }else{
                        res.json({"var_code":"1","msg":"data","result":result[0]});
                    }
                }); 
                 
            }
        });
    }catch(e){
        console.log(e);
    }
});

router.post('/order_admin', function(req, res, next) {
    try{
     var reqObj = req.body;

       req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                 
                var sql = "SELECT * FROM ordered_items WHERE ordered_id='" +reqObj.ordered_id+ "'";
                conn.query(sql,(err,result)=>{
                    if(err){
                        res.json({"var_code":"0","msg":err,"result":[]});
                    }else{
                        res.json({"var_code":"1","msg":"data","result":result});
                    }
                }); 
                 
            }
        });
    }catch(e){
        console.log(e);
    }
});

module.exports = router;