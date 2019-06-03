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
  
  var upload = multer({ storage: storage }).single('slide');

router.post('/slide_img1',(req,res,next)=>{
  upload(req, res, function (err) {
  try{
     var reqObj = req.body;
     
     req.getConnection((err,conn)=>{
      if(err){console.log(err)}else{
        var sql = "UPDATE page_settings SET s1_img='"+time2+"'WHERE id='"+reqObj.s_id+"'";
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

router.post('/slide_img2',(req,res,next)=>{
  upload(req, res, function (err) {
  try{
     var reqObj = req.body;
     
     req.getConnection((err,conn)=>{
      if(err){console.log(err)}else{
        var sql = "UPDATE page_settings SET s2_img='"+time2+"'WHERE id='"+reqObj.s_id+"'";
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

router.post('/slide_img3',(req,res,next)=>{
  upload(req, res, function (err) {
  try{
     var reqObj = req.body;
     
     req.getConnection((err,conn)=>{
      if(err){console.log(err)}else{
        var sql = "UPDATE page_settings SET s3_img='"+time2+"'WHERE id='"+reqObj.s_id+"'";
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

  router.post('/privacy_img',(req,res,next)=>{
  upload(req, res, function (err) {
  try{
     var reqObj = req.body;
     
     req.getConnection((err,conn)=>{
      if(err){console.log(err)}else{
        var sql = "UPDATE page_settings SET privacy_img='"+time2+"'WHERE id='"+reqObj.id+"'";
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
  router.post('/terms_img',(req,res,next)=>{
  upload(req, res, function (err) {
  try{
     var reqObj = req.body;
     
     req.getConnection((err,conn)=>{
      if(err){console.log(err)}else{
        var sql = "UPDATE page_settings SET terms_img='"+time2+"'WHERE id='"+reqObj.id+"'";
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