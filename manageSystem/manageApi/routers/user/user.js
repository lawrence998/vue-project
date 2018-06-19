module.exports={
	user:function(app,db){
		app.get('/userMsg',function(req,res){
			var qty = req.query.qty;
			var page = req.query.page;
			var pageNum = req.query.pageNum;
			var total1 = (page-1)*qty;
			var total2 = page*qty;
			if(page){
				db.select(`select * from user limit ${total1},${total2}`,function(result){
					if(result.status == true){
						// var length = result.length;
						var pageNum = Math.ceil(result.data.results.length/qty);
						res.send({datas:result.data.results,pageNum:pageNum});
					}
				})
			}else{
				db.select(`select * from user`,function(result){
					if(result.status == true){
						// var length = result.length;
						var pageNum = Math.ceil(result.data.results.length/qty);
						res.send({datas:result.data.results.slice(0,10),pageNum:pageNum});
					}
				})
			}
		});
	}
}