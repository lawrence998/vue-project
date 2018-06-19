var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('../db/db');
var loginPost  = require('./login/Login');
db = db.database;


//var db = require('../db/DBHelper');

// var db = require('../db/DBHelper');
var listPage=require('./listPage/listPage');
var sx=require('./listPage/sx');

var path = require('path');


var loginPost  = require('./login/Login');

var product = require('./product/product');
var detail = require('./detail/Detail');
var order = require('./order/Order');
var homePage = require('./homePage/homePage');


module.exports = {
    start:function(port){
        app.use(bodyParser.urlencoded({extended:false}));
        app.use(bodyParser.json());
        app.use(express.static(path.join(__dirname, '/')));

         app.all('*', function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
            res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By",' 3.2.1')
            if(req.method=="OPTIONS") {
                res.send(200);
            } else {
                next();
            }

        });  

        loginPost.userPost(app,db);          
        detail.detailPost(app,db);
             app.all('*', function(req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
                res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
                res.header("X-Powered-By",' 3.2.1')
                if(req.method=="OPTIONS") {
                    res.send(200);
                } else {
                    next();
                }

            });  
            // product.getProduct(app,db); 
            loginPost.userPost(app,db);          
    
        detail.detailPost(app,db);
        order.orderPost(app,db);
        loginPost.userPost(app,db);
        product.getProduct(app,db);
        homePage.city(app,db);
        listPage.register(app,db);
        sx.register(app,db);
        
        app.listen(port,function(){
            console.log('connect success')
        });
            // product.getProduct(app,db); 

        }      

       


    }