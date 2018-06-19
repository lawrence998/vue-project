module.exports = {
	getIdCode:function(app,db){
		app.post('/saleSan',function(req,res){
			console.log(req.body);
			db.select('products',req.body,function(result){
				res.send(result);
			})
		})
	}

}