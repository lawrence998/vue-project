module.exports={
	comment:function(app,db){
		app.get('/comment',function(req,res){
			var qty = req.query.qty;
			db.select(`select * from product`,function(result){
					if(result){
						var length = result.data.results.length;
						var value = length/qty;
						var num = Math.ceil(value);
						console.log(qty,num,length);
						var datas = result.data.results.slice(0,qty);
						res.send({pageNumber:num,data:datas});
					}else{
						res.send('数据有误');
					}

				})
		});

		app.get('/commentPage',function(req,res){
			var qty = Number(req.query.qty);
			var page = Number(req.query.msg);
			var total1 = (page-1)*qty;
			var total2 = (page)*qty;
			console.log(total1,total2);
			db.select(`select * from product limit ${total1},${total2}`,function(result){
				if(result){
					var length = result.data.results.length;
					var num = Math.ceil(length%qty);
					var datas = result.data.results.slice(0,qty);
					res.send({pageNumber:num,data:datas});
					
				}else{
					res.send('page查询有误');
				}

			})
		});


		app.get('/commentupdate',function(req,res){
			db.update(
				`update product set comment_content="${req.query.msg}" where product_id = "${req.query.id}"`, {comment_conetnt:req.query.msg},
				function(result){
					if(result.status == true){
						res.send(result);
					}
				})
		});


		app.get('/commentdele',function(req,res){
			console.log(req.query);
			db.dele(`delete from  product where product_id = "${req.query.id}"`, {product_id:req.query.id},
				function(result){
					if(result.status == true){
						res.send({result:result,status:true});
					}
				})
		});

	}
}