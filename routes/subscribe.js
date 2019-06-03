var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
router.post('/', function(req, res, next) {
	try{
  var reqObj = req.body;
  var mail =  reqObj.mail;
  	   req.getConnection((err,conn)=>{
           	if(err){
           		console.log("conn"+err);

           	}else{
           		var user_id;
              // console.log(reqObj.mobile_number);
           		 var sql = "INSERT INTO subscribe SET ?";
           		if(reqObj.user_id == null ||reqObj.user_id == undefined){user_id="";}else{user_id =reqObj.user_id; }
                 var value = {
                   
                   "mail":reqObj.mail,
                   "user_id":user_id
                 };
               
                  conn.query(sql,value,(err, result)=>{
                  	if(err){
                  		console.log("db"+err)
                  	}else{


                               res.render('subscribe', function(err, html){ 

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
                                    subject: 'Thanks for subscription', // Subject line
                                    // text: user_detail, // plain text body
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
              	  // var emp = result.insertId;
                 //   res.json({"var_code":"1","msg":"Your query is recevied","result":emp});
                  	}
                  });
           		
           	}
           });
	}catch(e){console.log(e);}
});
module.exports = router;