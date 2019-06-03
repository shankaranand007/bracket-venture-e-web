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
  
  var upload = multer({ storage: storage }).single('edit_img');

router.post('/',(req,res,next)=>{
	try{
		 var reqObj = req.body;
		 
		 req.getConnection((err,conn)=>{
		 	if(err){console.log(err)}else{
		 		var sql = "UPDATE catagerory SET category_name='"+reqObj.update_catagoryname+"'WHERE cat_id='"+reqObj.cat_id+"'";
		 		conn.query(sql,(err,result)=>{
		 			if(err){console.log(err)}else{
		 				res.json({"var_code":"1","msg":"Update cat name successfully","result":result});
		 			}
		 		})
		 	}
		 })
		}catch(e){console.log(e)}
});



router.post('/update_cat_price',(req,res,next)=>{
	try{
		 var reqObj = req.body;
		 
		 req.getConnection((err,conn)=>{
		 	if(err){console.log(err)}else{
		 		var sql = "UPDATE catagerory SET short_disc='"+reqObj.update_catagoryshort_disc+"'WHERE cat_id='"+reqObj.cat_id+"'";
		 		conn.query(sql,(err,result)=>{
		 			if(err){console.log(err)}else{
		 				res.json({"var_code":"1","msg":"Update cat_price successfully","result":result});
		 			}
		 		})
		 	}
		 })
		}catch(e){console.log(e)}
});

router.post('/update_cat_img',(req,res,next)=>{
upload(req, res, function (err) {
	try{
		 var reqObj = req.body;
		 
		 req.getConnection((err,conn)=>{
		 	if(err){console.log(err)}else{
		 		var sql = "UPDATE catagerory SET cat_img='"+time2+"'WHERE cat_id='"+reqObj.cat_id+"'";
		 		conn.query(sql,(err,result)=>{
		 			if(err){console.log(err)}else{
		 				res.json({"var_code":"1","msg":"Update cat_price successfully","result":result});
		 			}
		 		})
		 	}
		 })
		}catch(e){console.log(e)}
	});
});
// ----------------- sub_cat---------------------------------------------------------------------------------
// router.post('/update_subcat_itemname',(req,res,next)=>{
// 	try{
// 		 var reqObj = req.body;
		 
// 		 req.getConnection((err,conn)=>{
// 		 	if(err){console.log(err)}else{
// 		 		var sql = "UPDATE sub_catagory SET items='"+reqObj.update_catagoryshort_disc+"'WHERE sub_cat_id='"+reqObj.subcat_id+"'";
// 		 		conn.query(sql,(err,result)=>{
// 		 			if(err){console.log(err)}else{
// 		 				res.json({"var_code":"1","msg":"Update cat_price successfully","result":result});
// 		 			}
// 		 		})
// 		 	}
// 		 })
// 		}catch(e){console.log(e)}
// });
router.post('/update_subcat_item',(req,res,next)=>{
	try{
		 var reqObj = req.body;
		 
		 req.getConnection((err,conn)=>{
		 	if(err){console.log(err)}else{
		 		var sql = "UPDATE sub_catagory SET items='"+reqObj.update_items+"'WHERE sub_cat_id='"+reqObj.subcat_id+"'";
		 		conn.query(sql,(err,result)=>{
		 			if(err){console.log(err)}else{
		 				res.json({"var_code":"1","msg":"Update cat_price successfully","result":result});
		 			}
		 		})
		 	}
		 })
		}catch(e){console.log(e)}
});
router.post('/update_subcat_amount',(req,res,next)=>{
	try{
		 var reqObj = req.body;
		 
		 req.getConnection((err,conn)=>{
		 	if(err){console.log(err)}else{
		 		var sql = "UPDATE sub_catagory SET amount='"+reqObj.update_amount+"'WHERE sub_cat_id='"+reqObj.subcat_id+"'";
		 		conn.query(sql,(err,result)=>{
		 			if(err){console.log(err)}else{
		 				res.json({"var_code":"1","msg":"Update cat_price successfully","result":result});
		 			}
		 		})
		 	}
		 })
		}catch(e){console.log(e)}
});
router.post('/update_subcat_short_disc',(req,res,next)=>{
	try{
		 var reqObj = req.body;
		 
		 req.getConnection((err,conn)=>{
		 	if(err){console.log(err)}else{
		 		var sql = "UPDATE sub_catagory SET short_disc='"+reqObj.update_short_disc+"'WHERE sub_cat_id='"+reqObj.subcat_id+"'";
		 		conn.query(sql,(err,result)=>{
		 			if(err){console.log(err)}else{
		 				res.json({"var_code":"1","msg":"Update cat_price successfully","result":result});
		 			}
		 		})
		 	}
		 })
		}catch(e){console.log(e)}
});
router.post('/update_subcat_item_details',(req,res,next)=>{
	try{
		 var reqObj = req.body;
		 
		 req.getConnection((err,conn)=>{
		 	if(err){console.log(err)}else{
		 		var sql = "UPDATE sub_catagory SET item_details='"+reqObj.update_item_details+"'WHERE sub_cat_id='"+reqObj.subcat_id+"'";
		 		conn.query(sql,(err,result)=>{
		 			if(err){console.log(err)}else{
		 				res.json({"var_code":"1","msg":"Update cat_price successfully","result":result});
		 			}
		 		})
		 	}
		 })
		}catch(e){console.log(e)}
});
router.post('/update_subcat_item_type',(req,res,next)=>{
	try{
		 var reqObj = req.body;
		 
		 req.getConnection((err,conn)=>{
		 	if(err){console.log(err)}else{
		 		var sql = "UPDATE sub_catagory SET item_type='"+reqObj.update_item_type+"'WHERE sub_cat_id='"+reqObj.subcat_id+"'";
		 		conn.query(sql,(err,result)=>{
		 			if(err){console.log(err)}else{
		 				res.json({"var_code":"1","msg":"Update cat_price successfully","result":result});
		 			}
		 		})
		 	}
		 })
		}catch(e){console.log(e)}
});
router.post('/update_subcat_fat',(req,res,next)=>{
	try{
		 var reqObj = req.body;
		 
		 req.getConnection((err,conn)=>{
		 	if(err){console.log(err)}else{
		 		var sql = "UPDATE sub_catagory SET fat='"+reqObj.update_fat+"'WHERE sub_cat_id='"+reqObj.subcat_id+"'";
		 		conn.query(sql,(err,result)=>{
		 			if(err){console.log(err)}else{
		 				res.json({"var_code":"1","msg":"Update cat_price successfully","result":result});
		 			}
		 		})
		 	}
		 })
		}catch(e){console.log(e)}
});
router.post('/update_subcat_calories',(req,res,next)=>{
	try{
		 var reqObj = req.body;
		 
		 req.getConnection((err,conn)=>{
		 	if(err){console.log(err)}else{
		 		var sql = "UPDATE sub_catagory SET calories='"+reqObj.update_calories+"'WHERE sub_cat_id='"+reqObj.subcat_id+"'";
		 		conn.query(sql,(err,result)=>{
		 			if(err){console.log(err)}else{
		 				res.json({"var_code":"1","msg":"Update cat_price successfully","result":result});
		 			}
		 		})
		 	}
		 })
		}catch(e){console.log(e)}
});
router.post('/update_subcat_long_disc',(req,res,next)=>{
	try{
		 var reqObj = req.body;
		 
		 req.getConnection((err,conn)=>{
		 	if(err){console.log(err)}else{
		 		var sql = "UPDATE sub_catagory SET long_disc='"+reqObj.update_long_disc+"'WHERE sub_cat_id='"+reqObj.subcat_id+"'";
		 		conn.query(sql,(err,result)=>{
		 			if(err){console.log(err)}else{
		 				res.json({"var_code":"1","msg":"Update cat_price successfully","result":result});
		 			}
		 		})
		 	}
		 })
		}catch(e){console.log(e)}
});
router.post('/update_subcat_protiens',(req,res,next)=>{
	try{
		 var reqObj = req.body;
		 
		 req.getConnection((err,conn)=>{
		 	if(err){console.log(err)}else{
		 		var sql = "UPDATE sub_catagory SET protiens='"+reqObj.update_protiens+"'WHERE sub_cat_id='"+reqObj.subcat_id+"'";
		 		conn.query(sql,(err,result)=>{
		 			if(err){console.log(err)}else{
		 				res.json({"var_code":"1","msg":"Update cat_price successfully","result":result});
		 			}
		 		})
		 	}
		 })
		}catch(e){console.log(e)}
});

router.post('/update_subcat_isfamous',(req,res,next)=>{
	try{ 
		 var reqObj = req.body;
		 
		 req.getConnection((err,conn)=>{
		 	if(err){console.log(err)}else{
		 		var sql = "UPDATE sub_catagory SET is_popular='"+reqObj.is_popular+"'WHERE sub_cat_id='"+reqObj.subcat_id+"'";
		 		conn.query(sql,(err,result)=>{
		 			if(err){console.log(err)}else{
		 				res.json({"var_code":"1","msg":"Update famous successfully","result":result});
		 			}
		 		})
		 	}
		 })
		}catch(e){console.log(e)}
});


router.post('/update_subcat_rating',(req,res,next)=>{
	try{
		 var reqObj = req.body;
		 
		 req.getConnection((err,conn)=>{
		 	if(err){console.log(err)}else{
		 		var sql = "UPDATE sub_catagory SET rating='"+reqObj.update_rating+"'WHERE sub_cat_id='"+reqObj.subcat_id+"'";
		 		conn.query(sql,(err,result)=>{
		 			if(err){console.log(err)}else{
		 				res.json({"var_code":"1","msg":"Update cat_price successfully","result":result});
		 			}
		 		})
		 	}
		 })
		}catch(e){console.log(e)}
});
router.post('/update_subcat_qty',(req,res,next)=>{
	try{
		 var reqObj = req.body;
		 
		 req.getConnection((err,conn)=>{
		 	if(err){console.log(err)}else{
		 		var sql = "UPDATE sub_catagory SET qty='"+reqObj.update_qty+"'WHERE sub_cat_id='"+reqObj.subcat_id+"'";
		 		conn.query(sql,(err,result)=>{
		 			if(err){console.log(err)}else{
		 				res.json({"var_code":"1","msg":"Update cat_price successfully","result":result});
		 			}
		 		})
		 	}
		 })
		}catch(e){console.log(e)}
});

router.post('/update_subcat_img',(req,res,next)=>{
	upload(req, res, function (err) {
	try{
		 var reqObj = req.body;
		 
		 req.getConnection((err,conn)=>{
		 	if(err){console.log(err)}else{
		 		var sql = "UPDATE sub_catagory SET item_image='"+time2+"'WHERE sub_cat_id='"+reqObj.subcat_id+"'";
		 		conn.query(sql,(err,result)=>{
		 			if(err){console.log(err)}else{
		 				res.json({"var_code":"1","msg":"Update cat_img successfully","result":result});
		 			}
		 		})
		 	}
		 })
		}catch(e){console.log(e)}
	});
});


module.exports = router; 