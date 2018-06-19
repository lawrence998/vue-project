

module.exports={
	customer:function(app,db){
		app.get('/getCustomerMsg',function(req,res){
				var qty = req.query.qty;	
				var page = req.query.page;
				var total1 = (page-1)*qty;
				var total2 = qty;	
			
			if(req.query.totalPage){
				db.select(`select * from product limit ${total1},${total2}`,function(result){
					if(result.status == true){
						console.log(result);
						var pageNumber = Math.ceil(result.data.results.length/qty);
						res.send({data:result.data.results,pageNum:pageNumber,totalPage:req.query.totalPage});
					}
				})

			}else{
				db.select(`select * from product`,function(result){
					if(result.status == true){
						var total = filter(result);
						var pageNumber = Math.ceil(result.data.results.length/qty);
						res.send({data:result.data.results.slice(0,10),pageNum:pageNumber,total});
					}
				})
			}
		});




		app.get('/saleSource',function(req,res){
			var datas = req.query.msg;
			datas = JSON.parse(datas);
			var ownerID = datas.ownerID;
			var status = datas.status;
			console.log(ownerID,status);
			db.select(`
				select * from
					houseowner as a left 
						join
					housetype as b 
						on b.owner_ID = a.owner_ID
					LEFT JOIN houseimg as c 
						on c.houseImg_ID = a.owner_ID
					LEFT JOIN housetitle as d 
						on d.houseTitle_ID = a.owner_ID
					LEFT JOIN houseplace as e
						on e.housePlace_ID = a.owner_ID
					LEFT JOIN houseprice as g 
						on g.housePrice_ID = a.owner_ID
					where houseOwnerId = "${ownerID}" and status = "${status}"
				`,
				function(result){
					if(result.status){
						res.send(result)
					}else{
						res.send('查询有误')
					}
				})

		});
			
		app.get('/getOrder',function(req,res){
			db.select(
				`select * from orders`,
				function(result){
					res.send(result.data);
				})
		});

		app.get('/releaseHouse',function(req,res){
				var arrs = req.query.arr;
				var  addSql = `INSERT INTO product(product_id,title,adress,houseType,room_size,room_qty,bed_qty,price,owner_name) VALUES (0,?,?,?,?,?,?,?,?)`;
				db.insert(addSql,arrs,function(result){
						res.send(result.data);
				})
		});



		function filter(data){

		 	// console.log('2222',data.data.results);
		 	var datas = data.data.results;
		 	//过滤属性值
		 	var adressV = [];
			var houseTypeV = [];
			var room_qtyV = [];
			var bed_qtyV = [];
			var  room_sizeV = [];
			var  priceV = [];


		 	//过滤属性名
			var adress = [];
			var houseType = [];
			var room_qty = [];
			var bed_qty = [];
			var  room_size = [];
			var  price = [];
			// city = Object.keys()

			var adressObj = [];
			var houseTypeObj = [];
			var room_qtyObj = [];
			var bed_qtyObj = [];
			var room_sizeObj = [];
			var  priceObj = [];

			datas.forEach(item=>{
				if(adress.indexOf(item.adress) == -1){
					adress.push(item.adress);
					adressObj.push({value:item.adress,label:item.adress});
				}
				if(houseType.indexOf(item.houseType) == -1){
					houseType.push(item.houseType);
					houseTypeObj.push({value:item.houseType,label:item.houseType});
				}

				if(room_qty.indexOf(item.room_qty) == -1){
					console.log(item.room_qty);
					room_qty.push(item.room_qty);
					room_qtyObj.push({value:item.room_qty,label:item.room_qty});
				}

				if(bed_qty.indexOf(item.bed_qty) == -1){
					bed_qty.push(item.bed_qty);
					bed_qtyObj.push({value:item.bed_qty,label:item.bed_qty});
				}
				
				if(room_size.indexOf(item.room_size) == -1){
					room_size.push(item.room_size);
					room_sizeObj.push({value:item.room_size,label:item.room_size});
				}

				if(price.indexOf(item.price) == -1){
					price.push(item.price);
					priceObj.push({value:item.price,label:item.price});
				}

			})

		return {
					adressObj:adressObj,
					houseTypeObj:houseTypeObj,
					room_qtyObj:room_qtyObj,
					bed_qtyObj:bed_qtyObj,
					room_sizeObj:room_sizeObj,
					priceObj:priceObj
				}
		}

	}
}




