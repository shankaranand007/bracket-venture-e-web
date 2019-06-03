var express = require('express');
var router = express.Router();
var stripe = require('stripe')('sk_test_VmPPyFpfzhl8ZscF5bkxdoWv');
// sk_live_gYyUxUq7qmPU5uY3dFNZzYMD
// sk_test_VmPPyFpfzhl8ZscF5bkxdoWv
/* GET users listing. */
router.post('/', function(req, res, next) {
 	
});
router.post('/stripe', function(req, res, next) {
	console.log(req.body);
 	var token ;
 	(req.body.stripeToken == undefined)? token = "": token = req.body.stripeToken;
 	var ordered_id = req.body.ordered_id;
 	var admin_id = req.body.admin_id;
 	var chargeAmount = req.body.chargeAmount;
 	var amount = Math.round(chargeAmount*100);
 	// console.log(chargeAmount);
 	stripe.charges.create({
		  amount: amount,
		  currency: "usd",
		  source: token, // obtained with Stripe.js
		  description: "Gateway powerd by stripe"
		}, function(err, charge) {
		  // asynchronously called
		  if(err){
		  switch (err.type) {
			  case 'StripeCardError':
			    // A declined card error
			    // => e.g. "Your card's expiration year is invalid."
			     var card_err = err.message; 
			    res.json({"var_code":"0","msg":card_err});
			    break;
			  case 'RateLimitError':
			    // Too many requests made to the API too quickly
			      var card_err = err.message; 
			     res.json({"var_code":"0","msg":card_err});
			    break;
			  case 'StripeInvalidRequestError':
			    // Invalid parameters were supplied to Stripe's API
			      var card_err = err.message; 
			    res.json({"var_code":"0","msg":card_err});
			    break;
			  case 'StripeAPIError':
			    // An error occurred internally with Stripe's API
			    var card_err = err.message; 
			    res.json({"var_code":"0","msg":card_err});
			    break;
			  case 'StripeConnectionError':
			    // Some kind of error occurred during the HTTPS communication
			     var card_err = err.message; 
			     res.json({"var_code":"0","msg":card_err});
			    break;
			  case 'StripeAuthenticationError':
			    // You probably used an incorrect API key
			     var card_err = err.message; 
			    res.json({"var_code":"0","msg":card_err});
			    break;
			  default:
			    // Handle any other types of unexpected errors
			     //var card_err = err.message; 
			    res.json({"var_code":"0","msg":"some undefine error"});
			    break;
			}
		}else{
			 // console.log(charge);
			//res.redirect('http://localhost:4200/#/cart2');
			var status =charge.status;
			var amount = chargeAmount;
			var brand = charge.source.brand;
			var msg = charge.outcome.seller_message;
			 req.getConnection((err,conn)=>{
			 	if(err){
			 		console.log(err)
			 	}else{
			 	 var sql = "INSERT INTO card_payment SET ?";
                 var value = {
                   "status":status,
                   "amount":amount,
                   "brand":brand,
                   "msg":msg,
                   "token":charge.id,
                   "user_id":admin_id,
                   "ordered_id":ordered_id,
                   "refund_status":0
                  };
                 conn.query(sql,value,function(err, result){
                   if(err){
                     console.error("sql error:",err);
                     return next(err);
                   }
                   var emp = result.insertId;
                   res.json({"var_code":"1","msg":msg,"result":emp});
                  // console.log("result"+emp);
                 });
			 	}
			 });
			//res.json({charge});
		}
		});
});
module.exports = router;


router.post('/stripe_refund', function(req, res, next) {
  try{
  		var reqObj = req.body;
  		req.getConnection((err,conn)=>{
  			if(err){console.log(err)}else{
  				var sql= "SELECT token FROM card_payment WHERE ordered_id='"+reqObj.ordered_id+"'";
  				conn.query(sql,(err, result)=>{
  					if(err){console.log(err)}else{
  						// console.log(result[0].token);
  						  		stripe.refunds.create({
							 	charge: result[0].token
								}, (err, refund) =>{
							  	if(err){console.log(err)}
							  	else{
							  		// res.json({refund});

									var sql = "UPDATE card_payment SET ? WHERE ordered_id = '"+reqObj.ordered_id+"'";
									
									var value = {
									"refund_id":refund.id,
									"refund_status":1
									};

									conn.query(sql,value,(err, result)=>{
									if(err){
									console.log("db"+err)
									}else{
									var emp = result.insertId;
									res.json({"var_code":"1","msg":"Your query is recevied","result":refund});
									}
									});
							  	}
								});
  					}
  				})
  			}
  		});
			

  }catch(e){console.log(e);}
});