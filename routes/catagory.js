'use strict'
var express = require('express');
var router = express.Router();
var inArray = require('in-array');
var mysql = require('mysql');
var async = require("async");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "food",
  database:"food"
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

router.post('/catagory',function(req,res,next){
    try{
        var reqObj = req.body;
        req.getConnection(function(err,conn){
            if(err){
                console.error("mysql connection error:",err);
                return next(err);
              }else{
                  // var sql = "SELECT * FROM catagerory ORDER BY cat_rating DESC ";
                  var sql = "SELECT * FROM catagerory ORDER BY cat_id ASC ";
                  conn.query(sql,function(err, result){
                    if(err){
                        console.error("sql error:",err);
                        return next(err);
                    }else{
                        (result.length > 0)?
                        res.json({"var_code":"1","msg":"key","result":result})
                        :
                        res.json({"var_code":"0","msg":"no data are available","result":[]})
                        
                    }
                  });
              }
        });
    }catch(e){
        console.log("catagory"+e);
    }

});
router.post("/subcatagory",function(req,res,next){
    try{
         var reqObj = req.body;
         var prekey = Array("cat_id");
         var arr = Object.keys(reqObj);
            console.log(reqObj,"catI");
        // if(arr.length == prekey.length)
        // { 
            req.getConnection(function(err,conn){
                if(err){
                    console.log("call"+err);
                }else{
                  var sql = "SELECT c.*,a.item_id,a.price,a.type,a.item_name FROM sub_catagory c LEFT JOIN items a ON (c.sub_cat_id = a.sub_cat_id) WHERE c.cat_id = '" +reqObj.cat_id+ "'"
                    // var sql = `CALL filterTodo (?)`;
                    var ins = reqObj.cat_id;
                    conn.query(sql,ins,function(err,result){
                       if(err){
                        console.log("error"+err);
                       }else{
                        (result.length>0)?
                        res.json({"var_code":"1","msg":"data","result":result})
                        :
                        res.json({"var_code":"0","msg":"no data are available","result":[]})
                       }
    
                    });
                }
            });
        // }
        // else{
        //     res.json({"var_code":"0","msg":"array key are differ","keys":prekey});
        //     }
    }catch(e){}
});


router.post("/subcatagory2",function(req,res,next){
    try{
         var reqObj = req.body;
         var prekey = Array("cat_id");
         var arr = Object.keys(reqObj);
     
        if(arr.length == prekey.length)
        {
            req.getConnection(function(err,conn){
                if(err){
                    console.log("call"+err);
                }else{
                  // var sql = "SELECT c.*,a.item_id,a.price,a.type,a.item_name FROM sub_catagory c LEFT JOIN items a ON (c.sub_cat_id = a.sub_cat_id) WHERE c.cat_id = '" +reqObj.cat_id+ "'"
                    var sql = "SELECT * FROM sub_catagory WHERE cat_id= '"+reqObj.cat_id+ "'ORDER BY sub_cat_id ASC";
                    conn.query(sql,function(err,result){
                       if(err){
                        console.log("error"+err);
                       }else{


                      
                        if(result.length>0){
                           var newObject =[],value = [];

                            for (var k=0;k<result.length;k++) {

                                     value = result[k];
                                      // conn2(value,res)
                                     // newObject[k] = {
                                     // 	"sub_cat_id":value.sub_cat_id,
                                     // 	"cat_id":value.cat_id,
                                     // 	"items":value.items,
                                     // 	"amount":value.amount,
                                     // 	"short_disc":value.short_disc,
                                     // 	"item_details":value.item_details,
                                     // 	"item_image":value.item_image,
                                     // 	"item_type":value.item_type,
                                     // 	"fat":value.fat,
                                     // 	"calories":value.calories,
                                     // 	"etc":value.etc,
                                     // 	"long_disc":value.long_disc,
                                     // 	"protiens":value.protiens ,
                                     // 	"rating":value.rating,
                                     // 	"qty":value.qty,
                                     // 	"is_popular":value.is_popular,
                                     // 	"value": response
                                     // };
                                     
                                    
                                }

                        res.json({"var_code":"1","msg":"data",newObject})
                        }else{
                        res.json({"var_code":"0","msg":"no data are available","result":[]})}
                       }
    
                    });
                }
            });
        }
        else{
            res.json({"var_code":"0","msg":"array key are differ","keys":prekey});
            }
    }catch(e){}
});

function conn2(data,res){

	var sql = "SELECT item_id_main,cat_id,sub_cat_id,qty,price,type,item_name,item_id FROM items WHERE sub_cat_id= '"+data.sub_cat_id+ "'";
 
    con.query(sql,(err,result)=>{    	
    	 var newObject =[],value = [];
    	             				 newObject = {
                                     	"sub_cat_id":data.sub_cat_id,
                                     	"cat_id":data.cat_id,
                                     	"items":data.items,
                                     	"amount":data.amount,
                                     	"short_disc":data.short_disc,
                                     	"item_details":data.item_details,
                                     	"item_image":data.item_image,
                                     	"item_type":data.item_type,
                                     	"fat":data.fat,
                                     	"calories":data.calories,
                                     	"etc":data.etc,
                                     	"long_disc":data.long_disc,
                                     	"protiens":data.protiens ,
                                     	"rating":data.rating,
                                     	"qty":data.qty,
                                     	"is_popular":data.is_popular,
                                     	"value": result
                                     };
                                    res.json({"var_code":"0","msg":"no data are available","result":[]}) 
    });

    // return result;
	// var dd =[];
	// // dd = [{
	// // 	"key":data
	// // }]

 //         con.query("SELECT item_id_main,cat_id,sub_cat_id,qty,price,type,item_name,item_id FROM items WHERE sub_cat_id= '"+data+ "'",(err,result)=>{
 //          // if(err){
 //          //   console.log(err);
 //          // }else{
 //         				 console.log("result")
 //                        if(result.length>0){dd = result;}
 //                        	else{return null}
 //                        // res.json({"var_code":"1","msg":"data","result":result})
 //                        // :
 //                        // res.json({"var_code":"0","msg":"no data are available","result":[]})
 //          // }
 //         });
 //         	return dd;
}

router.post("/papoular",function(req,res,next){
    try{

            req.getConnection(function(err,conn){
                if(err){
                    console.log("call"+err);
                }else{
                	// var sql = `CALL papoular ()`;
                    var sql = "SELECT * FROM sub_catagory WHERE is_popular= 'true' ORDER BY sub_cat_id ASC";
                    conn.query(sql,function(err,result){
                       if(err){
                        console.log("error"+err);
                       }else{

                        (result.length>0)?
                        res.json({"var_code":"1","msg":"data","result":result})
                        :
                        res.json({"var_code":"0","msg":"no data are available","result":[]})
                       }
    
                    });
                }
            });
   
    }catch(e){}
});


router.post("/admin_subcatagory",function(req,res,next){
    try{
         var reqObj = req.body;
         var prekey = Array("cat_id");
         var arr = Object.keys(reqObj);
     
        // if(arr.length == prekey.length)
        // {
            req.getConnection(function(err,conn){
                if(err){
                    console.log("call"+err);
                }else{
                    var sql = "SELECT * FROM sub_catagory ORDER BY sub_cat_id ASC";
                    conn.query(sql,function(err,result){
                       if(err){
                        console.log("error"+err);
                       }else{
                        //    console.log("req"+"//"+JSON.stringify(req));
                        //    console.log("req"+"//"+JSON.stringify(result));
                        (result.length>0)?
                        res.json({"var_code":"1","msg":"data","result":result})
                        :
                        res.json({"var_code":"0","msg":"no data are available","result":[]})
                       }
    
                    });
                }
            });
        // }
        // else{
        //     res.json({"var_code":"0","msg":"array key are differ","keys":prekey});
        //     }
    }catch(e){}
});


router.post("/items",(req,res,next)=>{
  try{
     var reqObj = req.body;
    req.getConnection((err,conn)=>{
      if(err){
        console.log(err);
      }else{
        
         conn.query("SELECT item_id_main,cat_id,sub_cat_id,qty,price,type,item_name,item_id FROM items WHERE sub_cat_id= '"+reqObj.sub_cat_id+ "'",(err,result)=>{
          if(err){
            console.log(err);
          }else{
                        (result.length>0)?
                        res.json({"var_code":"1","msg":"data","result":result})
                        :
                        res.json({"var_code":"0","msg":"no data are available","result":[]})
                       
          }
         });
      }
    });
  }catch(e){console.log(e);}
});