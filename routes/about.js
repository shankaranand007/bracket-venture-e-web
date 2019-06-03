var express = require('express');
var router = express.Router();
var multer =  require('multer');
var time;
var time2;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //console.log("function enter");
      cb(null, 'img')
    },
    filename: function (req, file, cb) {
       time =  file.fieldname + '-' + Date.now()+'.png';
      cb(null,time)
      time2 = "http://34.237.224.132/img/"+time
      console.log("http://34.237.224.132/img/"+time)
       
    }
  });
  
  var upload = multer({ storage: storage }).single('logo');

router.post('/about_tag', function(req, res, next) {
  try{
    var reqObj = req.body;
    console.log(reqObj);

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err}); 
            }else{

               // else{  
                    sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
                    var data={
                        "about_tag":reqObj.about_tag
                    }
                //}

                conn.query( sql, data, function(err, result) {
                if(err){
                console.log(err)
                }else{
                res.json({"var_code":"1","msg":"data","result":result})
                }
                }); 

        }
    });
    
    }catch(e){
        console.log(e);
    }
});


router.post('/about_img_tag', function(req, res, next) {
  try{
    var reqObj = req.body;
    console.log(reqObj);

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err}); 
            }else{

               // else{  
                    sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
                    var data={
                        "about_img_tag":reqObj.about_img_tag
                    }
                //}

                conn.query( sql, data, function(err, result) {
                if(err){
                console.log(err)
                }else{
                res.json({"var_code":"1","msg":"data","result":result})
                }
                }); 

        }
    });
    
    }catch(e){
        console.log(e);
    }
});

router.post('/faq_img_tag', function(req, res, next) {
  try{
    var reqObj = req.body;
    console.log(reqObj);

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err}); 
            }else{

               // else{  
                    sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
                    var data={
                        "faq_img_tag":reqObj.faq_img_tag
                    }
                //}

                conn.query( sql, data, function(err, result) {
                if(err){
                console.log(err)
                }else{
                res.json({"var_code":"1","msg":"ssss","result":result})
                }
                }); 

        }
    });
    
    }catch(e){
        console.log(e);
    }
});
router.post('/about_insert',(req, res, next)=>{
    try{
        var reqObj = req.body;
        console.log(reqObj);
        req.getConnection((err,conn)=>{
            if(err){console.log(err)}else{
                var data={
                    "about_title":reqObj.about_title,
                    "about_contant":reqObj.about_contant
                }
                conn.query("INSERT INTO about SET ?",data,(err,result)=>{
                    if(err){console.log(err)}else{
                         res.json({"var_code":"1","msg":"data","result":result})
                    }
                })
            }
        })
    }catch(e){console.log(e)}
})
// router.post('/about_branch', function(req, res, next) {
//   try{
//     var reqObj = req.body;
//     console.log(reqObj);

//       req.getConnection((err,conn)=>{
//             if(err){
//                 console.log(err);
//                 res.json({"msg":err}); 
//             }else{

//                // else{  
//                     sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
//                     var data={
//                         "about_branch":reqObj.about_branch
//                     }
//                 //}

//                 conn.query( sql, data, function(err, result) {
//                 if(err){
//                 console.log(err)
//                 }else{
//                 res.json({"var_code":"1","msg":"data","result":result})
//                 }
//                 });

//         }
//     });
    
//     }catch(e){
//         console.log(e);
//     }
// });

// router.post('/about_food', function(req, res, next) {
//   try{
//     var reqObj = req.body;
//     console.log(reqObj);

//       req.getConnection((err,conn)=>{
//             if(err){
//                 console.log(err);
//                 res.json({"msg":err}); 
//             }else{

//                // else{  
//                     sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
//                     var data={
//                         "about_food":reqObj.about_food
//                     }
//                 //}

//                 conn.query( sql, data, function(err, result) {
//                 if(err){
//                 console.log(err)
//                 }else{
//                 res.json({"var_code":"1","msg":"data","result":result})
//                 }
//                 });

//         }
//     });
    
//     }catch(e){
//         console.log(e);
//     }
// });

// router.post('/about_delivery', function(req, res, next) {
//   try{
//     var reqObj = req.body;
//     console.log(reqObj);

//       req.getConnection((err,conn)=>{
//             if(err){
//                 console.log(err);
//                 res.json({"msg":err}); 
//             }else{

//                // else{  
//                     sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
//                     var data={
//                         "about_delivery":reqObj.about_delivery
//                     }
//                 //}

//                 conn.query( sql, data, function(err, result) {
//                 if(err){
//                 console.log(err)
//                 }else{
//                 res.json({"var_code":"1","msg":"data","result":result})
//                 }
//                 });

//         }
//     });
    
//     }catch(e){
//         console.log(e);
//     }
// });
// router.post('/about_support', function(req, res, next) {
//   try{
//     var reqObj = req.body;
//     console.log(reqObj);

//       req.getConnection((err,conn)=>{
//             if(err){
//                 console.log(err);
//                 res.json({"msg":err}); 
//             }else{

//                // else{  
//                     sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
//                     var data={
//                         "about_support":reqObj.about_support
//                     }
//                 //}

//                 conn.query( sql, data, function(err, result) {
//                 if(err){
//                 console.log(err)
//                 }else{
//                 res.json({"var_code":"1","msg":"data","result":result})
//                 }
//                 });

//         }
//     });
    
//     }catch(e){
//         console.log(e);
//     }
// });
// router.post('/about_cash', function(req, res, next) {
//   try{
//     var reqObj = req.body;
//     console.log(reqObj);

//       req.getConnection((err,conn)=>{
//             if(err){
//                 console.log(err);
//                 res.json({"msg":err}); 
//             }else{

//                // else{  
//                     sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
//                     var data={
//                         "about_cash":reqObj.about_cash
//                     }
//                 //}

//                 conn.query( sql, data, function(err, result) {
//                 if(err){
//                 console.log(err)
//                 }else{
//                 res.json({"var_code":"1","msg":"data","result":result})
//                 }
//                 });

//         }
//     });
    
//     }catch(e){
//         console.log(e);
//     }
// });
// router.post('/about_card', function(req, res, next) {
//   try{
//     var reqObj = req.body;
//     console.log(reqObj);

//       req.getConnection((err,conn)=>{
//             if(err){
//                 console.log(err);
//                 res.json({"msg":err}); 
//             }else{

//                // else{  
//                     sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
//                     var data={
//                         "about_card":reqObj.about_card
//                     }
//                 //}

//                 conn.query( sql, data, function(err, result) {
//                 if(err){
//                 console.log(err)
//                 }else{
//                 res.json({"var_code":"1","msg":"data","result":result})
//                 }
//                 });

//         }
//     });
    
//     }catch(e){
//         console.log(e);
//     }
// });
router.post('/about_img',(req,res,next)=>{
upload(req, res, function (err) {
	try{
		 var reqObj = req.body;
		 
		 req.getConnection((err,conn)=>{
		 	if(err){console.log(err)}else{
		 		var sql = "UPDATE page_settings SET about_img='"+time2+"'WHERE id='"+reqObj.id+"'";
		 		conn.query(sql,(err,result)=>{
		 			if(err){console.log(err)}else{
		 				res.json({"var_code":"1","msg":"Update img successfully","result":result});
		 			}
		 		})
		 	}
		 })
		}catch(e){console.log(e)}
	});
});
module.exports = router;

router.post('/logo',(req,res,next)=>{
upload(req, res, function (err) {
  try{
     var reqObj = req.body;
     
     req.getConnection((err,conn)=>{
      if(err){console.log(err)}else{
        var sql = "UPDATE page_settings SET logo='"+time2+"'WHERE id='"+reqObj.id+"'";
        conn.query(sql,(err,result)=>{
          if(err){console.log(err)}else{
            res.json({"var_code":"1","msg":"Update img successfully","result":result});
          }
        })
      }
     })
    }catch(e){console.log(e)}
  });
});

router.post('/get_setting_dettails', function(req, res, next) {
  try{

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                        conn.query( 'SELECT id,about_tag,about_img,about_img_tag,about_heading FROM page_settings LIMIT 0,1', ( err, rows ) => {
                          conn.query( 'SELECT * FROM about', ( err, rows2 ) => {

                              res.json({"var_code":"1","msg":"data","result":rows,"result2":rows2});
                              // conn.close((err)=>{console.log(err)})
                          })
                        })
        }
    });
    
    }catch(e){
        console.log(e);
    }
});


router.post('/about_heading2', function(req, res, next) {
  try{
    var reqObj = req.body;
    // console.log(reqObj);

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err}); 
            }else{

               // else{  
                    sql = "UPDATE about SET ? WHERE about_id='"+reqObj.id+"'";
                    var data={
                        "about_title":reqObj.heading
                    }
                //}

                conn.query( sql, data, function(err, result) {
                if(err){
                console.log(err)
                }else{
                res.json({"var_code":"1","msg":"data","result":result})
                }
                });

        }
    });
    
    }catch(e){
        console.log(e);
    }
});

router.post('/about_contant', function(req, res, next) {
  try{
    var reqObj = req.body;
    // console.log(reqObj);

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err}); 
            }else{

               // else{  
                    sql = "UPDATE about SET ? WHERE about_id='"+reqObj.id+"'";
                    var data={
                        "about_contant":reqObj.about_contant
                    }
                //}

                conn.query( sql, data, function(err, result) {
                if(err){
                console.log(err)
                }else{
                res.json({"var_code":"1","msg":"data","result":result})
                }
                });

        }
    });
    
    }catch(e){
        console.log(e);
    }
});

// router.post('/food_heading', function(req, res, next) {
//   try{
//     var reqObj = req.body;
//     // console.log(reqObj);

//       req.getConnection((err,conn)=>{
//             if(err){
//                 console.log(err);
//                 res.json({"msg":err}); 
//             }else{

//                // else{  
//                     sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
//                     var data={
//                         "food_heading":reqObj.food_heading
//                     }
//                 //}

//                 conn.query( sql, data, function(err, result) {
//                 if(err){
//                 console.log(err)
//                 }else{
//                 res.json({"var_code":"1","msg":"data","result":result})
//                 }
//                 });

//         }
//     });
    
//     }catch(e){
//         console.log(e);
//     }
// });

// router.post('/delivery_heading', function(req, res, next) {
//   try{
//     var reqObj = req.body;
//     // console.log(reqObj);

//       req.getConnection((err,conn)=>{
//             if(err){
//                 console.log(err);
//                 res.json({"msg":err}); 
//             }else{

//                // else{  
//                     sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
//                     var data={
//                         "delivery_heading":reqObj.delivery_heading
//                     }
//                 //}

//                 conn.query( sql, data, function(err, result) {
//                 if(err){
//                 console.log(err)
//                 }else{
//                 res.json({"var_code":"1","msg":"data","result":result})
//                 }
//                 });

//         }
//     });
    
//     }catch(e){
//         console.log(e);
//     }
// });

// router.post('/support_heading', function(req, res, next) {
//   try{
//     var reqObj = req.body;
//     // console.log(reqObj);

//       req.getConnection((err,conn)=>{
//             if(err){
//                 console.log(err);
//                 res.json({"msg":err}); 
//             }else{

//                // else{  
//                     sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
//                     var data={
//                         "support_heading":reqObj.support_heading
//                     }
//                 //}

//                 conn.query( sql, data, function(err, result) {
//                 if(err){
//                 console.log(err)
//                 }else{
//                 res.json({"var_code":"1","msg":"data","result":result})
//                 }
//                 });

//         }
//     });
    
//     }catch(e){
//         console.log(e);
//     }
// });

// router.post('/cashpayment_heading', function(req, res, next) {
//   try{
//     var reqObj = req.body;
//     // console.log(reqObj);

//       req.getConnection((err,conn)=>{
//             if(err){
//                 console.log(err);
//                 res.json({"msg":err}); 
//             }else{

//                // else{  
//                     sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
//                     var data={
//                         "cashpayment_heading":reqObj.cashpayment_heading
//                     }
//                 //}

//                 conn.query( sql, data, function(err, result) {
//                 if(err){
//                 console.log(err)
//                 }else{
//                 res.json({"var_code":"1","msg":"data","result":result})
//                 }
//                 });

//         }
//     });
    
//     }catch(e){
//         console.log(e);
//     }
// });

// router.post('/cardpayment_heading', function(req, res, next) {
//   try{
//     var reqObj = req.body;
//     // console.log(reqObj);

//       req.getConnection((err,conn)=>{
//             if(err){
//                 console.log(err);
//                 res.json({"msg":err}); 
//             }else{

//                // else{  
//                     sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
//                     var data={
//                         "cardpayment_heading":reqObj.cardpayment_heading
//                     }
//                 //}

//                 conn.query( sql, data, function(err, result) {
//                 if(err){
//                 console.log(err)
//                 }else{
//                 res.json({"var_code":"1","msg":"data","result":result})
//                 }
//                 });

//         }
//     });
    
//     }catch(e){
//         console.log(e);
//     }
// });

router.post('/faq_img',(req,res,next)=>{
upload(req, res, function (err) {
    try{
         var reqObj = req.body;
         
         req.getConnection((err,conn)=>{
            if(err){console.log(err)}else{
                var sql = "UPDATE page_settings SET faq_img='"+time2+"'WHERE id='"+reqObj.id+"'";
                conn.query(sql,(err,result)=>{
                    if(err){console.log(err)}else{
                        res.json({"var_code":"1","msg":"Update img successfully","result":result});
                    }
                })
            }
         })
        }catch(e){console.log(e)}
    });
});