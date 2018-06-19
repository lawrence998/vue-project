module.exports={
    register:function(app,db){
        app.get('/getCity',function(req,res){
            console.log(req.query)
            var city1 = JSON.stringify(req.query.city);
            var sql = `select
            *
            from
            product
            inner join area on product.area_id = area.area_id
            where city=${city1}
            `;
            db.select(sql,function(result){
                res.send(result);
            })
        });

        app.post('/getDate',function(req,res){});
    }
}