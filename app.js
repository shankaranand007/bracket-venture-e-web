var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection =require('express-myconnection');
var cors = require('cors')
var index = require('./routes/index');
var users = require('./routes/users');
var signup = require('./routes/signup');
var catagory = require('./routes/catagory');
var order = require('./routes/order');
var profile_pic = require('./routes/profile_pic');
var push = require('./routes/push');
var address = require('./routes/address');
var mail = require('./routes/mail');
var payment = require('./routes/payment');
var myorder = require('./routes/myorder');
var contact = require('./routes/contact');
var subscribe = require('./routes/subscribe');
var getOrder_A = require('./routes/getOrder_A');
var payment_update = require('./routes/payment_update');

// admin
var admin_login = require('./routes/admin_login');
var add_catagory = require('./routes/add_catagorys');
var edit_catagory = require('./routes/edit_catagory');
var reject = require('./routes/reject');
var settings = require('./routes/settings');
var settings_img = require('./routes/settings_img');
var ae_items = require('./routes/ae_items');
var revenue = require('./routes/revenue');
var forgot = require('./routes/forgot');
var about = require('./routes/about');
var faq = require('./routes/faq');
var admin_settings = require('./routes/admin_settings');
var coupon = require('./routes/coupon');
var reward = require('./routes/reward');
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');

app.use(connection(mysql,{
host:"localhost",
user:"root",
password:"",
database:"food"
},'request'));
app.use(cors())
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true,parameterLimit:50000}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/signup', signup);
app.use('/catagory', catagory);
app.use('/order', order);
app.use('/push', push);
app.use('/profile_pic', profile_pic);
app.use('/address', address);
app.use('/mail', mail);
app.use('/payment', payment);
app.use('/myorder', myorder);
app.use('/contact', contact);
app.use('/subscribe', subscribe);
app.use('/getOrder_A', getOrder_A);
app.use('/payment_update', payment_update);


// admin_login
app.use('/admin_login', admin_login);
app.use('/add_catagory', add_catagory);
app.use('/edit_catagory', edit_catagory);
app.use('/reject', reject);
app.use('/settings', settings);
app.use('/settings_img', settings_img);
app.use('/ae_items', ae_items);
app.use('/revenue', revenue);
app.use('/forgot', forgot);
app.use('/about', about);
app.use('/faq', faq);
app.use('/admin_settings', admin_settings);
app.use('/coupon', coupon);
app.use('/reward', reward);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404; 
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
