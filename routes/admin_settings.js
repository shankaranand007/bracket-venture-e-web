'use strict'

var express = require('express');
var router = express.Router();
var async = require("async");

router.post('/',(req,res)=>{
    var reqObj = req.body;
        req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                var sql = "SELECT pages  FROM admin_setting WHERE status=1";
                var sql2 = "SELECT *  FROM admin_setting";
         				 conn.query( sql, ( err, result ) => {
                          conn.query( sql2, ( err, rows2 ) => {
                              res.json({"var_code":"1","msg":"data","result":result,"result2":rows2});

                          })
                        })
            }
        });
});

router.post('/permission_update',(req,res,next)=>{
    var reqObj = req.body;
        req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
     
                var sql2 = "UPDATE admin_setting SET ? WHERE set_id='"+reqObj.set_id+"'";
                var data = {
                	"status":reqObj.status
                	}
                          conn.query( sql2,data,( err, result ) => {
                              res.json({"var_code":"1","msg":"data","result":result});
                          }) 
            }
        });
});

router.post('/insert_new_user',(req,res,next)=>{
    var reqObj = req.body;
        req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{

                  	async.series({
	            		insert:(callback)=> {
	            			   var data = {
			                	"email":reqObj.email,
			                	"password":reqObj.password,
			                	"status":reqObj.status
			                	}
									            			
								conn.query(" INSERT INTO admin SET ?",data,callback)
	            		},
	            		get:(callback)=> {
	            			conn.query("SELECT *  FROM admin WHERE status=0",(err,result)=>{
	            				callback(null,result);
	            			});
	            		},
	            	},
	            	(err,result)=>{
	            		res.json({"var_code":"1","msg":"data",result});
	            	}

	            	);
                      }
        });
});

router.post('/get_admin',(req,res,next)=>{
    var reqObj = req.body;
        req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
            	async.parallel({
					   one: (callback)=> {
					  			conn.query("SELECT *  FROM admin WHERE status=0",(err, result, fields)=> {
						    callback(null,result);
						  });	
						    },
					   two: (callback)=> {
					        conn.query("SELECT *  FROM admin_setting",(err, result, fields)=> {
						    callback(null,result);
						  });	
					    }
					},
					(err, result)=> {
						if(err){console.log(err)}
					    res.json({"var_code":"1","msg":"data",result})
					});
            }
        });
});
// -----------------update

router.post('/delete',(req,res)=>{
    var reqObj = req.body;
 
        req.getConnection((err,conn)=> {
            if(err){
                console.log(err); 
                res.json({"msg":err});
            }else{
            	async.series({
            		delete:(callback)=> {
            			conn.query(" DELETE FROM admin WHERE admin_id='"+reqObj.admin_id+"'",callback);
            		},
            		get:(callback)=> {
            			conn.query("SELECT *  FROM admin WHERE status=0",(err,result)=>{
            				callback(null,result);
            			});
            		},
            	},
            	(err,result)=>{
            		res.json({"var_code":"1","msg":"data",result});
            	}

            	);
            }
        });
});


module.exports = router;