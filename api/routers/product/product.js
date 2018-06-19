
module.exports = {
	getProduct(app,db){
		app.get('/product',function(req,res){
			console.log('sss',req.query);
			db.select('house',function(result){
				console.log(result);
				res.send(result);
			})
		});

		app.post('/product',function(req,res){
			console.log('sss',req.body);
			db.select('house',req.body,function(result){
				console.log(result);
				res.send(result);
			})
		})

		app.get('/getImg',function(req,res){
			console.log('getImg请求',req.query);
			var id = req.query.houseImg_ID*1;
			var sql = `
				select * from houseimg where houseImg_ID=${id}
				`
			db.select(sql,function(result){
				console.log(result);
				res.send(result);
			})
		});

		// app.get('/getRecommend',function(req,res){
		// 	//console.log('getImg请求',req.query);
		// 	var sql = req.query.sql;
		// 	db.select(sql,function(result){
		// 		console.log(result);
		// 		res.send(result);
		// 	})
		// });
	}
}