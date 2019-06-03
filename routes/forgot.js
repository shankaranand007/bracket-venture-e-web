   'use strict'
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
// var moment = require('moment');

router.post('/forget', function(req, res, next) {
  try{
  	var reqObj = req.body;
  	var email = reqObj.email;
  	req.getConnection((err,conn)=>{
  		if(err)console.log(err)
  			else{
  				conn.query("SELECT password FROM signup WHERE email='"+reqObj.email+"'",(err,result)=>{
  					if(err)console.log(err);
  					else{
  						res.json({"var_code":1,"msg":"array key are differ","key":[]});
  						 // res.render('welcome', { title: emp });
  						 var size = result.length;
  						 if(size>0){
									res.render('forget', {repassword:result[0].password}, function(err, html){ 
									if(err){
									console.log(err);
									}else{

									let transporter = nodemailer.createTransport({
									service: 'gmail',
									host: 'smtp.gmail.com',
									port: 587,
									secure: false, // true for 465, false for other ports
									auth: {

									 user: 'muthu@smaatapps.com',
        							 pass:'vijaya@83'
									}
									});
									console.log(email);
									// setup email data with unicode symbols
									let mailOptions = {
									from: '"Bondoori Wings 👻" <callmeshankar007@gmail.com>', // sender address
									to: email, // list of receivers
									subject: 'Forgot password mail ✔', // Subject line
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
  						 }else{
  						 	res.json({"var_code":0,"msg":"fail","key":[]});
  						 }
  					}
  				})
  			}
  	})
  }catch(e){console.log(e);}
});

module.exports = router; 