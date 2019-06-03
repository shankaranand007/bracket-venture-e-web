var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/update',(req,res)=>{
    var reqObj = req.body;
    var prekey = Array('user_id','detail_id');
    var arr    = Object.keys(reqObj);
         req.getConnection((err,conn)=>{
            if(err){
                console.log(err); 
                res.json({"msg":err});
            }else{
                 var sql = "UPDATE signup SET ? WHERE user_id='"+reqObj.user_id+"'";
                         var data = {
                              "mobile_number":reqObj.mob,
			                   "email":reqObj.mail,
			                   "name":reqObj.name,

                            };
                        conn.query(sql,data, (err,result)=>{
                            if(err){
                                res.json({"var_code":"0","msg":err,"result":[]});
                            }else{
                                  var sql = "SELECT * FROM signup WHERE user_id='"+reqObj.user_id+"'";
                                    conn.query(sql,(err,result)=>{
                                        if(err){
                                            res.json({"var_code":"0","msg":err,"result":[]});
                                        }else{
                                           res.json({"var_code":"1","msg":"data update","result":result});
                                        }
                                    });
                                
                            }
                        });
                 
            }
        });

});
module.exports = router;
