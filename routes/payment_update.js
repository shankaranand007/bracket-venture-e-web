'use strict';
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.post('/', function(req, res, next) {
  
  var reqObj = req.body;

   req.getConnection((err,conn)=>{
            if(err){
              console.log("conn"+err);

            }else{
              console.log(reqObj.id,reqObj.user_id,reqObj.order_id)
               var sql = "UPDATE orders SET ? WHERE user_id='"+reqObj.user_id+"'AND ordered_id='"+reqObj.order_id+"'";
                 var value = {
                   "payment_type":reqObj.id
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
})
module.exports = router;