var express = require('express');
var router = express.Router();
var moment = require('moment');
var async = require("async");

router.post('/',(req,res,next)=>{

      try{
             var reqObj = req.body;

       req.getConnection((err,conn)=>{
            if(err){
                  console.log(err)
            }else{
                  var sql = "INSERT INTO coupon SET ?";
                  var data = {
                            "code":reqObj.code,
                             "coupon_type":reqObj.coupon_type,
                             "CouponValue":reqObj.CouponValue,
                             "description":reqObj.description,
                             "valid_from":reqObj.valid_from,
                             "valid_to":reqObj.valid_to,
                             "status":reqObj.status,
                             "order_type":reqObj.order_type,
                             "device":reqObj.device,
                             "min_amount":reqObj.min_amount
                            }
                  conn.query(sql,data,(err,result)=>{
                        if(err){
                              console.log(err)
                        }else{
                              res.json({"var_code":"1","msg":"data insert","result":result});
                        }
                  })
            }
       });
      }catch(e){console.log(e)}

});

router.post('/getData',(req,res,next)=>{

      try{
             var reqObj = req.body;

       req.getConnection((err,conn)=>{
            if(err){
                  console.log(err)
            }else{
               // async.parallel({
               //  coupon:(callback)=>{
               //    conn.query("SELECT * FROM coupon",(err,result)=>{
               //      callback(null,result);
               //    })
               //  },
               //  min_reedeempoint:(callback)=>{
               //    conn.query("SELECT * FROM rewards",(err,result)=>{
               //      callback(null,result);
               //    })
               //  }
               // },
               // (err,result)=>{
               // res.json({"var_code":1,"msg":"data",result});
               // })
              conn.query("SELECT * FROM coupon",(err,result)=>{
                res.json({"var_code":1,"msg":"data",result});
              })
            }
       });
      }catch(e){console.log(e)}

});
router.post('/delete',(req,res,next)=>{

      try{
             var reqObj = req.body;

       req.getConnection((err,conn)=>{
            if(err){
                  console.log(err)
            }else{
              conn.query("DELETE FROM coupon WHERE id = '"+reqObj.id+"' ",(err,result)=>{
                res.json({"var_code":1,"msg":"delete",result});
              })
            }
       });
      }catch(e){console.log(e)}

});

router.post('/verify_coupon',(req,res,next)=>{

      try{
             var reqObj = req.body;
             var sdate = moment().format("YYYY-MM-DD");
       req.getConnection((err,conn)=>{
            if(err){
                  console.log(err)
            }else{
              conn.query("SELECT code,CouponValue,coupon_type,order_type,device,min_amount FROM coupon WHERE code = '"+reqObj.code+"' AND  valid_to >= '" + sdate + "' AND status = 1",(err,result)=>{
                 var size = result.length;
                 if(size > 0)
                 {
                  // if(result[0].order_type == "both" || result[0].device == "both"){ 
                  //   res.json({"var_code":10,"msg":"available",result})
                  // }
                  //   else if(result[0].order_type == "take" ){
                  //    res.json({"var_code":11,"msg":"available",result})
                  //  } 
                  //     else if(result[0].order_type == "delivery"){
                  //       res.json({"var_code":12,"msg":"available",result})
                  //     }
                  if(result[0].device == "mob"){
                  res.json({"var_code":333,"msg":"available",result})
                  }else if(result[0].device == "web" || result[0].device == "both" ){
                      if(result[0].order_type == "take"){
                    if(result[0].device == "web" || result[0].device == "both"){
                      res.json({"var_code":11,"msg":"available",result})
                    }else if(result[0].device == "mob"){
                      res.json({"var_code":12,"msg":"available",result})
                    }else {
                    	res.json({"var_code":0,"msg":"available",result})
                    }
                  }else if(result[0].order_type == "delivery"){
                    if(result[0].device == "web" || result[0].device == "both"){
                      res.json({"var_code":21,"msg":"available",result})
                    }else if(result[0].device == "mob"){
                      res.json({"var_code":22,"msg":"available",result})
                    }else{
                    	 res.json({"var_code":0,"msg":"available",result})
                    }
                  }else if(result[0].order_type == "both"){
                    if(result[0].device == "web" || result[0].device == "both"){
                      res.json({"var_code":31,"msg":"available",result})
                    }else if(result[0].device == "mob"){
                      res.json({"var_code":33,"msg":"available",result})
                    }else {
                    	res.json({"var_code":0,"msg":"available",result})
                    }
                  }else{
                  	res.json({"var_code":0,"msg":"available",result})
                  }
                   }else{
                   	res.json({"var_code":0,"msg":"available",result})
                   }
                 
                 }
                 else{
                  res.json({"var_code":0,"msg":"No data","result":[]});
                 }
                
              })
            }
       });
      }catch(e){console.log(e)}

});

router.post('/update',(req,res,next)=>{

      try{
             var reqObj = req.body;

       req.getConnection((err,conn)=>{
            if(err){
                  console.log(err)
            }else{
            	var data = {
                             "coupon_type":reqObj.coupon_type,
                             "CouponValue":reqObj.CouponValue,
                             "description":reqObj.description,
                             "valid_from":reqObj.valid_from,
                             "valid_to":reqObj.valid_to,
                             "status":reqObj.status,
                             "order_type":reqObj.order_type,
                             "device":reqObj.device,
                             "min_amount":reqObj.min_amount
            	}
              conn.query("UPDATE coupon SET ? WHERE id='"+reqObj.id+"'",data,(err,result)=>{
                res.json({"var_code":1,"msg":"data",result});
              })
            }
       });
      }catch(e){console.log(e)}

});

router.post('/edit_get',(req,res,next)=>{

      try{
             var reqObj = req.body;

       req.getConnection((err,conn)=>{
            if(err){
                  console.log(err)
            }else{
              conn.query("SELECT * FROM coupon WHERE id='"+reqObj.id+"'",(err,result)=>{
                res.json({"var_code":1,"msg":"data",result});
              })
            }
       });
      }catch(e){console.log(e)}

});

module.exports = router; 