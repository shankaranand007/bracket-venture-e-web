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
  
  var upload = multer({ storage: storage }).single('catagory_img');



router.post('/',(req,res,next)=>{

upload(req, res, function (err) {

	try{
		 var reqObj = req.body;

       req.getConnection((err,conn)=>{
       	if(err){
       		console.log(err)
       	}else{
       		var sql = "INSERT INTO catagerory SET ?";
       		var data = {
       			     "category_name":reqObj.category_name,
                             "short_disc":reqObj.short_disc,
                   	     "cat_img":time2
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

});

router.post('/delete_catagory',(req,res,next)=>{
	try{
		 var reqObj = req.body;

       req.getConnection((err,conn)=>{
       	if(err){
       		console.log(err)
       	}else{
       		var sql = "DELETE FROM catagerory WHERE cat_id = '"+reqObj.cat_id+"' ";

       		conn.query(sql,(err,result)=>{
       			if(err){
       				console.log(err)
       			}else{
       				res.json({"var_code":"1","msg":"Delete Successfully","result":result});
       			}
       		})
       	}
       });
	}catch(e){console.log(e)}
});

router.post('/add_subcatagory',(req,res,next)=>{

upload(req, res, function (err) {
	try{
		 var reqObj = req.body;
		console.log(reqObj,"yes is this")
       req.getConnection((err,conn)=>{
       	if(err){
       		console.log(err)
       	}else{
       		var sql = "INSERT INTO sub_catagory SET ?";
       		var data = {
       			"cat_id":reqObj.cat_id,
                        "items":reqObj.items,
                   	"amount":reqObj.amount,
                   	"short_disc":reqObj.short_disc,
                   	"item_details":reqObj.item_details,
                   	 "item_image":time2,
                   	"item_type":reqObj.item_type,
                   	"fat":reqObj.fat,
                   	"calories":reqObj.calories,
                   	"long_disc":reqObj.long_disc,
                   	"protiens":reqObj.protiens,
                   	"rating":reqObj.rating,
                   	"qty":reqObj.qty
       		}
       		conn.query(sql,data,(err,result)=>{
       			if(err){
       				console.log(err)
       			}else{
       				res.json({"var_code":"1","msg":"data sub insert","result":result});
       			}
       		})
       	}
       });
	}catch(e){console.log(e)}

});
});



router.post('/delete_subcatagory',(req,res,next)=>{
	try{
		 var reqObj = req.body;

       req.getConnection((err,conn)=>{
       	if(err){
       		console.log(err)
       	}else{
       		var sql = "DELETE FROM sub_catagory WHERE sub_cat_id = '"+reqObj.sub_cat_id+"' ";

       		conn.query(sql,(err,result)=>{
       			if(err){
       				console.log(err)
       			}else{
       				res.json({"var_code":"1","msg":"Delete Successfully","result":result});
       			}
       		})
       	}
       });
	}catch(e){console.log(e)}
});
module.exports = router; 