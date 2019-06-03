'use strict'

var express = require('express');
var router = express.Router();

router.post('/',(req,res,next)=>{
var reqObj = req.body;
var prekey = Array('user_id','address1','address2','city','state','zipcode','nearplace','flag');
var arr    = Object.keys(reqObj);
    if(arr.length == prekey.length){
        req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }else{
                var sql = "INSERT INTO details SET ?";
                var data = {
                    "user_id":reqObj.user_id,
                    "address1":reqObj.address1,
                    "address2":reqObj.address2,
                    "city":reqObj.city,
                    "state":reqObj.state,
                    "zipcode":reqObj.zipcode,
                    "nearplace":reqObj.nearplace,
                    "flag":reqObj.flag
                };
                conn.query(sql,data,(err,result)=>{
                    if(err){
                        res.json({"var_code":"0","msg":err,"result":[]});
                    }else{
                        var sql = "SELECT * FROM details WHERE user_id='"+reqObj.user_id+"'";
                        conn.query(sql,(err,result)=>{
                            if(err){
                                res.json({"var_code":"0","msg":err,"result":[]});
                            }else{
                                res.json({"var_code":"1","msg":"data insert","result":result});
                            }
                        });
                        
                    }
                });

            }
        });
    }else{
        res.json({"var_code":"0","msg":"array key are differ","key":prekey});
    }
});

router.post('/getAddress',(req,res)=>{
    var reqObj = req.body;
    var prekey = Array('user_id');
    var arr    = Object.keys(reqObj);
    if(arr.length == prekey.length){
        req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                var sql = "SELECT * FROM details WHERE user_id='"+reqObj.user_id+"'";
                conn.query(sql,(err,result)=>{
                    if(err){
                        res.json({"var_code":"0","msg":err,"result":[]});
                    }else{
                        res.json({"var_code":"1","msg":"data","result":result});
                    }
                });
                 
            }
        });

    }else{
        res.json({"var_code":"0","msg":"array key are differ","key":prekey});
    }
});
// -----------------update
router.post('/update',(req,res)=>{
    var reqObj = req.body;
    var prekey = Array('user_id','detail_id');
    var arr    = Object.keys(reqObj);
  //  if(arr.length == prekey.length){
        req.getConnection((err,conn)=>{
            if(err){
                console.log(err); 
                res.json({"msg":err});
            }else{
                 var sql = "UPDATE details SET ? WHERE user_id='"+reqObj.user_id+"'";
                         var data = {
                                
                                "address1":reqObj.address1,
                                "address2":reqObj.address2,
                                "city":reqObj.city,
                                "state":reqObj.state,
                                "zipcode":reqObj.zipcode,
                                "nearplace":reqObj.nearplace,
                                "flag":reqObj.flag
                            };
                        conn.query(sql,data, (err,result)=>{
                            if(err){
                                res.json({"var_code":"0","msg":err,"result":[]});
                            }else{
                                  var sql = "SELECT * FROM details WHERE user_id='"+reqObj.user_id+"'";
                                    conn.query(sql,(err,result)=>{
                                        if(err){
                                            res.json({"var_code":"0","msg":err,"result":[]});
                                        }else{
                                           res.json({"var_code":"1","msg":"data update","result":result});
                                        }
                                    });
                                
                            }
                        });
                 
            }
        });

    // }
    // else{
    //     res.json({"var_code":"0","msg":"array key are differ","key":prekey});
    // }
});

router.post('/delete',(req,res)=>{
    var reqObj = req.body;
    var prekey = Array('user_id','detail_id');
    var arr    = Object.keys(reqObj);
    if(arr.length == prekey.length){
        req.getConnection((err,conn)=>{
            if(err){
                console.log(err); 
                res.json({"msg":err});
            }else{
                var sql =" DELETE FROM details WHERE user_id='"+reqObj.user_id+"'AND detail_id='"+reqObj.detail_id+"'";

                conn.query(sql,(err,result)=>{
                    if(err){
                        res.json({"var_code":"0","msg":err,"result":[]});
                    }else{
                        var sql = "SELECT * FROM details WHERE user_id='"+reqObj.user_id+"'";
                        conn.query(sql,(err,result)=>{
                            if(err){
                                res.json({"var_code":"0","msg":err,"result":[]});
                            }else{
                                res.json({"var_code":"1","msg":"data Deleted","result":result});
                            }
                        });
                    }
                });
                 
            }
        });

    }
    else{
        res.json({"var_code":"0","msg":"array key are differ","key":prekey});
    }
});


module.exports = router;