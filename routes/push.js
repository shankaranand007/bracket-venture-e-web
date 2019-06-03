var express = require('express');
var router = express.Router();
var FCM = require('fcm-node');
var serverKey ='AAAAmUhF4Q8:APA91bH2fdk4KpTzvHpuWDrRKY8ms6UF-ES35LoZtrGkFDachguG-h-gvvK2YnB3CYqQKrRZAd5330hWOKwmvQFiql2BLJMRknf6haFJGB7Pn8E-4KrY8rE5j-UbEiD8qHR1nlMYGTBq';
var validDeviceRegistrationToken  ='epnExN2NlNg:APA91bG-PPwioFY_R_H2z_JKFjOcGrvQAj2bbLnktu_OwGsb2eQW9l3rbVDzkRsjgtohk8Lut9Jx-OJwccUhnsezxDbsq3Dl_HGFh-1y1YRoZ6Ue9F4imUZKJ2Su-PEtMwJFc5-1qMK_';
/* GET users listing. */
router.post('/push', function(req, res, next) {
    var fcm = new FCM(serverKey)

    var message = { 
        to: validDeviceRegistrationToken, 
        //collapse_key: 'your_collapse_key',
        
        notification: {
            title: 'Saravanan sirrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', 
            body: 'Biriyani ready' 
        },
        
        data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    }
    
    fcm.send(message, function(err, response){
        if (err) {
            console.log(err)
        } else {
            console.log("Successfully sent with response: ", response)
            res.send("message sent");
        }
    })
});

module.exports = router;


    



