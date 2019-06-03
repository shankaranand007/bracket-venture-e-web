  
var express = require('express');
var router = express.Router();
var moment = require('moment');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

router.post('/today',function(req,res,next){
    try{
        var reqObj = req.body;
        var date2 = moment().format("YYYY-MM-DD");
        req.getConnection(function(err,conn){
            if(err){
                console.error("mysql connection error:",err);
                return next(err);
              }else{
                 
                  var sql = "SELECT FORMAT(SUM( total_amount),2) as total  FROM `orders` WHERE `receive_time`  like '%" + date2 + "%' AND order_status=3 OR order_status=4 OR order_status =5 OR order_status=0";
                  
                  conn.query(sql,function(err, result){
                    if(err){
                        console.error("sql error:",err);
                        return next(err);
                    }else{
                        (result.length > 0)?
                        res.json({"var_code":"1","msg":"key","result":result[0].total})
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

router.post('/total',function(req,res,next){
    try{
        var reqObj = req.body;
        var date2 = moment().format("YYYY-MM-DD");
        req.getConnection(function(err,conn){
            if(err){
                console.error("mysql connection error:",err);
                return next(err);
              }else{
                 
                  var sql = "SELECT FORMAT(SUM( total_amount),2) as total  FROM `orders` WHERE order_status=3 OR order_status=4 OR order_status =5 OR order_status=0";
                  
                  conn.query(sql,function(err, result){
                    if(err){
                        console.error("sql error:",err);
                        return next(err);
                    }else{
                        (result.length > 0)?
                        res.json({"var_code":"1","msg":"key","result":result[0].total})
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

router.post('/s_to_e',function(req,res,next){
     try{
        var reqObj = req.body;
        var sdate = reqObj.sdate +" 00:00:00";
        var date2 = moment().format("h:mm:ss");
        var edate = reqObj.edate+" "+date2;

        req.getConnection(function(err,conn){
            if(err){
                console.error("mysql connection error:",err);
                return next(err);
              }else{
                 
                  var sql = "SELECT FORMAT(SUM(total_amount),2) AS total FROM orders WHERE receive_time >= '" + sdate + "' AND receive_time <= '" + edate + "' AND order_status=3 OR order_status=4 OR order_status =5 OR order_status=0";
                  
                  conn.query(sql,function(err, result){
                    if(err){
                        console.error("sql error:",err);
                        return next(err);
                    }else{
                        (result.length > 0)?
                        res.json({"var_code":"1","msg":"key","result":result[0].total,edate,sdate})
                        :
                        res.json({"var_code":"0","msg":"no data are available","result":[]})
                        
                    } 
                     // res.json({"var_code":"0","msg":"no data are available","result":date2})
                  });
              }
        });
    }catch(e){
        console.log("catagory"+e);
    }

});
