var express = require('express');
var router = express.Router();

module.exports = router;

router.post('/items',function(req,res,next){
    try{
        var reqObj = req.body;
        req.getConnection(function(err,conn){
            if(err){
                console.error("mysql connection error:",err);
                return next(err);
              }else{
                  // var sql = "SELECT * FROM catagerory ORDER BY cat_rating DESC ";
                  var sql = "SELECT * FROM items";
                  conn.query(sql,function(err, result){
                    if(err){
                        console.error("sql error:",err);
                        return next(err);
                    }else{
                        (result.length > 0)?
                        res.json({"var_code":"1","msg":"key","result":result})
                        :
                        res.json({"var_code":"0","msg":"no data are available","result":[]})
                        
                    }
                  });
              }
        });
    }catch(e){
        console.log("catagory"+e);
    }

});

router.post('/edit_type',(req,res,next)=>{
	try{
		 var reqObj = req.body;
		 
		 req.getConnection((err,conn)=>{
		 	if(err){console.log(err)}else{
		 		var sql = "UPDATE items SET type='"+reqObj.type+"'WHERE item_id='"+reqObj.item_id+"'";
		 		conn.query(sql,(err,result)=>{
		 			if(err){console.log(err)}else{
		 				res.json({"var_code":"1","msg":"Update cat name successfully","result":result});
		 			}
		 		})
		 	}
		 })
		}catch(e){console.log(e)}
});

router.post('/edit_price',(req,res,next)=>{
	try{
		 var reqObj = req.body;
		 
		 req.getConnection((err,conn)=>{
		 	if(err){console.log(err)}else{
		 		var sql = "UPDATE items SET price='"+reqObj.price+"'WHERE item_id='"+reqObj.item_id+"'";
		 		conn.query(sql,(err,result)=>{
		 			if(err){console.log(err)}else{
		 				res.json({"var_code":"1","msg":"Update cat name successfully","result":result});
		 			}
		 		})
		 	}
		 })
		}catch(e){console.log(e)}
});
router.post('/delete_item',(req,res,next)=>{
      try{
             var reqObj = req.body;

       req.getConnection((err,conn)=>{
            if(err){
                  console.log(err)
            }else{
                  var sql = "DELETE FROM items WHERE item_id = '"+reqObj.item_id+"' ";

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

router.post('/add',(req,res,next)=>{



      try{
             var reqObj = req.body;

       req.getConnection((err,conn)=>{
            if(err){
                  console.log(err)
            }else{
                  var sql = "INSERT INTO items SET ?";
                  var data = {
                             "cat_id":reqObj.cat_id,
                             "sub_cat_id":reqObj.sub_cat_id,
                             "price":reqObj.price,
                              "type":reqObj.type,
                             "item_name":reqObj.item_name,
                             "item_id":reqObj.item_id,
                             "qty":1
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