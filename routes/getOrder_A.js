var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    try{
     var reqObj = req.body;

       req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                 
                var sql = "SELECT * FROM orders WHERE order_status=3 OR order_status=4 OR order_status =5 OR order_status=0 ORDER BY order_id DESC";
                conn.query(sql,(err,result)=>{
                    if(err){
                        res.json({"var_code":"0","msg":err,"result":[]});
                    }else{
                        res.json({"var_code":"1","msg":"data","result":result});
                    }
                }); 
                 
            }
        }); 
    }catch(e){
        console.log(e);
    }
});
module.exports = router;