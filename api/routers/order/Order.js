var express = require('express');
var app = new express();
var bodyParser = require('body-parser');

//webtoken
var jwt = require("jsonwebtoken");
module.exports = {
    orderPost:function(app,db){
        app.get('/DetailOrder',function(req,res){
            // console.log(req);
            var id = req.query.order_id*1;
            var sql = `select
                    SQL_CALC_FOUND_ROWS
                    *
                    from
                    product
                    inner join area on product.area_id = area.area_id
                    where product_id = ${id}
                    `;
            db.select(sql,function(result){
                res.send(result);
            })
        });

        app.get('/insertOrder',function(req,res){
            var arrnow = req.query.order_id;
           
            var proId = Number(arrnow[0]);
            var userId = Number(arrnow[1]);
            var start = arrnow[2] + ' 00:00:00';
            var end = arrnow[3] + ' 00:00:00';
    
            var  addSql = `INSERT INTO orders(status,product_ID,user_ID,checkin,checkout) VALUES(0,"${proId}", "${userId}",'${start}','${end}')`;
            var  addSqlParams = arrnow;
            db.insert(addSql,addSqlParams,function(result){
                console.log(result);
                if(result){
                    res.send('ok');
                }
            })
        });
    }
}