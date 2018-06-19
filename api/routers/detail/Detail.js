var express = require('express');
var app = new express();
var bodyParser = require('body-parser');

//webtoken
var jwt = require("jsonwebtoken");



module.exports = {
    detailPost:function(app,db){
        //console.log(db);
        app.get('/houseImg',function(req,res){
            var id = JSON.stringify(req.query.place_id*1);console.log(id);
            var sql = `select
                    SQL_CALC_FOUND_ROWS
                    *
                    from
                    product
                    inner join area on product.area_id = area.area_id
                    where product_id = ${id}
                    `;
            console.log(sql)
            db.select(sql,function(result){
                console.log(result);
                res.send(result);
            })
        });
        app.get('/houseImg2', function(req, res){
            var room_ID = req.query.room_ID;
            var sql = `select * from house where room_ID=${room_ID}`;
            db.select(sql, function(data){
                res.send(data);
            })
        })
    }
}