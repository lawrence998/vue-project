module.exports={
    register:function(app,db){
        app.get('/sx',function(req,res){
            console.log(req);
            var date=req.query.date;
            // var sql =`select * from housetype 
            //         where way like '%${date}%' 
            //         OR people_count like '%${date}%' 
            //         OR begliving_room like '%${date}%'`;
            var sql=`select
            SQL_CALC_FOUND_ROWS
            *
            from
            place
            inner join houseprice on place.placeTotal_id = houseprice.housePrice_ID
            inner join houseimg on place.placeTotal_id = houseimg.houseImg_ID
            inner join housetype on place.placeTotal_id = housetype.houseType_ID
            inner join commentQty on place.placeTotal_id = commentQty.id`;
            db.select(sql,function(date){
                res.send(date);
            });
        });

        //排序 低价优先
        app.get('/lowPrice',function(req,res){
            var sql=`select
            *
            from
            product
            inner join area on product.area_id = area.area_id where price>0 order by price asc limit 0,15`;
                db.select(sql,function(data){
                    var data=data.data;
                    res.send(data);
                    //console.log(data);
                });
        });

        //排序 高价优先
        app.get('/highPrice',function(req,res){
            var sql=`select
            *
            from
            product
            inner join area on product.area_id = area.area_id where price>0 order by price desc limit 0,15`;
                db.select(sql,function(data){
                    var data=data.data;
                    res.send(data);
                    //console.log(data);
                });
        });

        //排序 好评优先
        app.get('/goodPing',function(req,res){
            var sql=`select
            *
            from
            product
            inner join area on product.area_id = area.area_id where comment_qty>10 order by comment_qty desc limit 0,15`;
                db.select(sql,function(data){
                    var data=data.data;
                    res.send(data);
                    //console.log(data);
                });
        });

        //默认排序
        app.get('/rander',function(req,res){
            var sql=`select
            *
            from
            product
            inner join area on product.area_id = area.area_id where comment_qty>1 order by rand() limit 0,15`;
                db.select(sql,function(data){
                    var data=data.data;
                    res.send(data);
                    //console.log(data);
                });
        });
    }
}

