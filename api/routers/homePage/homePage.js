var db = require('../../db/DBHelper');

module.exports = {
    city: function(app){
        app.get('/hotcity', function(req, res){
            var sql = `select * from area where hot=1 or china=1`;
            db.select(sql, function(data){
                res.send(data);
            })
        });
        app.get('/youlike', function(req, res){
            var sql = `select * from product where youlike=1`;
            db.select(sql, function(data){
                res.send(data);
            })
        })
        app.get('/getRecommend',function(req,res){
            //console.log('getImg请求',req.query);
            var recommend = JSON.stringify(req.query.recommend);
            var sql = `select
            *
            from product
            inner join area on product.area_id = area.area_id
            where recommend = ${recommend}`;
            db.select(sql,function(result){
                console.log(result);
                res.send(result);
            })
        });
    }
}