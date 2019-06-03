'use strict';
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.post('/', function(req, res, next) {

 var reqObj = req.body;
var delivery_type = req.Delivery_type;
if(delivery_type == "1"){var type = "Take Away"}else{  var type = "DoorDelivery"}
var total_amount = reqObj.total;
var d_charge = reqObj.d_charge;
var orders = reqObj.orders;
var user_detail = reqObj.user_detail;
var address = reqObj.address;
var demo = transform(orders);

var city = reqObj.city;

var zip = reqObj.zip;

var id = reqObj.payment_type;
var ordered_id = reqObj.order_id;
var user_id = reqObj.user_id;
var mobile = reqObj.mobile;
var mail = reqObj.mail;
var req_time = reqObj.req_time;
var req_date = reqObj.req_date;
var cop_name = reqObj.cop_name;
var cop_value = reqObj.cop_value;
var cop_value2 = reqObj.cop_value2;

   res.render('mail', {user_detail:user_detail,total_amount:total_amount,address:address,city
    :city,zip:zip,mobile:mobile,type:type,order:demo,delivery_charge:d_charge,cop_name:cop_name,cop_value:cop_value,cop_value2:cop_value2}, function(err, html){ 

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
    // create reusable transporter object using the default SMTP transport

    let transporter = nodemailer.createTransport({
       service: 'Gmail',
      host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
       auth: {
         user: 'muthu@smaatapps.com',
        pass:'vijaya@83'
       }
    });
  
    // setup email data with unicode symbols
      if(err){
        console.log(err);
      }else{
    let mailOptions ={
        from: '"Bondoori Wings 👻" <callmeshankar007@gmail.com>', // sender address
        to: mail, // list of receivers
        subject: 'Order Placed ✔', // Subject line
        text: user_detail, // plain text body
        generateTextFromHtml : true,
        html: html
        

    };

    // send mail with defined transport object
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.send("end");
        } else {
         res.json({"var_code":"1","msg":"start","result":[]});
          console.log('Email sent: ' + info.response);
        }
      }); 
}
});
   // payment_update(id,ordered_id,user_id);
});

  function transform(value)
  {
    return typeof value==='string' ? JSON.parse(value.replace(/'/g, '"')) : value;
  }

  function payment_update(id,order_id,user_id){
  
           req.getConnection((err,conn)=>{
            if(err){
              console.log("conn"+err);

            }else{

               var sql = "UPDATE orders SET ? WHERE user_id='"+user_id+"'AND ordered_id='"+order_id+"'";
                 var value = {
                   "payment_type":id,
                 };
               
                  conn.query(sql,value,(err, result)=>{
                    if(err){
                      console.log("db"+err)
                    }else{
                  var emp = result.insertId;
                   res.json({"var_code":"1","msg":"payment_type status UPDATE","result":emp});
                    }
                  });
              
            }
           });


  }
module.exports = router;
