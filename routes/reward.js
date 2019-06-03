'use strict'
var express = require('express');
var async = require("async");
var router = express.Router();

router.post('/getAddress',(req,res)=>{
    var reqObj = req.body;

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

});

router.post('/update_ppd',(req,res)=>{
    var reqObj = req.body;
        req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                var data= {
                    "point_per_dollar":reqObj.point_per_dollar
                }
                conn.query("UPDATE rewards SET ? WHERE reward_id = '"+reqObj.reward_id+"'",data,(err,result)=>{
                    if(err){
                        res.json({"var_code":"0","msg":err,"result":[]});
                    }else{
                        res.json({"var_code":"1","msg":"data update","result":result});
                    }
                });
            }
        });
});

router.post('/update_min_redeem',(req,res)=>{
    var reqObj = req.body;
        req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                var data= {
                    "minredeempoints":reqObj.minredeempoints
                  
                }
                conn.query("UPDATE rewards SET ? WHERE reward_id = '"+reqObj.reward_id+"'",data,(err,result)=>{
                    if(err){
                        res.json({"var_code":"0","msg":err,"result":[]});
                    }else{
                        res.json({"var_code":"1","msg":"data update","result":result});
                    }
                });
            }
        });
});

/* router.post('/get2',(req,res)=>{
    var reqObj = req.body;

        req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                conn.query("SELECT * FROM rewards LIMIT 0,1",(err,result)=>{
                    if(err){
                        res.json({"var_code":"0","msg":err,"result":[]});
                    }else{
                        res.json({"var_code":"1","msg":"data update","result":result});
                    }
                });
            }
        });
}); */

router.post('/get',(req,res)=>{
    var reqObj = req.body;

        req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
				async.parallel({
					get_min_redeem:(callback)=>{
						var sql = `CALL min_redeem()`;
						conn.query(sql,(err,result)=>{
							callback(null,result);
						})
					},
					get_point:(callback)=>{
						var sql = `CALL getProfile(?)`;
						conn.query(sql,reqObj.user_id,(err,result)=>{
							callback(null,result[0]);
						})
				}},
					(err,result)=>{
						res.json({"var_code":"1","msg":"data update","result":result.get_min_redeem[0],"points":result.get_point[0].points});
					}
				)
            }
        });
});



router.post('/update_points',(req,res)=>{
    var reqObj = req.body;
        req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                
                var data= {
                    "points":reqObj.points
                }
                conn.query("UPDATE signup SET ? WHERE user_id = '"+reqObj.user_id+"'",data,(err,result)=>{
                    if(err){
                        res.json({"var_code":"0","msg":err,"result":[]});
                    }else{
                        res.json({"var_code":"1","msg":"data update","result":result});
                    }
                });
            }
        });
});

module.exports = router;