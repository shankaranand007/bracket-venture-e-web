var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  try{
    var reqObj = req.body;
    console.log(reqObj);

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{

        var PresetData = [reqObj.length];
        for( var i = 0; i < reqObj.length; i++){
           PresetData[i] = [ reqObj[i].post, "" + reqObj[i].charge];
        }

        // console.log("PresetData: " + JSON.stringify(PresetData));
        conn.query( "INSERT INTO settings (Serving_Area_Postcodes, post_charge) VALUES ?", [PresetData], function(err, result) {
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


router.post('/delete', function(req, res, next) {
  try{
    var reqObj = req.body;
    console.log(reqObj);

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{

            var deleteRooms = [reqObj.value.length];
            for( var i = 0; i < reqObj.value.length; i++){
               deleteRooms[i] = [ reqObj.value[i].settings_id];
            }

        console.log("PresetData: " + JSON.stringify(deleteRooms));
      // var deleteRooms = [4,5,6];

            conn.query("DELETE FROM settings WHERE (settings_id) IN (?)",
                [deleteRooms],function(err,results){

                if(err) return console.log(err)
                else console.log('sended');
            });
        }
    });
    
    }catch(e){
        console.log(e);
    }
});

router.post('/delivery_charge', function(req, res, next) {
  try{
    var reqObj = req.body;
    console.log(reqObj);

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                var sql;
                if(reqObj.tax_id == undefined){
                      sql = "INSERT INTO page_settings SET ?";
                      var data={
                        "tax":reqObj.tax_charge
                      }
                }
                else{  
                    sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.tax_id+"'";
                    var data={
                        "tax":reqObj.tax_charge
                    }
                }

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


router.post('/main_tag1', function(req, res, next) {
  try{
    var reqObj = req.body;
    console.log(reqObj);

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                var sql;
                if(reqObj.id == undefined){
                      sql = "INSERT INTO page_settings SET ?";
                      var data={
                        "main_slider1":reqObj.tag
                      }
                }
                else{  
                    sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
                    var data={
                        "main_slider1":reqObj.tag
                    }
                }

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

router.post('/main_tag2', function(req, res, next) {
  try{
    var reqObj = req.body;
    console.log(reqObj);

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                var sql;
                if(reqObj.id == undefined){
                      sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
                      var data={
                        "main_slider2":reqObj.tag
                      }
                }
                else{  
                    sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
                    var data={
                        "main_slider2":reqObj.tag
                    }
                }

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

router.post('/main_tag3', function(req, res, next) {
  try{
    var reqObj = req.body;
    console.log(reqObj);

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                var sql;
                if(reqObj.id == undefined){
                      sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
                      var data={
                        "main_slider3":reqObj.tag
                      }
                }
                else{  
                    sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
                    var data={
                        "main_slider3":reqObj.tag
                    }
                }

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


router.post('/recepi', function(req, res, next) {
  try{
    var reqObj = req.body;
    console.log(reqObj);

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                var sql;
             
                 
                    sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
                    var data={
                        "Recepie":reqObj.Recepie
                    }
                

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

router.post('/ad', function(req, res, next) {
  try{
    var reqObj = req.body;
    console.log(reqObj);

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                var sql;
             
                 
                    sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
                    var data={
                        "shop_address":reqObj.address
                    }
                

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


router.post('/main_theme', function(req, res, next) {
  try{
    var reqObj = req.body;
    console.log(reqObj);

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                var sql;
             
                    console.log(reqObj,"alsh")
                    sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
                    var data={
                        "theme_color":reqObj.theme
                    }
                

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

router.post('/text_color', function(req, res, next) {
  try{
    var reqObj = req.body;
    console.log(reqObj);

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                var sql;
             
                 
                    sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
                    var data={
                        "text_color":reqObj.text_color
                    }
                

                conn.query( sql, data, function(err, result) {
                if(err){
                console.log(err)
                }else{
                res.json({"var_code":"1","msg":"text_color","result":result})
                }
                });

        }
    });
    
    }catch(e){
        console.log(e);
    }
});

router.post('/active_color', function(req, res, next) {
  try{
    var reqObj = req.body;
    console.log(reqObj);

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                var sql;
             
                 
                    sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
                    var data={
                        "active_color":reqObj.active_color
                    }
                

                conn.query( sql, data, function(err, result) {
                if(err){
                console.log(err)
                }else{
                res.json({"var_code":"1","msg":"text_color","result":result})
                }
                });

        }
    });
    
    }catch(e){
        console.log(e);
    }
});
router.post('/privacy_head', function(req, res, next) {
  try{
    var reqObj = req.body;
    console.log(reqObj);

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                var sql;
             
                 
                    sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
                    var data={
                        "privacy_head":reqObj.privacy_head
                    }
                

                conn.query( sql, data, function(err, result) {
                if(err){
                console.log(err)
                }else{
                res.json({"var_code":"1","msg":"text_color","result":result})
                }
                });

        }
    });
    
    }catch(e){
        console.log(e);
    }
});
router.post('/terms_head', function(req, res, next) {
  try{
    var reqObj = req.body;
    console.log(reqObj);

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                var sql;
             
                 
                    sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
                    var data={
                        "terms_head":reqObj.terms_head
                    }
                

                conn.query( sql, data, function(err, result) {
                if(err){
                console.log(err)
                }else{
                res.json({"var_code":"1","msg":"text_color","result":result})
                }
                });

        }
    });
    
    }catch(e){
        console.log(e);
    }
});

router.post('/terms', function(req, res, next) {
  try{
    var reqObj = req.body;
    console.log(reqObj);

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                var sql;
             
                 
                    sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
                    var data={
                        "terms":reqObj.terms
                    }
                

                conn.query( sql, data, function(err, result) {
                if(err){
                console.log(err)
                }else{
                res.json({"var_code":"1","msg":"text_color","result":result})
                }
                });

        }
    });
    
    }catch(e){
        console.log(e);
    }
});
router.post('/privacy', function(req, res, next) {
  try{
    var reqObj = req.body;
    console.log(reqObj);

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                var sql;
             
                 
                    sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
                    var data={
                        "privacy":reqObj.privacy
                    }
                

                conn.query( sql, data, function(err, result) {
                if(err){
                console.log(err)
                }else{
                res.json({"var_code":"1","msg":"text_color","result":result})
                }
                });

        }
    });
    
    }catch(e){
        console.log(e);
    }
});

router.post('/get_setting_dettails', function(req, res, next) {
  try{

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{

                var sql = "SELECT id,main_slider1,main_slider2,main_slider3,shop_address,helpline,del_time,tax,Recepie,s1_img,s2_img,s3_img,theme_color,logo,faq_img,faq_img_tag,text_color,active_color FROM page_settings LIMIT 0,1";
                  
                conn.query( sql, function(err, result) {
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



router.post('/get_setting_dettails5', function(req, res, next) {
  try{

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{

                var sql = "SELECT id,terms_img,privacy_img,privacy_head,terms_head,privacy,terms FROM page_settings LIMIT 0,1";
                  
                conn.query( sql, function(err, result) {
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

router.post('/major', function(req, res, next) {
  try{

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{

                var sql = "SELECT theme_color,logo,text_color,active_color FROM page_settings LIMIT 0,1";
                  
                conn.query( sql, function(err, result) {
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


router.post('/get_pincode', function(req, res, next) {
  try{
    var reqObj = req.body;
      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{

                var sql = "SELECT Serving_Area_Postcodes,post_charge FROM settings WHERE Serving_Area_Postcodes='"+reqObj.pin+"'";
                  
                conn.query( sql, function(err, result) {
                if(err){
                console.log(err)
                }else{
                    var size = result.length;
                     if(size > 0){
                        res.json({"var_code":1,"msg":"data","result":result});
                     }
                     else res.json({"var_code":0,"msg":"data","result":result})
                
                }
                });

        }
    });
    
    }catch(e){
        console.log(e);
    }
});

router.post('/get_setting_dettails2', function(req, res, next) {
  try{

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{

                var sql = "SELECT * FROM settings ORDER BY post_charge ASC";
                  
                conn.query( sql, function(err, result) {
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

router.post('/helpline', function(req, res, next) {
  try{
    var reqObj = req.body;
    console.log(reqObj);

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                var sql;
                if(reqObj.id == undefined){
                      sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
                      var data={
                        "helpline":reqObj.helpline
                      }
                }
                else{  
                    sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
                    var data={
                        "helpline":reqObj.helpline
                    }
                }

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

router.post('/d_time', function(req, res, next) {
  try{
    var reqObj = req.body;
    console.log(reqObj);

      req.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                res.json({"msg":err});
            }else{
                var sql;
                if(reqObj.id == undefined){
                      sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
                      var data={
                        "del_time":reqObj.del_time
                      }
                }
                else{  
                    sql = "UPDATE page_settings SET ? WHERE id='"+reqObj.id+"'";
                    var data={
                        "del_time":reqObj.del_time
                    }
                }

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
module.exports = router;