


module.exports={
	selectSource:function(app,db){
		app.get('/selectSource',function(req,res){
			//根据传参,生成选择查询语句
			var obj = req.query.message;
			var mbj = JSON.parse(obj);
			var keys = [];
			var str='';
			var searchSql = '';

			for(var key in mbj){  

			    if(keys.indexOf('adress') == -1 && mbj.adress){
			    	console.log(mbj.adress);
			    	keys.push('adress');
					str+=` adress = '${mbj.adress}' and`;
				}

				if(keys.indexOf('houseType') == -1 && mbj.houseType){
					keys.push('houseType');
					str+=` houseType = '${mbj.houseType}' and`;
				}

				if(keys.indexOf('room_qty') == -1 && mbj.room_qty){
					keys.push('address');
					str+=` room_qty = '${mbj.room_qty}' and`;
				}

				if(keys.indexOf('room_size') == -1 && mbj.room_size){
					keys.push('room_size');
					str+=` room_size = '${mbj.room_size}' and`;
				}

				if(keys.indexOf('bed_qty') == -1 && mbj.bed_qty){
					keys.push('bed_qty');
					str+=` bed_qty = '${mbj.bed_qty}' and`;
				}

				if(keys.indexOf('price') == -1 && mbj.price){
					keys.push('price');
					str+=` price = '${mbj.price}' and`;
				}

			   searchSql = str;
			}

			var searchParmas = searchSql? searchSql.slice(0,-3) : null;
			if(searchParmas){
				db.select(`select * from product where ${searchParmas} limit 0,9`,function(result){
					// console.log(result);
					if(result.status == true){
						res.send({data:result.data.results.slice(0,10)});
						
					}
				})
			}else{
				db.select(`select * from product limit 0,9`,function(result){
					// console.log(result);
					if(result.status == true){
						res.send({data:result.data.results.slice(0,10)});
						
					}
				})
			}
		});



		app.get('/resetSource',function(req,res){
			var str = req.query.message;
			db.select(str,function(result){
				res.send(result.data);
			})			
		})
	}
}