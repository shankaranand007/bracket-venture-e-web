var express = require('express');
var router = express.Router();
var moment = require('moment');
var store = require('store');
var async = require("async");
var mysql = require('mysql');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "food",
  database:"food"
});
/* GET users listing. */
router.post('/', function(req, res, next) {
  // var date2 = dec.tz('Asia/Kolkata').format('YYYY-MM-DD hh:mm:ss'); 
  // var date2 = moment().format('YYYY-MM-DD hh:mm:ss');
  // var date2 = moment().format();
  // var date2 = moment().toDate().getTime();
  // console.log(date2)
         try {
           var reqObj = req.body;
           store.set('total', reqObj.total_amount);
           req.getConnection((err,conn)=>{
            if(err){
              console.log("conn"+err);
            }else{
                 var sql = "INSERT INTO ordered_items SET ?";
                 var value = {
                    "user_id":reqObj.user_id,
                    "items":reqObj.item,
                    "type":reqObj.type,
                    "total_amount":reqObj.total_amount,
                    "delivery_fee":reqObj.delivery_fee,
                    "coupon_used":reqObj.coupon,
                    "CouponValue":reqObj.coupon_value,
                    "coupon_type":reqObj.coupon_type
                 };
                  conn.query(sql,value,(err, result)=>{
                    if(err){
                      console.log("db"+err)
                    }else{
                  var emp = result.insertId;
                   //calc_reward(reqObj.user_id);
                   res.json({"var_code":"1","msg":"Order taken","result":emp});
                    }
                  });
             }
           });
        }catch(e){
          console.log("main"+e);
        }
});

function calc_reward(data2,ordered_id,total){

 con.query("SELECT point_per_dollar FROM rewards LIMIT 0,1",(err,result)=>{
  var point = (Number(result[0].point_per_dollar) * Number(total));
    async.parallel({
      insert:(callback)=>{
    con.query("SELECT order_status FROM orders WHERE ordered_id = '"+ordered_id+"' ",(err,result)=>{
          if(result[0].order_status == 3 || result[0].order_status == "3"){
            var dd = {
              "earning_points":point
            }
            con.query("UPDATE ordered_items SET ? WHERE ordered_id = '"+ordered_id+"' ",dd,(err,result)=>{
              callback(null,result);
            })
          }else{
            callback(null,"nothing");
          }
        });
      },
      update:(callback)=>{
        con.query("SELECT points FROM signup WHERE user_id ='"+data2+"'",(err,result)=>{
          var new_point = Number(result[0].points) + Number(point);
          con.query("UPDATE signup SET points = '"+new_point+"' WHERE user_id = '"+data2+"'",callback)
        })
      }
    },
    (err,result)=>{
      console.log(result);
    })
 })
}

router.post('/delivery_address', function(req, res, next) {
  // var date2 = moment().format("YYYY-MM-DD h:mm:ss");
   try {
           var reqObj = req.body;
           var re;
           (reqObj.delivery_req_time == null ||reqObj.delivery_req_time == undefined)?re = "":re = reqObj.delivery_req_time;
            var local = store.get('total');
           req.getConnection((err,conn)=>{
            if(err){
              console.log("conn"+err);
            }else{
               var sql = "INSERT INTO orders SET ?";
              
                 var value = {
                   "order_type":reqObj.order_type,
                   "order_status":2,
                   "notes":reqObj.notes,
                   "delivery_day":reqObj.delivery_day,
                   "name":reqObj.name,
                   "user_id":reqObj.user_id,
                   "ordered_id":reqObj.ordered_id,
                   "payment_type":reqObj.payment_type,
                   "mobile_number":reqObj.mobile_number,
                   "email":reqObj.email,
                   "full_address":reqObj.full_address,
                   "delivery_city":reqObj.delivery_city,
                   "delivery_pin":reqObj.delivery_pin,
                   "delivery_req_time":re,
                   "total_amount":local
                   // "receive_time":date2
                 };
                  conn.query(sql,value,(err, result)=>{
                    if(err){
                      console.log("db"+err)
                    }else{
                      
                  var emp = result.insertId;
                   res.json({"var_code":"1","msg":"Delivery address register","result":emp});
                   store.clearAll();
                    }
                  });
            }
           });
        }catch(e){
          console.log("main"+e);
        }
});

router.post('/delivery_update', (req, res, next)=> {
  var date2 = moment().format("YYYY-MM-DD h:mm:ss");
    try {
           var reqObj = req.body;
           // var arr = Object.keys(reqObj);
           req.getConnection((err,conn)=>{
            if(err){
              console.log("conn"+err);
            }else{
               var sql = "UPDATE orders SET ? WHERE user_id='"+reqObj.user_id+"'AND ordered_id='"+reqObj.ordered_id+"'";
                 var value = {
                   "order_status":2,
                 };
                  conn.query(sql,value,(err, result)=>{
                    if(err){
                      console.log("db"+err)
                    }else{
                  var emp = result.insertId;
                   res.json({"var_code":"1","msg":"Delivery status UPDATE","result":emp});
                    }
                  });
            }
           });
        }catch(e){
          console.log("main"+e);
        }
});

router.post('/delivery_update3', (req, res, next)=> {
    try {
           var reqObj = req.body;
           // var arr = Object.keys(reqObj);
           req.getConnection((err,conn)=>{
            if(err){
              console.log("conn"+err);
            }else{
               var sql = "UPDATE orders SET ? WHERE user_id='"+reqObj.user_id+"'AND ordered_id='"+reqObj.ordered_id+"'";
                 var value = {
                   "order_status":4,
                 };
                  conn.query(sql,value,(err, result)=>{
                    if(err){
                      console.log("db"+err)
                    }else{
                  var emp = result.insertId;
                   res.json({"var_code":"1","msg":"Delivery status UPDATE","result":emp});
                    }
                  });
            }
           });
        }catch(e){
          console.log("main"+e);
        }
});
router.post('/delivery_update2', (req, res, next)=> {
  // var date2 = moment().format("YYYY-MM-DD h:mm:ss");
    try {
           var reqObj = req.body;
           // var arr = Object.keys(reqObj);
           req.getConnection((err,conn)=>{
            if(err){
              console.log("conn"+err);
            }else{
               var sql = "UPDATE orders SET ? WHERE ordered_id='"+reqObj.ordered_id+"'";
                 var value = {
                   "order_status":4,
                   // "receive_time":date2
                 };
               
                  conn.query(sql,value,(err, result)=>{
                    if(err){
                      console.log("db"+err)
                    }else{
                  var emp = result.insertId;
                   res.json({"var_code":"1","msg":"Delivery status UPDATE","result":emp});
                    }
                  });
              
            }
           });
        }catch(e){
          console.log("main"+e);
        }
});

router.post('/delivery_update0', (req, res, next)=> {
    try {
           var reqObj = req.body;
           
           // var arr = Object.keys(reqObj);
           req.getConnection((err,conn)=>{
            if(err){
              console.log("conn"+err);

            }else{

               var sql = "UPDATE orders SET ? WHERE ordered_id='"+reqObj.ordered_id+"'";
                 var value = {
                   "order_status":0,
                 };
               
                  conn.query(sql,value,(err, result)=>{
                    if(err){
                      console.log("db"+err)
                    }else{
                  var emp = result.insertId;
                   res.json({"var_code":"1","msg":"Delivery status 0","result":emp});
                    }
                  });
              
            }
           });
        }catch(e){
          console.log("main"+e);
        }
});


router.post('/order_placed', (req, res, next)=> {
    try {
           var reqObj = req.body;
           // var arr = Object.keys(reqObj);
           req.getConnection((err,conn)=>{
            if(err){
              console.log("conn"+err);
            }else{

               var sql = "UPDATE orders SET ? WHERE user_id='"+reqObj.user_id+"'AND ordered_id='"+reqObj.ordered_id+"'";
                 var value = {
                   "order_status":3,
                 };
                  conn.query(sql,value,(err, result)=>{
                    if(err){
                      console.log("db"+err)
                    }else{
                  var emp = result.insertId;
                  if(reqObj.total == ""||reqObj.total == undefined || reqObj.total == null){console.log("total empty") }
                  	else{ calc_reward(reqObj.user_id,reqObj.ordered_id,reqObj.total); }
                   res.json({"var_code":"1","msg":"Delivery status UPDATE","result":emp});
                    }
                  });
              
            }
           });
        }catch(e){
          console.log("main"+e);
        }
});


router.post('/get_delivery_Address',(req,res)=>{
    var reqObj = req.body;
    var prekey = Array('user_id');
    var arr    = Object.keys(reqObj);
    if(arr.length == prekey.length){
        req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                var sql = "SELECT * FROM orders WHERE user_id='"+reqObj.user_id+"'ORDER BY order_id DESC";
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

router.post('/get_from_user',(req,res,next)=>{
	try{
		var reqObj = req.body;
		req.getConnection((err,conn)=>{
			if(err){}else{
			async.parallel({
				one:(callback)=>{
					conn.query("SELECT * FROM orders WHERE user_id='"+reqObj.user_id+"'ORDER BY order_id DESC",(err,result)=>{
						callback(null,result)
					});
				},
				two:(callback)=>{
					conn.query("SELECT mobile_number,email,name FROM signup WHERE user_id='"+reqObj.user_id+"'",(err,result)=>{
						callback(null,result)
					});
				}
			},
			(err,result)=>{
				res.json({"var_code":"1","msg":"data",result})
			});
			}
		})
	}catch(e){console.log(e)}
})







// router.post('/get_from_user',(req,res)=>{
//     var reqObj = req.body;
//     var prekey = Array('user_id');
//     var arr    = Object.keys(reqObj);
//     if(arr.length == prekey.length){
//         req.getConnection((err,conn)=>{
//             if(err){
//                 console.log(err);
//                 res.json({"msg":err});
//             }else{
             
//                 var sql = "SELECT mobile_number,email,name FROM signup WHERE user_id='"+reqObj.user_id+"'";
//                 conn.query(sql,(err,result)=>{
//                     if(err){
//                         res.json({"var_code":"0","msg":err,"result":[]});
//                     }else{
//                         res.json({"var_code":"1","msg":"data","result":result});
//                     }
//                 });
                 
//             }
//         });

//     }else{
//         res.json({"var_code":"0","msg":"array key are differ","key":prekey});
//     }
// });
module.exports = router;
